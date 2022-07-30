import {Link} from "react-router-dom";
import { Layout, Menu } from 'antd';

const { Header } = Layout;

// import type { MenuProps } from 'antd';
// const items1: MenuProps['items'] = ['1', '2', '3'].map(key => ({
//   key,
//   label: `nav ${key}`,
// }));
// <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={items1}  /> 


const TopMenu = () => {
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
      <Menu.Item key="login" >
        <Link to="/Home">
          <span className="nav-text">Home</span>
        </Link>
      </Menu.Item>

      <Menu.Item key="register" >
        <Link to="/">
          <span className="nav-text">Register</span>
        </Link>
      </Menu.Item>
    </Menu>
    </Header>

  )

};

export default TopMenu ;