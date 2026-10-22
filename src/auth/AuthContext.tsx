import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type User = { nickname: string };

type AuthValue = {
  user: User | null;
  loggedIn: boolean;
  loading: boolean;
  login: () => void;
  logout: () => Promise<void>;
  setToken: (token: string) => void;
};

const TOKEN_KEY = 'token';
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;

const AuthContext = createContext<AuthValue | null>(null);

const readToken = () => {
  try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(readToken);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(!!readToken());

  const clear = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('HomePageNum');
    setTokenState(null);
    setUser(null);
  }, []);

  // 토큰이 바뀔 때만(최초 1회 포함) 유효성과 사용자 정보를 확인한다. 토큰이 없으면 호출하지 않는다.
  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    let alive = true;
    setLoading(true);
    const headers = { Authorization: `Bearer ${token}` };
    (async () => {
      try {
        const info = await fetch('https://kapi.kakao.com/v1/user/access_token_info', { headers }).then((r) => r.json());
        if (!info.id) throw new Error('invalid token');
        const me = await fetch('https://kapi.kakao.com/v2/user/me', { headers }).then((r) => r.json());
        if (alive) setUser({ nickname: me?.properties?.nickname ?? me?.kakao_account?.profile?.nickname ?? '사용자' });
      } catch (e: any) {
        // 토큰 자체가 무효일 때만 지운다. 네트워크 오류는 로그인 상태를 유지한다.
        if (alive && e?.message === 'invalid token') clear();
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [token, clear]);

  const setToken = useCallback((t: string) => {
    localStorage.setItem(TOKEN_KEY, t);
    setTokenState(t);
  }, []);

  const login = useCallback(() => { window.location.href = KAKAO_AUTH_URL; }, []);

  const logout = useCallback(async () => {
    const t = token;
    clear();
    if (!t) return;
    try {
      await fetch('https://kapi.kakao.com/v1/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', Authorization: `Bearer ${t}` },
      });
    } catch { /* 로컬 로그아웃은 이미 완료 */ }
  }, [token, clear]);

  const value = useMemo(
    () => ({ user, loggedIn: !!token && !!user, loading, login, logout, setToken }),
    [user, token, loading, login, logout, setToken],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
