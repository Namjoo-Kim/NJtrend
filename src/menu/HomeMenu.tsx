import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';

import {Link, useLocation} from "react-router-dom";
import {MenuProps, Menu} from 'antd';
import React, { useState, useEffect }  from 'react';
import { useAuth } from '../auth/AuthContext';


const HomeMenu = (props : any) => {
  const location = useLocation();

  const rootSubmenuKeys = ['sub1', 'sub2'];
  const [openKeys, setOpenKeys] = useState(['sub1']);
  // const [key, setKey] = useState<any>( localStorage.getItem('HomePageNum')?localStorage.getItem('HomePageNum'):"1");
  const [key, setKey] = useState<any>();
  const { loggedIn } = useAuth();

  useEffect(() => {
    const key = linkList.findIndex(x => x === location.pathname).toString()
    setKey(key)

  },[]);

  const link1 : string = process.env.REACT_APP_DOMAIN_EXAMPLE as string;
  const link2 : string = process.env.REACT_APP_DOMAIN_DASHFREE as string;
  const link3 : string = process.env.REACT_APP_DOMAIN_DASHBOARD as string;

  const linkList : Array<string> = [link1, link2, link3]

  const onClick: MenuProps['onClick'] = e => {
    setKey(e.key)

    // localStorage.setItem('HomePageNum', e.key)
    // const temp:any = localStorage.getItem('HomePageNum')
    // setKey(temp)
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
    <Link to={link1}>
       <span className="nav-text">샘플 대시보드</span>
    </Link>
  ),
    key: '0' ,
    icon: <DesktopOutlined />,
  }, // remember to pass the key prop
  { label: (
    <Link to={link2}>
       <span className="nav-text">내 데이터 분석</span>
    </Link>
  ),
    key: '1',
    icon: <PieChartOutlined />,
  }, 
  { label: (
    <Link to={link3}>
       <span className="nav-text">내 데이터 분석 (로그인)</span>
    </Link>
  ),
    key: '2',
    icon: <PieChartOutlined />,
    style : { display: loggedIn ? '' : 'none' },
  }, 
];

return (
  <Menu
  style={ props.windowSize ? 
    {} :
    { 
      // width: '200vh',
      // fontSize : '15px',
      // borderRight:0,
      // top: '60px',
      position: "static",
      // zIndex: 0, 
    }
  }
      mode="inline"
      theme="dark" 
      selectedKeys={[key]}
      openKeys={openKeys}
      defaultOpenKeys={['sub1']}
      items={item}
      onClick={onClick}
      onOpenChange={onOpenChange}
  />
  )
};

export default HomeMenu ;