import { Card, Col, Collapse, Row, Table, message, Input, Select, Button, Tooltip, Dropdown, Space, Menu, MenuProps } from 'antd';
import { CopyOutlined , MinusOutlined, DownOutlined } from '@ant-design/icons';

import React, { useState, useEffect, useCallback, useMemo}  from 'react';
import {Link, useNavigate} from "react-router-dom";
import { Helmet } from 'react-helmet-async';

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
  const { Option } = Select;

  const navigate = useNavigate() ;

  // const [datetemp, setDatetemp] = useState<any>([]);
  const [datetemp2, setDatetemp2] = useState<any>([]);
  // const [datetemp3, setDatetemp3] = useState<any>([]);
  const [datetempAdd, setDatetempAdd] = useState<any>([]);

  const [values, setValues] = useState("");
  const [values2, setValues2] = useState("");

  const [sliderValue, setSliderValue] = useState(50);
  const [sliderValue2, setSliderValue2] = useState<any>([]);

  const [display,setDisplay] = useState("none");
  const [display2,setDisplay2] = useState("none");

  const SelectComp = ['Demo','Line'] ;
  const [component, setComponent] = useState<any>([]) ;
  const [sliders, setSliders] = useState<any>([]) ;

  // 테이블
  const [filecols, setFilecols] = useState([]);
  const [datacols, setDatacols] = useState([]);
  const [dataSource, setDataSource] = useState<any>([]);

  useEffect(() => {
    checkTokenFn()
  },[localStorage.getItem('token'), ]);

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
            <Input style={{width: 70}} placeholder="쉼표(,)" onChange={onChange}/>
          </span>
          <span>
            <p className="label"> 파일 선택 </p>
            <input type="file" accept=".csv, .txt" onChange={e => handleChangeFile(e.target.files![0])} />
          </span>
        </div>
      </div>

    )
  };

  const oncopyclick = (num: number, value: any) => {
    if (value.key === "0") {
      component.push("Demo")
      datetemp2.push(datetemp2[num])
    } else {
      component.splice(num,1)
      datetemp2.splice(num,1)
    }
    setComponent(component)
    setDatetemp2(datetemp2);

    // 임시변수로해야 조회 버튼 한번 더 누를때 에러 안뜸
    const slider : any = [];
    for (let i = 0; i < Math.ceil(datetemp2.length/2); i++) {
      const nm = 'text' + (i+3) 
      slider.push(nm)
    };
    setSliders(slider)

  };

  const onMoveclick = (num: number, value: any) => {
    const item = component.splice(num, 1) 
    const item2 = datetemp2.splice(num, 1) 
    if (value.key === "0") {
      component.splice(0, 0, item[0])
      datetemp2.splice(0, 0, item2[0])
    } else if (value.key === "1") {
      component.splice(component.length, 0, item[0])
      datetemp2.splice(datetemp2.length, 0, item2[0])
    } else  if (value.key === "2") {
      component.splice(num===0?0:num-1, 0, item[0])
      datetemp2.splice(num===0?0:num-1, 0, item2[0])
    } else  if (value.key === "3") {
      component.splice(num+1, 0, item[0])
      datetemp2.splice(num+1, 0, item2[0])
    }

    setComponent(component)
    setDatetemp2(datetemp2);
    // 임시변수로해야 조회 버튼 한번 더 누를때 에러 안뜸
    const slider : any = [];
    for (let i = 0; i < Math.ceil(datetemp2.length/2); i++) {
      const nm = 'text' + (i+3) 
      slider.push(nm)
    };
    setSliders(slider)
  };


  const SelectChange = (num: number, value: string) => {
    // console.log(`selected ${value}`);
    component[num] = value
    // console.log('component',component)
    setComponent(component)
  };

  const onSliderChange = (name:string, value: number) => {
    // console.log(`selected ${value}`);
    setSliderValue(value)
    sliderValue2[name] = value
    setSliderValue2(sliderValue2) 
  };

  const onSwitchClick = (e: any) => {
    // console.log(`selected ${e}`);
    setDisplay(e===false?"none":datetemp2.length<=1?"none":"")
    setDisplay2(e===false?"none":"")
  };

  const onChange = (value: string) => {
    // console.log(`selected ${value}`, value.length);
    if (value.length >= 4) {
      setValues(value.slice(0,4))
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

      // 오름차순
      // result.sort((a, b) => a.year < b.year ? -1 : (a.year  > b.year ? 1 : 0))

      // 임시변수로해야 조회 버튼 한번 더 누를때 에러 안뜸
      let temp : any = values;
      const temp2 : any = []; 
      const result2 : any = []; 
      const resultAdd : any = []; 
      for (let i = 0; i < temp.length ; i++) {
        result2.push([])
        resultAdd.push([])
        temp2.push("Demo")
      };
      setComponent(temp2);

      temp.map((key: any, index: any) => (
        dataSource.reduce(function(res : any, value :any) {
          if (!res[value[key]]) {
            res[value[key]] = { axis: value[key], value: 0 };
            result2[index].push(res[value[key]])
            resultAdd[index].push(res[value[key]])
          }
          res[value[key]].value += parseFloat(value[values2[0]]);
          return res;
        }, {})
      ))
      setDatetemp2(result2);
      setDatetempAdd(resultAdd);

      // if (datetempAdd.length === 0) {
      //   setDatetempAdd(result2);
      //   console.log('setDatetempAdd',result2)
      // }

      // 임시변수로해야 조회 버튼 한번 더 누를때 에러 안뜸
      const slider : any = [];
      for (let i = 0; i < Math.ceil(result2.length/2); i++) {
        const nm = 'text' +(i+3) 
        slider.push(nm)
      };
      setSliders(slider)

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

    }
  };

  // const SelectMap = (props : any) => {
  //   const sliderkeys = props.keys
  //   const colsize = datetemp2.length===1?24:Math.round(24*(sliderValue2[sliderkeys]?sliderValue2[sliderkeys]:50)/100);
  //   return datetemp2.map((key: any, index: any) => (
  //     <Col span={index===0?colsize:24-colsize}>
  //       <Card style={card_style} >
  //         <SelectChart num = {index} />
  //         <SelectComponent data={key} Field={{xField : 'value', yField: 'axis', seriesField: 'axis'}} select={component[index]} />
  //       </Card>            
  //     </Col>
  //     ))
  // };

  // const SelectPlot = useCallback(() => {
  //   return sliders.map((keys: any, index: any) => (
  //     <>
  //       <SliderComponent defaultValue={sliderValue2[keys]?sliderValue2[keys]:50} onChange={(value: any) => onSliderChange(keys, value)} display={display2} />
  //       <Row gutter={16} className="row-spacing">
  //         <SelectMap keys={keys}/>
  //       </Row>
  //     </>
  //   ));
  // },[datetemp2, display, display2, component]);

  const SelectMap2 = (props : any) => {
    const sliderindex = props.index
    const sliderkeys = props.keys
    const colsize = (data : any ) => {return data.length===1?24:Math.round(24*(sliderValue2[sliderkeys]?sliderValue2[sliderkeys]:50)/100)};
    // const colsize = Math.round(24*(sliderValue2[sliderkeys]?sliderValue2[sliderkeys]:50)/100);

    const dataFinal = props.data

    return dataFinal[sliderindex].map((key: any, index: any) => (
      <Col span={index===0?colsize(dataFinal[sliderindex]):24-colsize(dataFinal[sliderindex])}>
      {/* <Col span={index===0?colsize:24-colsize}> */}
        <Card style={card_style} >
          <SelectChart num = {index+sliderindex*2} />
          <SelectComponent data={key} Field={{xField : 'value', yField: 'axis', seriesField: 'axis'}} select={component[index+sliderindex*2]} />
        </Card>            
      </Col>
      ))
  };

  const SelectPlot2 = useCallback(() => {
    const dataFinal : any = [];
    for (let i = 0; i < datetemp2.length; i++) {
      if (i % 2 === 0) {
        dataFinal.push(datetemp2.slice(i,2+i));
      }
    };
    // max={dataFinal[index].length===1?100:90}

    return sliders.map((keys: any, index: any) => (
      <>
        <SliderComponent max={90} defaultValue={sliderValue2[keys]?sliderValue2[keys]:50} onChange={(value: any) => onSliderChange(keys, value)} display={display2} />
        <Row gutter={16} className="row-spacing">
          <SelectMap2 index={index} keys={keys} data={dataFinal}/>
        </Row>
      </>
    ));
  },[datetemp2, display, display2, component, sliders, ]);

  const SelectChart = (props : any) => {
    const SelectNum = props.num ;
  
    const Overlay = () => {
      const Items :any = [
        {
          label: "복제",
          key: '0',
        },
        {
          label: "삭제",
          key: '1',
        },
      ]
  
      return (
        <Menu  
        onClick={(value: any) => oncopyclick(SelectNum, value)}
        items = {Items}
        />    
      )
    };

    const Overlay2 = () => {
      const Items :any = [
        {
          label: "가장 처음으로",
          key: '0',
        },
        {
          label: "가장 마지막으로",
          key: '1',
        },
        {
          type: 'divider',
        },
        {
          label: "한 칸 뒤로",
          key: '2',
        },
        {
          label: "한 칸 앞으로",
          key: '3',
        },
      ]
  
      return (
        <Menu  
        onClick={(value: any) => onMoveclick(SelectNum, value)}
        items = {Items}
        />    
      )
    };


    return (
      <div className="form-group"  style={{ display: display2}}>
        <div className="form">
          <span>
            <p className="label">Chart 선택</p>
            <Select defaultValue={component[SelectNum]} onChange={(value: any) => SelectChange(SelectNum, value)} style={{width: 100}} className="select-layout" >
              {SelectComp.map((key: any, index: any) => (
                <Option value={key}> {key} </Option>
              ))}
            </Select>
          </span>
          <span>
          <p className="label">Chart 복제/삭제</p>
          <Dropdown overlay={Overlay}  >
          <a onClick={e => e.preventDefault()}>
            <Space   >
              선택
            </Space>
          </a>
          </Dropdown>
            {/* <Tooltip title="확인">
              <Button type="primary" shape="circle" icon={<CopyOutlined/>} onClick= {(value: any) => oncopyclick(SelectNum, value)}/>
            </Tooltip> */}
          </span>
          <span>
          <p className="label">Chart 위치</p>
          <Dropdown overlay={Overlay2}  >
          <a onClick={e => e.preventDefault()}>
            <Space   >
              선택
            </Space>
          </a>
          </Dropdown>
          </span>
        </div>
      </div>
    )
  };

  const handleMenuClick: MenuProps['onClick'] = (e : any) => {
    component.push("Demo")
    setComponent(component)
    
    datetemp2.push(datetempAdd[e.key])
    setDatetemp2(datetemp2);

    // 임시변수로해야 조회 버튼 한번 더 누를때 에러 안뜸
    const slider : any = [];
    for (let i = 0; i < Math.ceil(datetemp2.length/2); i++) {
      const nm = 'text' +(i+3) 
      slider.push(nm)
    };
    setSliders(slider)
  };
  
  const DropdownMenu = () => {
    let temp : any = values;
    const Items :any = temp.map((key: any, index: any) => ({
      label: (
        <a >
          {key}
        </a>
      ),
      key: index,
    }))

    return (
      <Menu  
      onClick={handleMenuClick}
      items = {Items}
      />    
    )
  };

  return (
  <>
        <BreadcrumbComp style={{ margin: '16px 0' }} data = {['Home','대쉬보드' ]} />
        <div className="site-card-wrapper">
          <Helmet>
            <title> 대쉬보드 | Trend </title>
          </Helmet>
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
          <Dropdown overlay={DropdownMenu} trigger={['click']} disabled={datetempAdd.length!==0?false:true}  >
          <a onClick={e => e.preventDefault()}>
            <Space  style={{ display: display2}}  >
              Chart 가져오기
              <DownOutlined />
            </Space>
          </a>
          </Dropdown>
          {/* 매출 Top5 카테고리 */}
          {/* <Row gutter={16} className="row-spacing">
            <Col span={24}>
              <Card style={card_style} >
               <DemoBar data={datetemp} Field = {{xField : xField, yField: yField, seriesField: seriesField}}/>
              </Card>
            </Col>
          </Row> */}
          {/* <SelectPlot /> */}
          <SelectPlot2 />
          {/* <Row gutter={16} className="row-spacing">
            <Col span={24}>
              <Card style={card_style} >
                <PercentPlot data={datetemp3} Field = {{xField :values2[0], yField: values[0], seriesField: 'mfr'}} />
             </Card>
            </Col>
          </Row> */}
        </div>
</>
  );
};

export default Home2;