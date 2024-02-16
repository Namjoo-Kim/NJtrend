import {
    BarsOutlined,
    FieldTimeOutlined
  } from '@ant-design/icons';

import {Link, useLocation, useNavigate} from "react-router-dom";
import {Layout, MenuProps, Menu} from 'antd';
import React, { useState, useEffect }  from 'react';
import HomeMenu from './HomeMenu';


const { Sider } = Layout;
const NavigationMenu = (props : any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const rootSubmenuKeys = ['sub1', 'sub2'];
  const [openKeys, setOpenKeys] = useState(['sub1']);
  // const [key, setKey] = useState<any>( localStorage.getItem('HomePageNum')?localStorage.getItem('HomePageNum'):"1");
  const [key, setKey] = useState<any>();
  const [display,setDisplay] = useState("none");

  useEffect(() => {
    const key = linkList.findIndex(x => x === location.pathname).toString()
    setKey(key)

  },[]);

  const link1 : string = process.env.REACT_APP_DOMAIN_TIMELINE as string;
  const link2 : string = process.env.REACT_APP_DOMAIN_TOPIC as string;
  const linkList : Array<string> = [link1, link2]

  const onClick: MenuProps['onClick'] = e => {
    setKey(e.key)

  };

  const onOpenChange: MenuProps['onOpenChange'] = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

const item: MenuProps['items'] = [
  { label: (
    <Link to= {link1}  >
       <span className="nav-text"> 타임라인 </span>
    </Link>
  ),
    key: '0' ,
    icon: <FieldTimeOutlined />,
  }, 
  { label: (
    <Link to= {link2}  >
       <span className="nav-text"> 토픽 </span>
    </Link>
  ),
    key: '1' ,
    icon: <BarsOutlined />,
  }, 
];

return (
<Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)} width={150}  className="site-layout-background">
  <br/>
  <HomeMenu />
</Sider>
  )
};

export default NavigationMenu ;