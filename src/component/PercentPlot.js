import React, { useState, useEffect } from 'react';
import { Bar } from '@ant-design/plots';

const PercentPlot = (props) => {

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
    isPercent: true,
    isStack: true,

    // color: ['#2582a1', '#f88c24', '#c52125', '#87f4d0'],
    label: {
      position: 'middle',
      content: (item) => {
        return item.value.toFixed(2);
      },
      style: {
        fill: '#fff',
      },
    },
  };

  return <Bar {...config } />;
};

export default PercentPlot ;
