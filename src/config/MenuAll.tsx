import { Layout} from 'antd';
import TopMenu from '../menu/TopMenu';
import HomeMenu from '../menu/HomeMenu';
import Copyright from './Copyright';

import {Routes, Route} from 'react-router-dom'
import Home from '../pages/Home';
import Home2 from '../pages/Home2';
import Home2free from '../pages/Home2_free';
import Home3 from '../pages/Home3';

export default function MenuAll() {
  return (
      <Layout style={{ minHeight: '100vh'}}>
      <TopMenu />
      <Layout className="site-layout">
      <HomeMenu />
      <Layout className="site-layout-background"  style={{ padding: '60px 24px 24px' , zIndex : 0}}> 
  
      <Routes>
        <Route path='/example' element={<Home />} />
        <Route path='/dashboard' element={<Home2 />} />
        <Route path='/dashboardFree' element={<Home2free />} />
        {/* <Route path='/Home3' element={<Home3 />} /> */}
      </Routes>
  
      <Copyright />
      </ Layout>
      </ Layout>
      </ Layout>
  )
};
