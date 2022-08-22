import {Select, Button} from 'antd';
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
  <div className="form-group">
    <p className="label">집계기준</p>
    <div className="form">
      <Select mode='multiple' style={{width: 200}} allowClear value={props.value} className="select-layout" onChange={props.onChange} placeholder="선택해 주세요.">
        {datacols.map((key: any, index: any) => (
          <Option value={key}> {key} </Option>
        ))}
      </Select>
      <Button icon={<SearchOutlined />} size="middle" onClick={props.onClick}>
        조회
      </Button>
    </div>
  </div>
  )

};

export default SearchMenuFile ;