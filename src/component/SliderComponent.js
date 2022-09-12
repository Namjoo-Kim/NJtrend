import React, { useState, useEffect } from 'react';
import { Slider } from 'antd';

const SliderComponent = (props) => {

  // useEffect(() => {
  //   if (props) {
  //     if(props.display) {
  //     } 
  //   } 
  // },[props.display]);

  return <Slider style={{ display: props.display}} defaultValue={50} step={5} min={10} max={90} onChange={props.onChange} onAfterChange={props.onAfterChange} />
  ;
};

export default SliderComponent ;