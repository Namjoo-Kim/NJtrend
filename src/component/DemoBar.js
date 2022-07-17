import React, { useState, useEffect } from 'react';
import { Bar } from '@ant-design/plots';

const DemoBar = (props) => {

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
