import { Card, Col, Collapse, Row, Table, message} from 'antd';

import React, { useState, useEffect, useCallback}  from 'react';
import {Link, useNavigate} from "react-router-dom";

import DemoBar from '../component/DemoBar';
import PercentPlot from '../component/PercentPlot';

import {CsvToJSON} from '../component/CsvToJSON'
import {Data1} from '../data/Data'

import * as ApiData from '../api/Api';
import SearchMenu from '../menu/SearchMenu';
import SearchMenuFile from '../menu/SearchMenuFile';

import BreadcrumbComp from '../component/BreadcrumbComp';

const card_style = { borderRadius: '10px', boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)", }

const Home2: React.FC = () => { 
  const { Panel } = Collapse;

  const navigate = useNavigate() ;

  const [datetemp, setDatetemp] = useState<any>([]);
  const [values, setValues] = useState("");
  const [values2, setValues2] = useState("");

  const [xField, setXField] = useState("value");
  const [yField, setYField] = useState("year");
  const [seriesField, setSeriesField] = useState("year");

  const [filecols, setFilecols] = useState([]);
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
  const Attached = () => {
    const handleFile = (e: { target: { result: any; }; }) => {
      const content = e.target.result;  
      const string_csv = content.toString();
      const arr_json = CsvToJSON(string_csv);
  
      // console.log(arr_json)
      if (arr_json.length > 0){ 
        setDataSource(arr_json)
        var columnsIn = arr_json[0]; 
        const filecols_all : any = [];
        const cols_all : any = [];
        for(var key in columnsIn){
          filecols_all.push(key)
          const cols : any =
          {
            title: key,
            dataIndex: key,
            key: key,
          }
          cols_all.push(cols)
        } 
        setFilecols(filecols_all)
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
          <input type="file" accept=".csv, .txt" onChange={e => handleChangeFile(e.target.files![0])} />
      </div>
    )
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`, value.length);
    console.log(value[0])
    if (value.length >= 2) {
      setValues(value.slice(0,2))
    } else {
      setValues(value)
    }
  };
  const onChange2 = (value: string) => {
    console.log(`selected ${value}`, value.length);
    if (value.length >= 2) {
      setValues2(value.slice(0,2))
    } else {
      setValues2(value)
    }
  };

  const onClick = () => {
    if (dataSource.length === 0) {
      message.warning('파일을 선택하여 주세요.');
    } else {
      var result: any[] = [];
      dataSource.reduce(function(res : any, value :any) {
        if (!res[value[values[0]]]) {
          res[value[values[0]]] = { year: value[values[0]], value: 0 };
          result.push(res[value[values[0]]])
        }
        res[value[values[0]]].value += parseInt(value[values2[0]]);
        return res;
      }, {});
  
      // dataSource.reduce(function(res : any, value :any) {
      //   if (!res[value.date]) {
      //     res[value.date] = { year: value.W, value: 0 };
      //     result.push(res[value.date])
      //   }
      //   res[value.date].value += parseInt(value.qt);
      //   return res;
      // }, {});
  
      // 오름차순
      // result.sort((a, b) => a.year < b.year ? -1 : (a.year  > b.year ? 1 : 0))
  
      setDatetemp(result)
      console.log(result)
    }



  };

  return (
  <>
        <BreadcrumbComp style={{ margin: '16px 0' }} data = {['Home','매출' ]} />
        <div className="site-card-wrapper">
          <Row gutter={16} className="row-spacing"  >
          <Col span={24}>
              <Card style={card_style} >
                <Attached />
                <div className="form-group">
                  <div className="form">
                    {/* <SearchMenu onChange={onChange} onClick={onClick}/> */}
                    <SearchMenuFile columns={filecols} onChange={onChange} onChange2={onChange2}  onClick={onClick} value={values===""?[]:values}   value2={values2===""?[]:values2} />
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
          <Row gutter={16} className="row-spacing">
          <Col span={24}>
              <Collapse defaultActiveKey={['1']} >
                <Panel header="데이터 확인하기" key="1">
                  <Table dataSource={dataSource} columns={datacols} />
                </Panel>
              </Collapse>
            </Col>
          </Row>
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