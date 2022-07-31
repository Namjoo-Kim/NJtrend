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

import { Breadcrumb, Layout } from 'antd';
import { Card, Col, Row } from 'antd';

import React, { useState, useEffect, useCallback}  from 'react';

import DemoBar from '../component/DemoBar';
import PercentPlot from '../component/PercentPlot';

import {useRouter} from 'next/router';

import {CsvToJSON} from '../component/Example'
import {Data1} from '../data/Data'

import * as ApiData from '../api/Api';
import HomeMenu from '../menu/HomeMenu';
import TopMenu from '../menu/TopMenu';
import SearchMenu from '../menu/SearchMenu';
import axios from "axios";

const { Footer } = Layout;
const card_style = { borderRadius: '10px', boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)", }

const Home: React.FC = () => { 
  
  // const [datetemp, setDatetemp] = useState({year: String ,value: Number });
  const [datetemp, setDatetemp] = useState<any>([]);

  async function LoadData()  {
  // const LoadData = async() => { 
    try {
      const result : {year: String, value: number} = await ApiData.Data({ params: { item_id: 2 } });
      if (result) {
        return result
      }
    } catch (error) {
      console.log(error);
    }
  }

  // const onCreate = useCallback(async () => {
  //   try {
  //     const result : {year: String, value: number} = await ApiData.Data({ params: { item_id: 2 } });
  //     if (result) {
  //       // setDatetemp(() => result) 
        
  //       return result
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  const [xField, setXField] = useState("value");
  const [yField, setYField] = useState("year");
  const [seriesField, setSeriesField] = useState("year");
  const [q, setQ] = useState("") ;
  const SomeCom = () => {
    const handleFile = (e: { target: { result: any; }; }) => {
      const content = e.target.result;  
      const string_csv = content.toString();
      const arr_json = CsvToJSON(string_csv);
  
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

  useEffect(() => {
    const promise = LoadData()
    const GetData = () => {
      promise.then((appData) => {
        setDatetemp(appData)
      });
    };
    
    return () => {
      GetData() ;
    };
  },[]);


  const [values, setValues] = useState("year");

  // useEffect(() => {
  //   let item : Number
  //   if ( values === "year") {
  //     item = 2
  //   } else if ( values === "quarter") {
  //     item = 3
  //   } else {
  //     item = 4
  //   }
  //   const Data = async () => {
  //     try {
  //       const result  = await ApiData.Data({ params: { item_id: item } });
  //       setDatetemp(result)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   Data();
  // }, [values);

  const onChange = (value: string) => {
    // console.log(`selected ${value}`);
    setValues(value)
  };

  const onClick = () => {
    let item_id : Number
    if ( values === "year") {
      item_id = 2
    } else if ( values === "quarter") {
      item_id = 3
    } else {
      item_id = 4
    }

    const Data = async () => {
      try {
        const result = await ApiData.Data({ params: { item_id: item_id } });
        setDatetemp(result)
      } catch (error) {
        console.log(error);
      }
    };
    Data();
  };

  return (
  <Layout style={{ minHeight: '100vh'}}>
    <TopMenu />
    <Layout className="site-layout">
      <HomeMenu />
      <Layout className="site-layout-background"  style={{ padding: '60px 24px 24px' , zIndex : 0}}>

        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>      
        <div className="site-card-wrapper">
          <Row gutter={16} className="row-spacing"  >
          <Col span={24}>
              <Card style={card_style} >
              <SearchMenu onChange={onChange} onClick={onClick}/>
              </Card>
            </Col>
          </Row>
          매출 Top5 카테고리
          <Row gutter={16} className="row-spacing">
            <Col span={12}>
              <Card style={card_style}  >
                <PercentPlot data={Data1} Field = {{xField :"value", yField: "year", seriesField: 'country'}} />
             </Card>
            </Col>
            <Col span={12}>
              <Card style={card_style} >
                <PercentPlot data={Data1} Field = {{xField :"value", yField: "year", seriesField: 'country'}} />
              </Card>
            </Col>
          </Row>
          <Row gutter={16} className="row-spacing">
          <Col span={24}>
              <Card style={card_style} >
               <DemoBar data={datetemp} Field = {{xField : xField, yField: yField, seriesField: seriesField}}/>
              </Card>
            </Col>
          </Row>
        </div>
      <Footer className="site-layout-background"  style={{ textAlign: 'center' }}>Ant Design ©2022 Created by KNJ</Footer>
    </Layout>
  </Layout>
</Layout>
  );
};

export default Home;