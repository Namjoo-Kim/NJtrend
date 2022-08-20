import { Layout} from 'antd';
import TopMenu from './TopMenu';
import HomeMenu from './HomeMenu';
import Copyright from '../config/Copyright';

import {Routes, Route} from 'react-router-dom'
import Home from '../pages/Home';
import Home2 from '../pages/Home2';
import Home3 from '../pages/Home3';

export default function TopMenu_path() {
  return (
      <Layout style={{ minHeight: '100vh'}}>
      <TopMenu />
      <Layout className="site-layout">
      <HomeMenu key={'1'}  />
      <Layout className="site-layout-background"  style={{ padding: '60px 24px 24px' , zIndex : 0}}> 
  
      <Routes>
        <Route path='/Home' element={<Home />} />
        <Route path='/Home2' element={<Home2 />} />
        <Route path='/Home3' element={<Home3 />} />
      </Routes>
  
      <Copyright />
      </ Layout>
      </ Layout>
      </ Layout>
  )
};
