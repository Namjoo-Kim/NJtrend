import { Alert, Card, Col, Row, Segmented, Tag } from 'antd';
import React, { useState, useEffect } from 'react';

import DemoBar from '../component/DemoBar';
import LinePlot from '../component/LinePlot';
import PageHeader from '../component/PageHeader';
import BreadcrumbComp from '../component/BreadcrumbComp';
import * as ApiData from '../api/Api';

type Point = { year: string; value: number };
type Unit = 'year' | 'quarter' | 'week';

const ITEM_ID: Record<Unit, string> = { year: '2', quarter: '3', week: '4' };
const UNIT_LABEL: Record<Unit, string> = { year: '년', quarter: '분기', week: '주기' };

// API 서버에 접속할 수 없을 때 보여줄 샘플 데이터
const SAMPLE: Record<Unit, Point[]> = {
  year: [
    { year: '2019', value: 1240 }, { year: '2020', value: 1480 }, { year: '2021', value: 1910 },
    { year: '2022', value: 2340 }, { year: '2023', value: 2890 },
  ],
  quarter: [
    { year: '2023 Q1', value: 610 }, { year: '2023 Q2', value: 690 },
    { year: '2023 Q3', value: 760 }, { year: '2023 Q4', value: 830 },
  ],
  week: Array.from({ length: 8 }, (_, i) => ({ year: `W${i + 1}`, value: 140 + ((i * 37) % 60) + i * 8 })),
};

const fmt = (n: number) => n.toLocaleString('ko-KR');

const Home: React.FC = () => {
  const [unit, setUnit] = useState<Unit>('year');
  const [data, setData] = useState<Point[]>([]);
  const [isSample, setIsSample] = useState(false);
  const [loading, setLoading] = useState(true);
  const loggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    let alive = true;
    setLoading(true);
    ApiData.Data({ params: { item_id: ITEM_ID[unit] } })
      .then((res: Point[]) => {
        if (!alive) return;
        if (Array.isArray(res) && res.length) {
          setData(res);
          setIsSample(false);
        } else {
          throw new Error('empty');
        }
      })
      .catch(() => {
        if (!alive) return;
        setData(SAMPLE[unit]);
        setIsSample(true);
      })
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [unit]);

  const total = data.reduce((a, b) => a + Number(b.value), 0);
  const top = data.reduce<Point | null>((a, b) => (!a || b.value > a.value ? b : a), null);
  const avg = data.length ? Math.round(total / data.length) : 0;

  const stats = [
    { label: '합계', value: fmt(total), sub: `${UNIT_LABEL[unit]} 기준 전체` },
    { label: '평균', value: fmt(avg), sub: `${data.length}개 구간 평균` },
    { label: '최대 구간', value: top ? String(top.year) : '-', sub: top ? fmt(top.value) : '' },
  ];

  const field = { xField: 'value', yField: 'year', seriesField: 'year' };

  return (
    <div>
      <BreadcrumbComp style={{ margin: '0 0 12px' }} data={['Home', '샘플 대시보드']} />
      <PageHeader
        title="샘플 대시보드"
        desc="서버에 저장된 데이터를 집계 기준별로 조회해 차트로 보여줍니다."
        extra={
          <Segmented
            value={unit}
            onChange={(v) => setUnit(v as Unit)}
            options={(Object.keys(UNIT_LABEL) as Unit[]).map((u) => ({ label: UNIT_LABEL[u], value: u }))}
          />
        }
      />

      {isSample && (
        <Alert
          className="row-spacing"
          type="info"
          showIcon
          message="API 서버에 연결할 수 없어 샘플 데이터를 표시하고 있습니다."
        />
      )}

      <Row gutter={[20, 20]} className="row-spacing">
        {stats.map((s) => (
          <Col xs={24} md={8} key={s.label}>
            <Card className="surface-card" loading={loading}>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-sub">{s.sub}</div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[20, 20]} className="row-spacing">
        <Col xs={24} lg={14}>
          <Card className="surface-card" title={`${UNIT_LABEL[unit]}별 막대 차트`} loading={loading}>
            <DemoBar data={data} Field={field} />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card className="surface-card" title={`${UNIT_LABEL[unit]}별 추이`} loading={loading}>
            <LinePlot data={data} Field={field} smooth />
          </Card>
        </Col>
      </Row>

      <Card className="surface-card row-spacing">
        <Tag color={loggedIn ? 'green' : 'blue'}>{loggedIn ? '로그인됨' : '체험 모드'}</Tag>
        {loggedIn
          ? '왼쪽 메뉴에서 “내 데이터 분석”을 열어 CSV/TXT 파일로 대시보드를 만들어 보세요.'
          : 'CSV/TXT 파일로 나만의 대시보드를 만들려면 카카오 로그인을 해 주세요.'}
      </Card>
    </div>
  );
};

export default Home;
