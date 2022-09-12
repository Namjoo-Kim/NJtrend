import React, { useState, useEffect } from 'react';

import { Slider } from 'antd';

const SliderComponent = (props) => {

  // useEffect(() => {
  //   if (props) {
  //     if(props.display) {
  //     } 
  //   } 
  // },[props.display]);

  const marks = {
    // 0: '왼쪽 차트 숨기기',
    // 100: '오른쪽 차트 숨기기',
  };

  return <Slider style={{ display: props.display}}  marks={marks} defaultValue={50} step={5} min={10} max={90} onChange={props.onChange} onAfterChange={props.onAfterChange} />
  ;
};

export default SliderComponent ;