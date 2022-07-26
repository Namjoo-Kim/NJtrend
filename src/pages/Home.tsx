// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


///////////////////////////////////////

// import {
//   DesktopOutlined,
//   FileOutlined,
//   PieChartOutlined,
//   TeamOutlined,
//   UserOutlined,
// } from '@ant-design/icons';
// import type { MenuProps } from 'antd';
// import { Breadcrumb, Layout, Menu } from 'antd';
// import React, { useState } from 'react';

// const { Header, Content, Footer, Sider } = Layout;

// type MenuItem = Required<MenuProps>['items'][number];

// function getItem(
//   label: React.ReactNode,
//   key: React.Key,
//   icon?: React.ReactNode,
//   children?: MenuItem[],
// ): MenuItem {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   } as MenuItem;
// }

// const items: MenuItem[] = [
//   getItem('Option 1', '1', <PieChartOutlined />),
//   getItem('Option 2', '2', <DesktopOutlined />),
//   getItem('User', 'sub1', <UserOutlined />, [
//     getItem('Tom', '3'),
//     getItem('Bill', '4'),
//     getItem('Alex', '5'),
//   ]),
//   getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
//   getItem('Files', '9', <FileOutlined />),
// ];


// const App: React.FC = () => {
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
//         <div className="logo" />
//         <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
//       </Sider>
//       <Layout className="site-layout">
//         <Header className="site-layout-background" style={{ padding: 0 }} />
        // <Content style={{ margin: '0 16px' }}>
        //   <Breadcrumb style={{ margin: '16px 0' }}>
        //     <Breadcrumb.Item>User</Breadcrumb.Item>
        //     <Breadcrumb.Item>Bill</Breadcrumb.Item>
        //   </Breadcrumb>
        //   <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        //     Bill is a cat.
        //   </div>
        // </Content>
//         <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
//       </Layout>
//     </Layout>
//   );
// };

// export default App;

//////////////

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  SearchOutlined ,
} from '@ant-design/icons';

import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Select, Button } from 'antd';
import { Card, Col, Row } from 'antd';

import React, { useState, useEffect }  from 'react';

import DemoBar from '../component/DemoBar';
import PercentPlot from '../component/PercentPlot';

import {useRouter} from 'next/router';
import {Link} from "react-router-dom";

import {CsvToJSON} from '../component/Example'
import {Data1, Data2, Data3, Data4} from '../data/Data'

import {GetData} from '../api/Api';
const { Option } = Select;

const { Header, Content, Sider, Footer } = Layout;

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

const items: MenuItem[] = [
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

const items1: MenuProps['items'] = ['1', '2', '3'].map(key => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);



const Home: React.FC = () => { 
  const router = useRouter();
  
  const [collapsed, setCollapsed] = useState(false);
  const [text, setText] = useState("hello");
  const [datetemp, setDatetemp] = useState(Data2);

  const [xField, setXField] = useState("value");
  const [yField, setYField] = useState("year");
  const [seriesField, setSeriesField] = useState("year");

  const [q, setQ] = useState("") ;

  const card_style = { borderRadius: '10px', boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)", }

  
  useEffect(() => {
    if (! datetemp) {
      return ;
    }

  },[]);

  GetData()
.then(res => {
  console.log(res.q)
  setQ(res.q)
  }
  );

  const SomeCom = () => {

    const handleFile = (e: { target: { result: any; }; }) => {
      const content = e.target.result;
      // console.log('file content',  content)
  
      const string_csv = content.toString();
      const arr_json = CsvToJSON(string_csv);
  
      console.log(arr_json)
      // setDatetemp(arr_json)
      // setXField("kinds")
      // setYField("cnt")
      // setSeriesField("cnt")
      // You can set content in state and show it in render.
    };
  
    const handleChangeFile = (file: any) => {
      let fileData : any = new FileReader();
      fileData.onloadend = handleFile;
      fileData.readAsText(file);
    };
  
    return(
      <div>
          <input type="file" accept=".csv" onChange={e  => 
              handleChangeFile(e.target.files![0])} /> 
      </div>
    )
  };

  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e.key);
    setText(e.key)
        // console.log(Data1)
  };

  const handleChange = (value: string) => {
    // console.log(`selected ${value}`);
    if ( value === "year") {
      setDatetemp(Data2)
    } else if  ( value === "quarter") {
      setDatetemp(Data3)
    } else {
      setDatetemp(Data4)
    }
  };

  const Temp = () => {

    return(
    <div className="form-group">
      <p className="label">집계기준</p>
      <div className="form">
        <Select defaultValue="year" className="select-layout"  onChange={handleChange} >
          <Option value="year">년</Option>
          <Option value="quarter">분기</Option>
          <Option value="week">주기</Option>
        </Select>
      </div>
    </div>

)
}

  return (
  <Layout style={{ minHeight: '100vh' }}>
    <Header className="header">
      <div className="logo" />
      {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={items1}  /> */}
      <Menu theme="dark" mode="horizontal" >
        <Menu.Item key="login" >
          <Link to="/">
            <span >Home</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="register" >
            <span className="nav-text">Register</span>
        </Menu.Item>
      </Menu>

    </Header>
    <Layout className="site-layout">
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)} width={200} className="site-layout-background">
      <Menu
          mode="inline"
          theme="dark" 
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
          items={items}
          onClick = {onClick}
        />
      </Sider>



      <Layout className="site-layout-background"  style={{ padding: '0 24px 24px' }}>

      {/* <Content
          className="site-layout-color-none"
          style={{ overflow: 'scroll' }}
          // style={{
          //   padding: 24,
          //   margin: 0,
          //   minHeight: 280,
          // }}
        > */}

        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>      
    
        <div className="site-card-wrapper">
          <Row gutter={16} className="row-spacing"  >
          <Col span={24}>
              <Card  style={card_style} >
              <Temp></Temp>

              <Button icon={<SearchOutlined />} size="middle" >
                {/* Search */}
                {q}
              </Button>
              </Card>
            </Col>
          </Row>
          매출 Top5 카테고리
          <Row gutter={16} className="row-spacing">
            <Col span={12}>
              <Card style={card_style}  >
                <PercentPlot data={Data1} Field = {{xField :"value", yField: "year", seriesField: 'country'}} />
-              </Card>
            </Col>
            <Col span={12}>
              <Card style={card_style} >
                <PercentPlot data={Data1} Field = {{xField :"value", yField: "year", seriesField: 'country'}} />
-              </Card>
            </Col>

          </Row>
          <Row gutter={16} className="row-spacing">
          <Col span={24}>
              <Card style={card_style} >
-               <DemoBar data={datetemp} Field = {{xField : xField, yField: yField, seriesField: seriesField}}/>
              </Card>
            </Col>
          </Row>
        </div>

        {/* </Content> */}

      <Footer  className="site-layout-background"  style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </Layout>
</Layout>
  );
};

export default Home;