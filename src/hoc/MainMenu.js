import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import {Layout, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Outlet,useLocation } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import './Main.css'
const { Header, Sider, Content } = Layout;

export const MainMenu = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const location=useLocation();
  const [key,setKey]=useState(getSelectedKey(location))
  useEffect(()=>{
    setKey(getSelectedKey(location))
  },[location])
  const logoutHandler = () => {
    dispatch(logout());
  }
  return (
    <Layout>
      <Sider style={{ height: '100vh' }} trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={key}
        >
          <Menu.Item key="1"><Link to='/'/>Dashboard</Menu.Item>
          <Menu.Item key="2"><Link to="/orders">Orders</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/requests"/>Wish List</Menu.Item>
          <SubMenu key="sub1" title="Books">
            <Menu.Item key="4"><Link to="/books">Books List</Link></Menu.Item>
            <Menu.Item key="5"><Link to="/books/new">New Book</Link></Menu.Item>
          </SubMenu>
          <Menu.Item key="6"><Link to="/authors">Authors</Link></Menu.Item>
          <Menu.Item key="7"><Link to="/genres">Genres</Link></Menu.Item>
          <Menu.Item key="8" icon={<LogoutOutlined />} onClick={logoutHandler}>
            Logout
          </Menu.Item>
        </Menu>

      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export const getSelectedKey =  ({pathname}) => {
  if(pathname !=='/books/new' &&  pathname.includes('books')){
    return ['4']
  }
  if(pathname.includes('orders')){
    return ['2']
  }
  switch(pathname){
    case '/' :
      return ['1'];
    case "" :
      return ['1'];
    case "/orders":
      return ['2'];
    case "/requests":
      return ['3'];
    case "/books":
      return ['4'];
    case "/books/new":
      return ['5'];
    case "/authors":
      return ['6'];
    case "/authors/new":
      return ['6'];
    case "/genres":
      return ['7'];
    default:
        return ['1'];                
    
  }
}
