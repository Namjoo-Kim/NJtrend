import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
  } from '@ant-design/icons';

import {Link, useLocation} from "react-router-dom";
import {Layout, MenuProps, Menu} from 'antd';
import React, { useState, useEffect }  from 'react';

/////
const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const menus = [
  { name: "매출", key: 'sub1', path: "/Home", icon: <PieChartOutlined />, children : [{ 
    label: (
      <Link to="/Home">
         <span className="nav-text">매출3</span>
      </Link>
    ),
    key: '1' 
  }]},
  { name: "매출2",key: '2', path: "/Home2" ,icon: <DesktopOutlined />},
  { name: "sub menu",key: 'sub2', path: "" ,icon: <UserOutlined />, children : [{ 
    label: (
      <Link to="/Home3">
         <span className="nav-text">매출3</span>
      </Link>
    ),
    key: '3' 
  }]
  } 
];

const menu_list = [
  menus.map((menu, index) => {
  return (
    {
      label :
      (
      <Link to= {menu.path}>
        <span className="nav-text">{menu.name}</span>
      </Link>
      ),
      key : menu.key,
      icon : menu.icon,
      children : menu.children,
    }
  );
})
];


const HomeMenu = (props : any) => {
  const [collapsed, setCollapsed] = useState(false);
  const rootSubmenuKeys = ['sub1', 'sub2'];
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const [key, setKey] = useState("1");
  const [display,setDisplay] = useState("none");

  useEffect(() => {
    console.log('key_check')
    getInfoFn();
  },[localStorage.getItem('token')]);

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
            setDisplay("none")
          }
        })
      } ;
    getInfo()
  }

  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e.key);
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

  const item: MenuItem[] = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
      getItem('Tom', '3'),
      getItem('Bill', '4'),
      getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [
      getItem('Team 1', '6'), 
      getItem('Team 2', '7')]),
    getItem('Files', '8', <FileOutlined />),
  ];


// const item2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
//   (icon, index) => {
//     const keys2 = String(index + 1);

//     return {
//       key: `sub${keys2}`,
//       icon: React.createElement(icon),
//       label: `subnav ${keys2}`,

//       children: new Array(4).fill(null).map((_, j) => {
//         const subKey = index * 4 + j + 1;
//         return {
//           key: subKey,
//           label: `option${subKey}`,
//         };
//       }),
//     };
//   },
// );

const item3: MenuProps['items'] = [
  { label: (
    <Link to="/main/example">
       <span className="nav-text">예제</span>
    </Link>
  ),
    key: '1' ,
    icon: <PieChartOutlined />,
  }, // remember to pass the key prop
  { label: (
    <Link to="/main/Home2">
       <span className="nav-text">매출</span>
    </Link>
  ),
    key: '2',
    icon: <DesktopOutlined />,
    style : { display: display },
  }, // which is required
  {
    label: 'sub menu',
    key: 'submenu',
    icon: <UserOutlined />,
    style : { display: display },
    children: [{ 
      label: (
        <Link to="/main/Home3">
           <span className="nav-text">매출2</span>
        </Link>
      ),
      key: '3' 
    
    }],
  },
];

return (
<Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)} width={200} className="site-layout-background">
  <Menu
      style={{ 
        height: '100%', 
        borderRight: 0 ,
        top: '60px', 
        position:'fixed',
        zIndex: 0, 
      }}
      mode="inline"
      theme="dark" 
      selectedKeys={[key]}
      openKeys={openKeys}
      // defaultOpenKeys={['sub1']}
      items={item3}
      onClick={onClick}
      onOpenChange={onOpenChange}
  />
</Sider>
  )
};

export default HomeMenu ;