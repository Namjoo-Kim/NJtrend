import logo from '../logo.svg';
import '../App.css';
import {Link} from "react-router-dom";
import React, { useState, useEffect}  from 'react';
import AOS from "aos";
import "aos/dist/aos.css";


const Welcome2 = () => {
  const [welcome, setWelcome] = useState("");

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`

  const onClick = () => {
    window.location.href = KAKAO_AUTH_URL;
    console.log(KAKAO_AUTH_URL)
  }

  const KaKaoComp = () => {
    if (localStorage.getItem('token'))  {
      setWelcome('어서오세요!')
      // return(
      //   <></>
      // )
    } else {
      setWelcome('체험하기')
    };
    return (
      <>
        <a id="custom-login-btn" href="javascript:loginWithKakao()">
          <img onClick={onClick}
            src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
            width="222"
            alt="카카오 로그인 버튼" />
        </a>
        <p id="token-result"></p>
      </>
    )
  }

  let boxStyle : any = {
    width: '40%',
    height: '200px',
    fontSize: '30px',
    lineHeight: '200px',
    background: 'black',
    color: 'white',
    textAlign: 'center'
}

useEffect(() => {
    AOS.init({
        duration : 1000
    });
});


  return (
    <>
    <div className="App">
      <div style ={{padding: '10px 10px 24px', position:'fixed'}}>
        <KaKaoComp />
        <Link to="main/example">
          <a>{welcome}</a>
        </Link>
      </div>
    <header className="App-header">
      <div style ={{height: '300px'}}></div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>Scroll Down</p>
      <div style ={{height: '500px'}}></div>
      <div style={boxStyle} data-aos="fade-right">
        <p>로그인 하시면</p>
      </div>
      <div style={{height: '500px'}}></div>
      <div style={boxStyle} data-aos="fade-left">
          <p>대쉬보드를 체험할 수 있습니다</p>
      </div>
      <div style={{height: '500px'}}></div>
    </header>
    </div>
  </>
  );
}

export default Welcome2;