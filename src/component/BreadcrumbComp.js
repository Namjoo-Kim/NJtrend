import React, { useState, useEffect } from 'react';
import { Breadcrumb } from 'antd';

const BreadcrumbComp = (props) => {

const [data, setData] = useState([]);

  {/* <Breadcrumb style={{ margin: '16px 0' }}>
    <Breadcrumb.Item>Home</Breadcrumb.Item>
    <Breadcrumb.Item>List</Breadcrumb.Item>
    <Breadcrumb.Item>App</Breadcrumb.Item>
  </Breadcrumb>       */}

  useEffect(() => {
    if (props) {
      if(props.data) {
        setData(props.data)
      } 
    } 
  },[props.data]);



  const Item = data.map(label => {
    return {
        title: label
    };
});



  const config = {
    data: props.data,
    style: props.style, 
  };

  return(
    <Breadcrumb  {...config} items={Item} />  
    );
};

export default BreadcrumbComp ;
