import React from 'react'
import {
  UserOutlined,
  UploadOutlined, 
  // VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import {tabprofile} from '../../routes/tab_profile'
import { Routes, Route,Link } from 'react-router-dom'
// import Luckymoneylistuser from './Pages_profile/Envelope/lucky_money_list_user';


const { Content, Footer, Sider } = Layout;
const items = [
  {
    key: String( 1),
    icon: React.createElement(UserOutlined),
    label: <Link to="/profile/">Thông tin</Link>,
},{
    key: String( 2),
    icon: React.createElement(UploadOutlined),
    label: <Link to="/profile/li-xi-ca-nhan">Enve</Link>,
}
];

const Profile_pages = () => {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
      </Sider>
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              maxHeight: 760,
              minHeight: 760,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
           
        <Routes>
          {tabprofile.map((route) => {
            const Page = route.page
            return (
              <Route key={route.path} path={route.path} element={
              <Layout>
                <div>
                  <Page/>
                </div>
              </Layout>
            }/>
            )
          })}
        </Routes>
      
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          HUY DEV Design ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  )
}

export default Profile_pages