import {Link, useNavigate} from "react-router-dom";
import { Layout, Menu } from 'antd';
import React, { useState, useEffect}  from 'react';

const { Header } = Layout;

// import type { MenuProps } from 'antd';
// const items1: MenuProps['items'] = ['1', '2', '3'].map(key => ({
//   key,
//   label: `nav ${key}`,
// }));
// <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={items1}  /> 


const TopMenu = () => {
  const navigate = useNavigate() ;
  const [log, setLog] = useState("");

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLog('Logout')
    } else {
      setLog('Login')
    }
  },[]);

  const onKaKaoLogout = () => {
    const ACCESS_TOKEN = localStorage.getItem('token')
    if (localStorage.getItem('token'))  {
      const KaKaoLogout = async()  => {
        await fetch(`https://kapi.kakao.com/v1/user/logout`,{
          method: 'POST',
          headers:{'Content-Type':'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${ACCESS_TOKEN}`},
        })
        .then(res => res.json() )
        .then(data  => {
          if (data.id) {
            localStorage.removeItem('token')
            navigate('/')
          } else {
            console.log('fail remove token')
          }
        })
      };

      KaKaoLogout()
    } else {
      const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`
      window.location.href = KAKAO_AUTH_URL;
    }


    
  }

  return (
    <Header 
    style={{   
      position:'fixed',
      width:'100%',  
      zIndex: 1, 
      // top: 0, 
      // padding: 0,
    }} 
    className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" >
      <Menu.Item key="Home" >
        <Link to="/">
          <span className="nav-text">Home</span>
        </Link>
      </Menu.Item>

      <Menu.Item key="Log" onClick={onKaKaoLogout}>
        <span className="nav-text">{log}</span>
      </Menu.Item>
    </Menu>
    </Header>

  )

};

export default TopMenu ;