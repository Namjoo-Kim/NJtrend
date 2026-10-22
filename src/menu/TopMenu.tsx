import {Link, useNavigate} from "react-router-dom";
import { Descriptions, Layout, Modal, Button, Space } from 'antd';
import { BarChartOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';

const { Header } = Layout;
// import type { MenuProps } from 'antd';
// const items1: MenuProps['items'] = ['1', '2', '3'].map(key => ({
//   key,
//   label: `nav ${key}`,
// }));
// <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={items1}  /> 


const TopMenu = () => {
  const navigate = useNavigate();
  const { user, loggedIn, login, logout } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const onLogout = async () => {
    setIsModalVisible(false);
    await logout();
    navigate('/');
  };

  return (
    <Header className="app-header" style={{ left: 0 }}>
      <Link to="/" className="brand">
        <span className="brand-mark"><BarChartOutlined /></span>
        NJ Trend
      </Link>
      <Space>
        <Button type="text" icon={<HomeOutlined />} onClick={() => navigate('/')}>Home</Button>
        {loggedIn ? (
          <Button type="primary" icon={<UserOutlined />} onClick={showModal}>{user?.nickname}</Button>
        ) : (
          <Button type="primary" onClick={login}>카카오 로그인</Button>
        )}
      </Space>
      <Modal title="정보 보기" open={isModalVisible} onOk={onLogout} okText="로그아웃" onCancel={handleCancel} cancelText="닫기">
        <Descriptions bordered>
          <Descriptions.Item label="이름">{user?.nickname}</Descriptions.Item>
        </Descriptions>
      </Modal>
    </Header>
  );
};

export default TopMenu;
