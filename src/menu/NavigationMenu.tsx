import { Layout } from 'antd';
import HomeMenu from './HomeMenu';

const { Sider } = Layout;

const NavigationMenu = () => (
  <Sider collapsible width={210} style={{ position: 'sticky', top: 0, height: '100vh', zIndex: 9, paddingTop: 64 }}>
    <div className="app-sider-title">MENU</div>
    <HomeMenu />
  </Sider>
);

export default NavigationMenu;
