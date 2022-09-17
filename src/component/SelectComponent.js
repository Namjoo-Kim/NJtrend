import React, { useState, useEffect } from 'react';
import { Bar } from '@ant-design/plots';

import LinePlot from './LinePlot';
import DemoBar from './DemoBar';


const SelectComponent = (props) => {
  useEffect(() => {
    if (props) {
      if(props.data) {
      } 
    } 
  },[props.data]);

  if (props.select === 'Line') {
    return <LinePlot {...props} />;
  } else if (props.select === 'Demo') {
    return <DemoBar {...props} />;
  } else {
    return <Bar />;
  }
};

export default SelectComponent ;
