import logo from '../logo.svg';
import '../App.css';
import {Link} from "react-router-dom";
import React, { useState, useEffect}  from 'react';

const Welcome = () => {
  const [welcome, setWelcome] = useState("");

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`

  const onClick = () => {
    window.location.href = KAKAO_AUTH_URL;
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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <KaKaoComp />
        <Link to="main/example">
          {welcome}
        </Link>
        {/* <a
          className="App-link"
          href="/Home"
          // target="_blank"
          // rel="noopener noreferrer"
        >
          어서오세요!
        </a> */}
      </header>
    </div>
  );
}

export default Welcome;