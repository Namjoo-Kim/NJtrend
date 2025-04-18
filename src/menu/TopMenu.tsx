import {Link, useNavigate} from "react-router-dom";
import { Descriptions, Layout, Menu, Modal, MenuProps} from 'antd';
import React, { useState, useEffect}  from 'react';
import { async } from "q";

const { Header } = Layout;
const css = `
.menu-bar {
    display: inline-block;
    white-space: nowrap;
    width: 100%;
}
`
// import type { MenuProps } from 'antd';
// const items1: MenuProps['items'] = ['1', '2', '3'].map(key => ({
//   key,
//   label: `nav ${key}`,
// }));
// <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={items1}  /> 


const TopMenu = () => {
  const navigate = useNavigate() ;
  const [nickname, setNickname] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // if (localStorage.getItem('token')) {
    //   setLog('Logout')
    //   getPersonInfoFn()
    // } else {
    //   getInfoFn()
    //   setLog('Login')
    // }
    getInfoFn()
  },[localStorage.getItem('token')]);

  const getInfoFn = () => {
    const ACCESS_TOKEN = localStorage.getItem('token')
    const getInfo = async() => {
        await fetch(`https://kapi.kakao.com/v1/user/access_token_info`, {
          method: 'GET',
          headers: {'Authorization': `Bearer ${ACCESS_TOKEN}`},
        })
        .then(res => res.json() )
        .then(data  => {
          if (data.id) {
            // 토큰값 활성화
            getPersonInfoFn()
          } else {
            localStorage.removeItem('token')
          }
        })
      } ;
    getInfo()
  }

  const getPersonInfoFn = () => {
    const ACCESS_TOKEN = localStorage.getItem('token')
    const getPersonInfo = async() => {
        await fetch(`https://kapi.kakao.com/v2/user/me`, {
          method: 'GET',
          headers: {'Authorization': `Bearer ${ACCESS_TOKEN}`},
        })
        .then(res => res.json() )
        .then(data  => {
          if (data) {
            setNickname(data.properties.nickname)
            setThumbnail(data.properties.thumbnail_image)
          }
        })
      } ;
    getPersonInfo()
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
          if (data) {
            localStorage.removeItem('token')
            navigate('/')
          } 
        })
      };

      KaKaoLogout()
    } else {
      const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`
      window.location.href = KAKAO_AUTH_URL;
    }
  }


const item: MenuProps['items'] = [
  { label: (
    <Link to="/">
       <span className="nav-text">Home</span>
    </Link>
  ),
    key: 'home' ,
  }, // remember to pass the key prop

  { label: (
    <span className="nav-text">Login</span>
  ),
    key: "Log",
    onClick: onKaKaoLogout,
    style: { display: nickname===''?'':'none' }
  }, 
  { label: (
    <>
    <span className="nav-text">Info</span>
    {/* <img  
      src={thumbnail}
      style={{width:50, height:50}}
      alt="카카오 썸네일" 
    /> */}
    </>
  ),
    key: "Info",
    onClick: showModal,
    style: { display: nickname===''?'none':'' }
  }, 
];

  return (
    <Header 
    style={{   
      position:'fixed',
      width:'100%',  
      zIndex: 1, 
      top: 0, 
      // padding: 0,
    }} >
      <style>
            {css}
        </style>
      <div className="menu-bar" >
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" items={item}/>
      </div>
    <Modal title='정보 보기' open={isModalVisible} onOk={onKaKaoLogout} okText = {'로그아웃'} onCancel={handleCancel}  cancelText="닫기">
      <Descriptions bordered>
        <Descriptions.Item label="이름">{nickname}</Descriptions.Item>
      </Descriptions>
    </Modal>
    </Header>
  )
};

export default TopMenu ;