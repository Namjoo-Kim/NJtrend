import { Layout, Drawer, FloatButton} from 'antd';
import { useState, useEffect}  from 'react';

import TopMenu from '../menu/TopMenu';
import HomeMenu from '../menu/HomeMenu';
import NavigationMenu from '../menu/NavigationMenu';
import Copyright from './Copyright';

import {Routes, Route} from 'react-router-dom'
import Home from '../pages/Home';
import Home2 from '../pages/Home2';
import Home2free from '../pages/Home2_free';
import Home3 from '../pages/Home3';

const { Content } = Layout;

export default function MenuAll() {
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight,]);
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <>
    <Drawer
    // title="Drawer with extra actions"
    style={{
      backgroundColor : "#001529", 
    }}
    placement={"left"}
    width={200}
    onClose={onClose}
    closable={false}
    open={windowSize[0] <= 800 ? open : false}
    // extra={
    //   <Space>
    //     <Button onClick={onClose}>Cancel</Button>
    //     <Button type="primary" onClick={onClose}>
    //       OK
    //     </Button>
    //   </Space>
    // }
    >
    <HomeMenu windowSize={windowSize[0] <= 800 } />
    </Drawer>

    <Layout className="site-layout" style={{ minHeight: '100vh'}}>
    {windowSize[0] <= 800 ? <></> : <NavigationMenu /> }
      <Layout className="site-layout-background"  style={{zIndex : 0}}>
        <TopMenu />
        <Content style={{marginLeft : '30px', marginTop: '100px', marginRight: '30px'}}>
          <Routes>
            <Route path='/example' element={<Home />} />
            <Route path='/dashboard' element={<Home2 />} />
            <Route path='/dashboardFree' element={<Home2free />} />
            {/* <Route path='/Home3' element={<Home3 />} /> */}
          </Routes>
        </Content>
        <Copyright />
      </ Layout>
      {windowSize[0] <= 800 ? <FloatButton onClick={showDrawer} /> : <></> }
      </ Layout>
    </>

  )
};
