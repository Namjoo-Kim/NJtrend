
import {Layout, MenuProps, Menu} from 'antd';
import React, { useState, useEffect }  from 'react';
import HomeMenu from './HomeMenu';

const { Sider } = Layout;

const NavigationMenu = (props : any) => {
const [collapsed, setCollapsed] = useState(false);


return (
<Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)} width={150}  className="site-layout-background">
  <br/>
  <HomeMenu />
</Sider>
  )
};

export default NavigationMenu ;