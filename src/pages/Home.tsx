import { Card, Col, Row } from 'antd';

import React, { useState, useEffect, useCallback}  from 'react';
import { Helmet } from 'react-helmet-async';

import DemoBar from '../component/DemoBar';
import PercentPlot from '../component/PercentPlot';

import {CsvToJSON} from '../component/CsvToJSON'
import {Data1} from '../data/Data'

import * as ApiData from '../api/Api';
import SearchMenu from '../menu/SearchMenu';
import BreadcrumbComp from '../component/BreadcrumbComp';

const card_style = { borderRadius: '10px', boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)", }

const Home: React.FC = () => { 
  const [datetemp, setDatetemp] = useState<any>([]);
  const [values, setValues] = useState("year");

  const [xField, setXField] = useState("value");
  const [yField, setYField] = useState("year");
  const [seriesField, setSeriesField] = useState("year");

  const [keyword, setKeyword] = useState("CSV/TXT 파일을 통해 나만의 대쉬보드를 만들고 싶다면 로그인해 주세요.");

  // 최초 로드
  async function LoadData()  {
  // const LoadData = async() => { 
    try {
      const result : {year: String, value: number} = await ApiData.Data({ params: { item_id: "2" } });
      if (result) {
        return result
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const promise = LoadData()
    const GetData = () => {
      promise.then((appData) => {
        setDatetemp(appData)
      });
    };
    checkTokenFn()
    return () => {
      GetData() ;
    };

  },[]);

  const checkTokenFn = () => {
    const ACCESS_TOKEN = localStorage.getItem('token')
    const checkToken = () => {
        if (! ACCESS_TOKEN) {
          setKeyword("CSV/TXT 파일을 통해 나만의 대쉬보드를 만들고 싶다면 로그인해 주세요.")
        }  else {
          setKeyword("대쉬보드 메뉴를 클릭해 보세요 :)")
        }
      } ;
    checkToken()
  }


  // 업로드  기능 (나중에 사용)
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

  const onChange = (value: string) => {
    // console.log(`selected ${value}`);
    setValues(value)
  };

  const onClick = () => {
    // 파라미터 지정
    let item_id : String
    if ( values === "year") {
      item_id = "2"
    } else if ( values === "quarter") {
      item_id = "3"
    } else {
      item_id = "4"
    }

    // 파라미터로 값 불러오기
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
  // <Layout style={{ minHeight: '100vh'}}>
  //   <TopMenu />
  //   <Layout className="site-layout">
  //     <HomeMenu key={'1'}  />
  //     <Layout className="site-layout-background"  style={{ padding: '60px 24px 24px' , zIndex : 0}}>
  <>
        <BreadcrumbComp style={{ margin: '16px 0' }} data={['Home','예제']} />
        <Helmet>
          <title> 예제 | Trend </title>
        </Helmet>
        <div className="site-card-wrapper">
          <Row gutter={16} className="row-spacing"  >
          <Col span={24}>
            <Card style={card_style} >
              <SearchMenu onChange={onChange} onClick={onClick}/>
            </Card>
          </Col>
          </Row>
          {/* 매출 Top5 카테고리 */}
          <Row gutter={16} className="row-spacing">
            {/* <Col span={12}>
              <Card style={card_style}  >
                <PercentPlot data={Data1} Field = {{xField :"value", yField: "year", seriesField: 'country'}} />
             </Card>
            </Col> */}
            <Col span={24}>
              <Card style={card_style} >
                {/* CSV/TXT 파일을 통해 나만의 대쉬보드를 만들고 싶다면 로그인해 주세요. */}
                {keyword}
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
</>
//     </Layout>
//   </Layout>
// </Layout>
  );
};

export default Home;