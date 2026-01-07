import React,{useEffect, useState} from 'react'
import "./style.css";
// import Inputlogin from "../../components/Input_login_register/Input_login_register";
import { Checkbox, Form, Input } from "antd";
import { useMutationHook } from '../../hooks/useMutationHook';
import { ButtonLoading } from "../../components/ButtonComponents/ButtonLoading";

import * as UserService from '../../services/UserService'
import { useAppMessage } from "../../components/Message/MessageAnt";

const Register_pages = ({handshowregister}) => {
    const { success, error } = useAppMessage();
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const [conFirmPassword, setConFirmPassword] = useState([]);

   const mutation = useMutationHook(
      data => UserService.siginUser(data)
    )
    const {data, isLoading,isSuccess,isError} = mutation

  useEffect(() =>{
  if(isSuccess && data?.status === 'OK'){
    success("Đăng ký thành công!");
    handshowregister();
  } else if(isError || data?.status === 'ERR'){
    error(data?.message || "Đăng ký thất bại!");
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [isSuccess, isError, data]);


    const handOnchangeEmail = (e) =>{
      setEmail(e.target.value)
    }
    const handOnchangePassword = (e) =>{
      setPassword(e.target.value)
    }
    const handOnchangeconFirmPassword = (e) =>{
      setConFirmPassword(e.target.value)
    }
    const onFinish = values => {
      mutation.mutate({
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword
      })
      console.log('Success:', values);
    };
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };

  // const [loadings, setLoadings] = useState([]);
  
  //   const enterLoading = (index) => {
  //     console.log("Start loading:", index);
  //     setLoadings((prevLoadings) => {
  //       const newLoadings = [...prevLoadings];
  //       newLoadings[index] = true;
  //       return newLoadings;
  //     });
  //     setTimeout(() => {
  //       setLoadings((prevLoadings) => {
  //         const newLoadings = [...prevLoadings];
  //         newLoadings[index] = false;
  //         return newLoadings;
  //       });
  //     }, 3000);
  //   };
  return (
    <>
      <title>Đăng ký</title>
      <div className="backgroud-login">
      <div className="container">
        <h1 style={{paddingTop:'15px'}}>Đăng ký</h1>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input value={email} onChange={handOnchangeEmail}/>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password value={password} onChange={handOnchangePassword}/>
            </Form.Item>

            <Form.Item
              label="confirmPassword"
              name="confirmPassword"
              // rules={[{ password === conFirmPassword, message: 'Please input your password!' }]}
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password value={conFirmPassword} onChange={handOnchangeconFirmPassword}/>
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" label={null}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item label={null}>
              {/* <Button type="primary" htmlType="submit">
                Submit
              </Button> */}
              <ButtonLoading type="primary" isLoading={isLoading} htmlType="submit" name = 'Đăng ký'/>
            </Form.Item>
          </Form>
        <div style={{paddingTop:'30px'}}>
          <span style={{fontSize:'15px'}}>Bạn đã có tài khoản? <span style={{color:'red',cursor:'pointer'}} onClick={()=>handshowregister()}>Đăng nhập</span></span>
        </div>
      </div>
    </div>
    </>
  )
}

export default Register_pages