import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';

const LinePlot = (props) => {
  useEffect(() => {
    if (props) {
      if(props.data) {
      } 
    } 
  },[props.data]);

  const config = {
    data: props.data,
    padding: 'auto',
    xField: props.Field.xField,
    yField: props.Field.yField,
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    smooth: props.smooth?props.smooth:false,
  };
  return <Line {...config} />;
};

export default LinePlot ;
