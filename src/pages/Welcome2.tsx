import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Row, Space, Tag } from 'antd';
import {
  BarChartOutlined,
  CloudUploadOutlined,
  ControlOutlined,
  GithubOutlined,
  LineChartOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';

// TODO: 본인 정보로 교체
const PROFILE = {
  name: '김남주',
  role: 'Frontend Developer',
  github: 'https://github.com/Namjoo-Kim',
  email: 'your@email.com',
  repo: 'https://github.com/Namjoo-Kim/NJtrend',
};

const FEATURES = [
  { icon: <BarChartOutlined />, title: '집계 조회', desc: '서버에 저장된 데이터를 년·분기·주기 단위로 집계해 즉시 차트로 확인합니다.' },
  { icon: <CloudUploadOutlined />, title: 'CSV/TXT 업로드', desc: '브라우저에서 파일을 바로 읽어 구분자만 지정하면 분석을 시작할 수 있습니다.' },
  { icon: <ControlOutlined />, title: '차트 커스터마이징', desc: '차트 종류 변경, 복제·삭제, 순서 이동, 너비 조절로 나만의 대시보드를 구성합니다.' },
  { icon: <LineChartOutlined />, title: '카카오 로그인', desc: 'OAuth 로그인으로 간편하게 접속하고 로그인 사용자 전용 분석 메뉴를 제공합니다.' },
];

const STACK = ['React 18', 'TypeScript', 'Ant Design 5', '@ant-design/plots', 'React Router 6', 'Axios', 'FastAPI', 'Docker'];

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;

const bars = [46, 72, 58, 90, 66, 82, 100];

const Welcome2 = () => {
  const navigate = useNavigate();
  const loggedIn = !!localStorage.getItem('token');

  return (
    <div className="landing">
      <Helmet>
        <title> NJ Trend | 나만의 데이터 대시보드 </title>
      </Helmet>

      <header className="landing-nav">
        <Link to="/" className="brand">
          <span className="brand-mark"><BarChartOutlined /></span>
          NJ Trend
        </Link>
        <Space>
          <Button type="text" href={PROFILE.repo} target="_blank" icon={<GithubOutlined />}>GitHub</Button>
          {!loggedIn && <Button onClick={() => (window.location.href = KAKAO_AUTH_URL)}>카카오 로그인</Button>}
        </Space>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <Tag color="geekblue">Portfolio Project</Tag>
          <h1>
            파일 하나로 만드는<br />
            <span className="grad">나만의 데이터 대시보드</span>
          </h1>
          <p>
            CSV/TXT를 올리고 집계 기준만 고르면 차트가 완성됩니다.
            React와 Ant Design으로 만든 데이터 시각화 웹 서비스입니다.
          </p>
          <Space size="middle" wrap>
            <Button type="primary" size="large" onClick={() => navigate('/main/example')}>
              {loggedIn ? '대시보드 열기' : '체험하기'}
            </Button>
            {!loggedIn && (
              <Button size="large" className="kakao-btn" onClick={() => (window.location.href = KAKAO_AUTH_URL)}>
                카카오로 시작하기
              </Button>
            )}
          </Space>
        </div>

        <div className="hero-preview" aria-hidden>
          <div className="preview-bar"><i /><i /><i /></div>
          <div className="preview-stats">
            {['9,860', '1,972', '2023'].map((v) => <div key={v}><small>지표</small><b>{v}</b></div>)}
          </div>
          <div className="preview-chart">
            {bars.map((h, i) => <span key={i} style={{ height: `${h}%` }} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <h2>주요 기능</h2>
        <Row gutter={[20, 20]}>
          {FEATURES.map((f) => (
            <Col xs={24} sm={12} lg={6} key={f.title}>
              <Card className="surface-card feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section className="section">
        <h2>기술 스택</h2>
        <Space size={[10, 10]} wrap>
          {STACK.map((s) => <Tag key={s} className="stack-tag">{s}</Tag>)}
        </Space>
      </section>

      <section className="section about">
        <div>
          <h2>{PROFILE.name}</h2>
          <p>{PROFILE.role}</p>
        </div>
        <Space wrap>
          <Button icon={<GithubOutlined />} href={PROFILE.github} target="_blank">GitHub</Button>
          <Button icon={<MailOutlined />} href={`mailto:${PROFILE.email}`}>Contact</Button>
        </Space>
      </section>

      <footer className="app-footer">© 2022 NJ Trend · Created by KNJ</footer>
    </div>
  );
};

export default Welcome2;
