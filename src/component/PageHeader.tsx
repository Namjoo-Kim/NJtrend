import { Helmet } from 'react-helmet-async';

type Props = { title: string; desc?: string; extra?: React.ReactNode };

const PageHeader = ({ title, desc, extra }: Props) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
    <Helmet>
      <title> {title} | Trend </title>
    </Helmet>
    <div>
      <h1 className="page-title">{title}</h1>
      {desc && <p className="page-desc">{desc}</p>}
    </div>
    {extra}
  </div>
);

export default PageHeader;
