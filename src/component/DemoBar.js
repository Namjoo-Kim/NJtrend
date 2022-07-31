import React, { useState, useEffect } from 'react';
import { Bar } from '@ant-design/plots';

const DemoBar = (props) => {
  useEffect(() => {
    if (props) {
      if(props.data) {
      } 
    } 
  },[props.data]);

  const config = {
    data: props.data,
    xField: props.Field.xField,
    yField: props.Field.yField,
    seriesField: props.Field.seriesField, 
    legend: {
      position: 'top-left',
    },
  };
  return <Bar {...config} />;
};

export default DemoBar ;
