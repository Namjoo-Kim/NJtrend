import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';

import {Link, useLocation} from "react-router-dom";
import {Layout, MenuProps, Menu} from 'antd';
import React, { useState, useEffect }  from 'react';


const HomeMenu = (props : any) => {
  const location = useLocation();

  const rootSubmenuKeys = ['sub1', 'sub2'];
  const [openKeys, setOpenKeys] = useState(['sub1']);
  // const [key, setKey] = useState<any>( localStorage.getItem('HomePageNum')?localStorage.getItem('HomePageNum'):"1");
  const [key, setKey] = useState<any>();
  const [display,setDisplay] = useState("none");

  useEffect(() => {
    const key = linkList.findIndex(x => x === location.pathname).toString()
    setKey(key)

  },[]);

  const link1 : string = process.env.REACT_APP_DOMAIN_EXAMPLE as string;
  const link2 : string = process.env.REACT_APP_DOMAIN_DASHFREE as string;
  const link3 : string = process.env.REACT_APP_DOMAIN_DASHBOARD as string;

  const linkList : Array<string> = [link1, link2, link3]

  useEffect(() => {
    getInfoFn();
  },[localStorage.getItem('token'), key]);

  const getInfoFn = () => {
    const ACCESS_TOKEN = localStorage.getItem('token')
    const getInfo = async() => {
        await fetch(`https://kapi.kakao.com/v1/user/access_token_info`, {
          method: 'GET',
          headers: {'Authorization': `Bearer ${ACCESS_TOKEN}`},
        })
        .then(res => res.json())
        .then(data  => {
          if (data.id) {
            // 토큰값 활성화
            setDisplay("")
          } else {
            localStorage.removeItem('token')
            localStorage.removeItem('HomePageNum')
            setDisplay("none")
          }
        })
      } ;
    getInfo()
  }

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

const item3: MenuProps['items'] = [
  { label: (
    <Link to="/main/example">
       <span className="nav-text">예제</span>
    </Link>
  ),
    key: '0' ,
    icon: <DesktopOutlined />,
  }, // remember to pass the key prop
  { label: (
    <Link to="/main/dashboardFree">
       <span className="nav-text">대쉬보드_무료</span>
    </Link>
  ),
    key: '1',
    icon: <PieChartOutlined />,
  }, 
  { label: (
    <Link to="/main/dashboard">
       <span className="nav-text">대쉬보드</span>
    </Link>
  ),
    key: '2',
    icon: <PieChartOutlined />,
    style : { display: display },
  }, 
  // {
  //   label: 'sub menu',
  //   key: 'submenu',
  //   style : { display: display },
  //   children: [{ 
  //     icon: <UserOutlined />,
  //     label: (
  //       <Link to="/main/Home3">
  //          <span className="nav-text">매출2</span>
  //       </Link>
  //     ),
  //     key: '3' 
    
  //   }],
  // },
];

return (
  <Menu
      style={ props.windowSize ? {} : { 
        height: '100%', 
        borderRight: 0,
        // top: '60px',
        position:'fixed',
        zIndex: 0, 
        marginTop: '-17px',
      }}
      mode="inline"
      theme="dark" 
      selectedKeys={[key]}
      openKeys={openKeys}
      defaultOpenKeys={['sub1']}
      items={item3}
      onClick={onClick}
      onOpenChange={onOpenChange}
  />
  )
};

export default HomeMenu ;