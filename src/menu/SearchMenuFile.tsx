import {Select, Button, Switch} from 'antd';
import { SearchOutlined ,} from '@ant-design/icons';
import React, { useState, useEffect, useCallback}  from 'react';

const { Option } = Select;

const SearchMenuFile = (props: any) => {
  const [datacols, setDatacols] = useState<any>([]);

  useEffect(() => {
    if (props) {
      if (props.columns) {
        setDatacols(props.columns)
      }
    }
  },[props.columns]);

  return(
  // <div className="form-group">
  //     <div className="form">
  <>
    <span>
    <p className="label">집계기준</p>
    <Select mode='multiple' style={{width: 450}} allowClear value={props.value} className="select-layout" onChange={props.onChange} placeholder="선택해 주세요.">
      {datacols.map((key: any, index: any) => (
        <Option value={key}> {key} </Option>
      ))}
    </Select>
    </span>
    <span>
    <p className="label">집계값</p>
    <Select mode='multiple' style={{width: 200}} allowClear value={props.value2} className="select-layout" onChange={props.onChange2} placeholder="선택해 주세요.">
      {datacols.map((key: any, index: any) => (
        <Option value={key}> {key} </Option>
      ))}
    </Select>
    </span>
    <span>
    <p className="label">BI 설정</p>
    <Switch  style={{width: 70}} onClick={props.onSwitchClick} />
    </span>
    <span>
    <p className="label"> 조회하기 </p>
    <Button icon={<SearchOutlined />} size="middle" onClick={props.onClick}>
      조회
    </Button>
    </span>
  </>


  //     </div>
  // </div>
  )

};

export default SearchMenuFile ;