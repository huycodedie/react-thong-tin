import React,{useState,useEffect} from 'react';
import { Avatar, Col, Modal, Popover } from 'antd';
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccout, HindenHeader } from './style';
import { UserOutlined, CaretDownOutlined } from '@ant-design/icons';
import Login from '../../pages/Login_pages/Login_pages';
import Register from '../../pages/Register_pages/Register_pages';
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService'
import { resetUser } from "../../redux/slides/userSlide";
import "./style.css";
import SpinLoading from '../SpinComponents/SpinLoading.tsx';

const HeaderComponents = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [isLoading, setisLoading] = useState(true)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  // console.log('user',user)
  useEffect(()=>{
    
    if(user?.email){
      setisLoading(false)
    }else{
      setisLoading(false)
    }
  },[user])
  console.log('isloading',isLoading)
  const handshowregister = ()=>{
    setShow1(true);
    setShow(false);
  }
  const handloginsuccess = ()=>{
    setShow(false);
  }
  const handshowlogin = ()=>{
    setShow1(false);
    setShow(true);
  }
  // const storageData = sessionStorage.getItem("access_token")
  
  // console.log('token',storageData);
  const handlelogout = async() => {
    await UserService.logoutUser();
    dispatch(resetUser())
    sessionStorage.removeItem('access_token');
    navigate('/')
   }
  const content = (
    <div>
      <p onClick={()=> navigate('/profile')}>Thông tin</p>
      <p style={{color:'red'}} onClick={handlelogout}>Đăng xuất</p>
    </div>
);
  return (
    <div>
      <WrapperHeader>
        <Col flex={4}>
            <Link to='/'>
            <WrapperTextHeader>
              Lì xì may mắn
            </WrapperTextHeader>
            </Link>
        </Col>
        <Col flex={1}>
            {user?.email ? (
              
               
                <WrapperHeaderAccout>
                 <Popover
                      content={content}
                      title={user?.name || user?.email}
                      trigger="click" 
                    >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {user?.image_user ? (
                      <Avatar size={42} src={user.image_user} />
                    ) : (
                      <UserOutlined style={{ fontSize: "28px" }} />
                    )}
                    <div>{user?.name || user?.email}</div>
                  </div>
                    </Popover>
              </WrapperHeaderAccout>
              
              
              
            ) : (
              isLoading ? (
                <WrapperHeaderAccout>
                  <Popover>
                    <SpinLoading/>
                  </Popover>
                </WrapperHeaderAccout>
              ):(
              <WrapperHeaderAccout>
                <HindenHeader
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  <span>Đăng nhập/Đăng ký</span>
                  <div>
                    <span>Tài khoản</span>
                    <CaretDownOutlined />
                  </div>
                </HindenHeader>
              </WrapperHeaderAccout>
              )
            )}

          <Modal open={show}
               afterOpenChange={open => 
                  setShow(open)
                }
              onCancel={() => 
                setShow(false)
              }
              onOk={() => setShow(false)}>
            <Login hand={handshowregister} handloginsuccess={handloginsuccess}></Login>
          </Modal>
          <Modal open={show1}
              afterOpenChange={open => 
                  setShow1(open)
                }
              onCancel={() => 
                setShow1(false)
              }
              onOk={() => setShow1(false)}>
            <Register handshowregister={handshowlogin}></Register>
          </Modal>
        </Col>
      </WrapperHeader>
    </div>
  )
}

export default HeaderComponents