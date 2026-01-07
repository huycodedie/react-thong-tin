import React,{useEffect, useState} from "react";
import "./style.css";
// import Inputlogin from "../../components/Input_login_register/Input_login_register";
import { Checkbox, Form, Input} from "antd";
import { useMutationHook } from "../../hooks/useMutationHook";
import { ButtonLoading } from "../../components/ButtonComponents/ButtonLoading";
import * as UserService from '../../services/UserService'
import { useAppMessage } from "../../components/Message/MessageAnt";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";



const Login_pages = ({hand, handloginsuccess}) => {
  const { success, error } = useAppMessage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch()

  const mutation = useMutationHook(
    data => UserService.loginUser(data)
  )
  const {data, isLoading ,isError, isSuccess} = mutation

  useEffect(() =>{
    if(isSuccess && data?.status === 'OK'){
      success("Đăng nhập thành công!");
      handloginsuccess();
      sessionStorage.setItem("access_token", JSON.stringify(data?.access_token))
      if(data?.access_token){
        const decode = jwtDecode(data?.access_token)
        console.log('decode',decode)
        if(decode?.id){
          handleGetDetailsUser(decode?.id,data?.access_token)
        }
      }
    } else if(isError || data?.status === 'ERR'){
      error(data?.message || "Đăng nhập thất bại!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError, data]);

  const handleGetDetailsUser = async (id, token)=>{
    const res = await UserService.getDetailsUser(id,token)
    dispatch(updateUser({...res?.data, access_token: token}))
  }

  const handOnchangeEmail = (e) =>{
    setEmail(e.target.value)
  }
  const handOnchangePassword = (e) =>{
    setPassword(e.target.value)
  }

  const onFinish = values => {
    mutation.mutate({
     email: values.email,
     password: values.password
    })
    
  console.log('Success:', values);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  // const [loadings, setLoadings] = useState([]);

  // const enterLoading = (index) => {
  //   console.log("Start loading:", index);
  //   setLoadings((prevLoadings) => {
  //     const newLoadings = [...prevLoadings];
  //     newLoadings[index] = true;
  //     return newLoadings;
  //   });
  //   setTimeout(() => {
  //     setLoadings((prevLoadings) => {
  //       const newLoadings = [...prevLoadings];
  //       newLoadings[index] = false;
  //       return newLoadings;
  //     });
  //   }, 3000);
  // };
  return (
   <>
   <title>Đăng nhập</title>
     <div className="backgroud-login">

        <h1 style={{paddingTop:'15px'}}>Đăng nhập</h1>
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
            rules={[{ required: true, message: 'Please input your email!' }]}
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
          <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            {/* <Button type="primary" htmlType="submit">
              Submit
            </Button> */}
            <ButtonLoading type="primary" isLoading={isLoading} htmlType="submit" name = 'Đăng nhập'/>
          </Form.Item>
        </Form>
        <div style={{paddingTop:'15px',textAlign:'start',paddingLeft:'30px',fontSize:'14px',color:'blue'}}>
          <span style={{cursor:'pointer'}}>Quyên mật khẩu</span>
        </div>
        <div style={{paddingTop:'30px'}}>
          <span style={{fontSize:'15px'}}>Bạn mới biết đến WEB? <span style={{color:'red',cursor:'pointer'}} onClick={() =>
          hand()
        }>Đăng ký</span></span>
        </div>
      </div>
   </>

  );
};

export default Login_pages;
