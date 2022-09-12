import React, { useState, useEffect } from 'react';
import { Slider } from '@ant-design/plots';

const SliderComponent = (props) => {
  useEffect(() => {
    if (props) {
      if(props.data) {
      } 
    } 
  },[props.data]);

  return <Slider defaultValue={30} onChange={props.onChange} onAfterChange={props.onAfterChange} />
  ;
};

export default SliderComponent ;