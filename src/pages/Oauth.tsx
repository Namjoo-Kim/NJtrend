import React, { useState, useEffect}  from 'react';
import logo from '../logo.svg';
import '../App.css';

import {Link, useLocation, useNavigate} from "react-router-dom";

const Oauth = () => {

  const location = useLocation() ;
  const navigate = useNavigate() ;
  const KAKAO_CODE = location.search.split('=')[1];
  const getKaKaoToken = async()  => {
    await fetch(`https://kauth.kakao.com/oauth/token`,{
      method: 'POST',
      headers:{'Content-Type':'application/x-www-form-urlencoded'},
      body:`grant_type=authorization_code&client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&code=${KAKAO_CODE}` ,
    })
    .then(res => res.json() )
    .then(data  => {
      if (data.access_token) {
        localStorage.setItem('token',data.access_token)
        navigate('/Home')
      } else {
        navigate('/')
      }
    })
  }

  useEffect(()=> {
    if (!location.search) return;
    getKaKaoToken();
  },[])
 
  return (
    <div>KaKaoLogin</div>
  );
}

export default Oauth;