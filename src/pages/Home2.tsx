import { Card, Col, Collapse, Row, Table, message, Input} from 'antd';

import React, { useState, useEffect, useCallback}  from 'react';
import {Link, useNavigate} from "react-router-dom";

import DemoBar from '../component/DemoBar';
import PercentPlot from '../component/PercentPlot';
import LinePlot from '../component/LinePlot';
import SelectComponent from '../component/SelectComponent';

import {CsvToJSON} from '../component/CsvToJSON';
import SliderComponent from '../component/SliderComponent';

import SearchMenu from '../menu/SearchMenu';
import SearchMenuFile from '../menu/SearchMenuFile';
import BreadcrumbComp from '../component/BreadcrumbComp';

const card_style = { borderRadius: '10px', boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)", }

const Home2: React.FC = () => { 
  const { Panel } = Collapse;

  const navigate = useNavigate() ;

  // const [datetemp, setDatetemp] = useState<any>([]);
  const [datetemp2, setDatetemp2] = useState<any>([]);
  const [datetemp3, setDatetemp3] = useState<any>([]);

  const [values, setValues] = useState("");
  const [values2, setValues2] = useState("");

  const [sliderValue, setSliderValue] = useState(50);
  const [sliderValue2, setSliderValue2] = useState<any>([]);

  const [display,setDisplay] = useState("none");

  // 테이블
  const [filecols, setFilecols] = useState([]);
  const [datacols, setDatacols] = useState([]);
  const [dataSource, setDataSource] = useState<any>([]);

  useEffect(() => {
    checkTokenFn()
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
      const arr_json = CsvToJSON(string_csv, sep);

      if (arr_json.length > 0){ 
        setValues("")
        setValues2("")
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

        message.success('파일 읽기 완료');
      }else{
          message.warning('파일 혹은 구분자를 확인해 주세요.');
          // console.log("No columns");
      }
    };
  
    const handleChangeFile = (file: any) => {
      let fileData : any = new FileReader();
      fileData.onloadend = handleFile;
      fileData.readAsText(file);
    };
    
    let sep = ",";
    const onChange = (e: any) => {
      // console.log(`selected ${e.target.value}`);
      sep = e.target.value;
    };
  
  
    return(
      <div className="form-group">
        <div className="form">
          <span>
            <p className="label"> 구분자 </p>
            <Input style={{width: 100}} placeholder="쉼표(,)" onChange={onChange}/>
          </span>
          <span>
            <p className="label"> 파일 선택 </p>
            <input type="file" accept=".csv, .txt" onChange={e => handleChangeFile(e.target.files![0])} />
          </span>
        </div>
      </div>

    )
  };

  const onSliderChange = (name:string, value: number) => {
    // console.log(`selected ${value}`);
    // console.log({[name]:value})
    setSliderValue(value)
    sliderValue2[name] = value
    setSliderValue2(sliderValue2) 
    console.log('sliderValue2',sliderValue2)
  };

  const onSwitchClick = (e: any) => {
    // console.log(`selected ${e}`);
    setDisplay(e===false?"none":datetemp2.length<=1?"none":"")
  };

  const onChange = (value: string) => {
    // console.log(`selected ${value}`, value.length);
    if (value.length >= 2) {
      setValues(value.slice(0,2))
    } else {
      setValues(value)
    }
  };
  const onChange2 = (value: string) => {
    // console.log(`selected ${value}`, value.length);
    if (value.length >= 1) {
      setValues2(value.slice(0,1))
    } else {
      setValues2(value)
    }
  };

  const onClick = () => {
    if (dataSource.length === 0) {
      message.warning('파일을 선택해 주세요.');
    } else {
      // var result: any[] = [];
      // dataSource.reduce(function(res : any, value :any) {
      //   if (!res[value[values[0]]]) {
      //     res[value[values[0]]] = { axis: value[values[0]], value: 0 };
      //     result.push(res[value[values[0]]])
      //   }
      //   res[value[values[0]]].value += parseInt(value[values2[0]]);
      //   return res;
      // }, {});
      // setDatetemp(result)


      let temp : any = values
      var result2 :any = []; 
      // while(a.push([]) < 3);
      temp.map((key: any, index: any) => (
        result2.push([])
      ))
      temp.map((key: any, index: any) => (
        dataSource.reduce(function(res : any, value :any) {
          if (!res[value[key]]) {
            res[value[key]] = { axis: value[key], value: 0 };
            result2[index].push(res[value[key]])
          }
          res[value[key]].value += parseFloat(value[values2[0]]);
          return res;
        }, {})
      ))
      setDatetemp2(result2);

      // const groupBy = require('group-by-with-sum');
      // console.log('groupBy',values.toString())
      // const result3 = groupBy(dataSource, values.toString(), values2.toString());
      // console.log('result3',result3)
      // setDatetemp3(result3)

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

    }
  };

  const ResultComponent = useCallback(() => {
    // const colsize = 24/datetemp2.length;
    const colsize = datetemp2.length===1?24:Math.round(24*(sliderValue2["text1"]?sliderValue2["text1"]:50)/100);
    return datetemp2.map((key: any, index: any) => (
      <Col span={index===0?colsize:24-colsize}>
        <Card style={card_style} >
          <DemoBar data={key} Field={{xField : 'value', yField: 'axis', seriesField: 'axis'}}/>
        </Card>            
      </Col>
    ))
  },[datetemp2]);

  const LinePlotComponent = useCallback(() => {
    const colsize = datetemp2.length===1?24:Math.round(24*(sliderValue2["text2"]?sliderValue2["text2"]:50)/100);
    return datetemp2.map((key: any, index: any) => (
      <Col span={index===0?colsize:24-colsize}>
        <Card style={card_style}  >
          <LinePlot data={key} Field = {{xField : 'axis', yField: 'value'}} smooth = {false} />
        </Card>
      </Col>
    ))
  },[datetemp2]);


  const SelectMap = (props : any) => {
    const sliderindex = props.index
    const colsize = datetemp2.length===1?24:Math.round(24*(sliderValue2[sliders[sliderindex]]?sliderValue2[sliders[sliderindex]]:50)/100);
    
    const component = ['Demo','Line'] ;
    return datetemp2.map((key: any, index: any) => (
      <Col span={index===0?colsize:24-colsize}>
        <Card style={card_style} >
          <SelectComponent data={key} Field={{xField : 'value', yField: 'axis', seriesField: 'axis'}} select={component[index]} />
        </Card>            
      </Col>
      ))
  };

  const sliders : any = ['text3'];
  const SelectPlot = useCallback(() => {
    return sliders.map((keys: any, index: any) => (
      <>
        <SliderComponent onChange={(value: any) => onSliderChange(sliders[index], value)} display={display} />
        <Row gutter={16} className="row-spacing">
          <SelectMap index={index}/>
        </Row>
      </>
    ));
  },[datetemp2, display]);


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
                    <SearchMenuFile columns={filecols} onSwitchClick={onSwitchClick} onChange={onChange} onChange2={onChange2} onClick={onClick} value={values===""?[]:values} value2={values2===""?[]:values2} />
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
          {/* <Row gutter={16} className="row-spacing">
            <Col span={24}>
              <Card style={card_style} >
               <DemoBar data={datetemp} Field = {{xField : xField, yField: yField, seriesField: seriesField}}/>
              </Card>
            </Col>
          </Row> */}
          <SliderComponent onChange={(e: any) => onSliderChange("text1", e)} display={display} />
          <Row gutter={16} className="row-spacing">
            <ResultComponent />
          </Row>
          {/* <Row gutter={16} className="row-spacing">
            <Col span={24}>
              <Card style={card_style} >
                <PercentPlot data={datetemp3} Field = {{xField :values2[0], yField: values[0], seriesField: 'mfr'}} />
             </Card>
            </Col>
          </Row> */}
          {/* <SliderComponent onChange={(value: any) => onSliderChange("text2", value)} display={display} />
          <Row gutter={16} className="row-spacing">
            <LinePlotComponent />
          </Row> */}
          <SelectPlot />
        </div>
</>
  );
};

export default Home2;