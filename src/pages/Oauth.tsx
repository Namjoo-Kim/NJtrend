import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { useAuth } from '../auth/AuthContext';

const Oauth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const started = useRef(false); // StrictMode 이중 실행으로 인가 코드를 두 번 쓰지 않도록 막는다

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const code = new URLSearchParams(location.search).get('code');
    if (!code) {
      navigate('/', { replace: true });
      return;
    }

    (async () => {
      try {
        const res = await fetch('https://kauth.kakao.com/oauth/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: process.env.REACT_APP_REST_API_KEY as string,
            redirect_uri: process.env.REACT_APP_REDIRECT_URI as string,
            code,
          }),
        });
        const data = await res.json();
        if (data.access_token) {
          setToken(data.access_token);
          navigate('/main/example', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      } catch {
        navigate('/', { replace: true });
      }
    })();
  }, [location.search, navigate, setToken]);

  return <Spin tip="로그인 중..." style={{ display: 'block', marginTop: 120 }} />;
};

export default Oauth;
