import { Card, Col, Row, Table} from 'antd';

import React, { useState, useEffect, useCallback}  from 'react';
import {Link, useNavigate} from "react-router-dom";

import DemoBar from '../component/DemoBar';
import PercentPlot from '../component/PercentPlot';

import {CsvToJSON} from '../component/CsvToJSON'
import {Data1} from '../data/Data'

import * as ApiData from '../api/Api';
import SearchMenu from '../menu/SearchMenu';

import BreadcrumbComp from '../component/BreadcrumbComp';

const card_style = { borderRadius: '10px', boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)", }

const Home2: React.FC = () => { 
  const navigate = useNavigate() ;

  const [datetemp, setDatetemp] = useState<any>([]);
  const [values, setValues] = useState("year");

  const [xField, setXField] = useState("value");
  const [yField, setYField] = useState("year");
  const [seriesField, setSeriesField] = useState("year");

  const [datacols, setDatacols] = useState([]);
  const [dataSource, setDataSource] = useState<any>([]);

  // 최초 로드
  async function LoadData()  {
    try {
      const result : {year: String, value: number} = await ApiData.Data({ params: { item_id: 2 } });
      if (result) {
        return result
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkTokenFn()
    const promise = LoadData()
    const GetData = () => {
      promise.then((appData) => {
        setDatetemp(appData)
      });
    };
    
    return () => {
      GetData() ;
    };

  },[localStorage.getItem('token')]);

  const checkTokenFn = () => {
    const ACCESS_TOKEN = localStorage.getItem('token')
    const checkToken = () => {
        if (! ACCESS_TOKEN) {
          navigate('/main/example')
        } 
      } ;
    checkToken()
  }

  // 업로드  기능 (나중에 사용)
  const SomeCom = () => {
    const handleFile = (e: { target: { result: any; }; }) => {
      const content = e.target.result;  
      const string_csv = content.toString();
      const arr_json = CsvToJSON(string_csv);
  
      // console.log(arr_json)
      if (arr_json.length > 0){ 
        setDataSource(arr_json)
        var columnsIn = arr_json[0]; 
        const cols_all : any = [];
        for(var key in columnsIn){
          const cols : any =
          {
            title: key,
            dataIndex: key,
            key: key,
          }
          cols_all.push(cols)
        } 
        setDatacols(cols_all)
      }else{
          console.log("No columns");
      }
    };
  
    const handleChangeFile = (file: any) => {
      let fileData : any = new FileReader();
      fileData.onloadend = handleFile;
      fileData.readAsText(file);
    };
  
    return(
      <div>
          <input type="file" accept=".csv" onChange={e => handleChangeFile(e.target.files![0])} /> 
      </div>
    )
  };

  const onChange = (value: string) => {
    // console.log(`selected ${value}`);
    setValues(value)
  };

  const onClick = () => {
    // 파라미터 지정
    let item_id : Number
    if ( values === "year") {
      item_id = 2
    } else if ( values === "quarter") {
      item_id = 3
    } else {
      item_id = 4
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
  <>
        <BreadcrumbComp style={{ margin: '16px 0' }} data = {['Home','매출' ]} />
        <div className="site-card-wrapper">
          <Row gutter={16} className="row-spacing"  >
          <Col span={24}>
              <Card style={card_style} >
              <SearchMenu onChange={onChange} onClick={onClick}/>
              </Card>
            </Col>
          </Row>
          <SomeCom />
          <Table dataSource={dataSource} columns={datacols} />
          {/* 매출 Top5 카테고리 */}
          <Row gutter={16} className="row-spacing">
            <Col span={12}>
              <Card style={card_style}  >
                <PercentPlot data={Data1} Field = {{xField :"value", yField: "year", seriesField: 'country'}} />
             </Card>
            </Col>
            {/* <Col span={12}>
              <Card style={card_style} >
                <PercentPlot data={Data1} Field = {{xField :"value", yField: "year", seriesField: 'country'}} />
              </Card>
            </Col> */}
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
  );
};

export default Home2;