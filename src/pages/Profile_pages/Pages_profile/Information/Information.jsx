import React, { useEffect, useState } from 'react';
import { InfoCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useMutationHook } from "../../../../hooks/useMutationHook";
import * as UserService from '../../../../services/UserService';
// import { jwtDecode } from "jwt-decode";
import { useAppMessage } from "../../../../components/Message/MessageAnt";
import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  Radio,
  Select,
  Switch,
  Tooltip,
  Upload,

} from 'antd';
import dayjs from "dayjs"
import { updateUser } from "../../../../redux/slides/userSlide";
import { getBase64 } from '../../../../utils';

const { TextArea } = Input;
const normFile = e => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const Information = () => {
  const {success} = useAppMessage();
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const time = dayjs()
  const today = time.format('MM-DD');
  const birthday = user?.date ? dayjs(user.date).format('MM-DD') : null;
  // console.log('time',time.format('YYYY-MM-DD'))
  // console.log('dayjs',today)
  // console.log('date',birthday)

  useEffect(() => {
    if (user) {
      setImage([
        {
          uid: "-1",
          name: "avatar.png",
          status: "done",
          url: user?.image_user, // base64 hoặc link ảnh đều ok
          isOld: true,
        },
      ]|| "")
      setName(user.name || "")
      setGioiTinh(user.sex || "")
      setEmail(user.email || "")
      setSDT(user.sdt || "")
      setNamSinh(user.date || "")
    }
    
    if(user?.date){
      setCheck(true)
    }
    
    if(today === birthday){
      console.log('đến ngày sinh nhật')
    }else{
      console.log('chưa đến ngày sinh')
    }
  }, [user,birthday,today])


  const mutation = useMutationHook( async(data)=>{
      const res = await UserService.putUpdateUser(user?.id, data)
      dispatch(updateUser({...res?.data}))
      success('Sửa thông tin thành công')
    })
  // const {data, isLoading ,isError, isSuccess} = mutation

  const [image,setImage] = useState([])
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [name,setName] = useState(user?.name)
  const [gioitinh,setGioiTinh] = useState(user?.sex)
  const [email,setEmail] = useState(user?.email)
  const [sdt,setSDT] = useState(user?.sdt)
  const [nganhang,setNganHang] = useState('')
  const [stk,setSTK] = useState('')
  const [namsinh,setNamSinh] = useState(user?.date)
  const [gioithieu,setGioiThieu] = useState('')
  const [check,setCheck] = useState(true)


const handleOnchange = ({ fileList }) => {
  if (fileList.length > 0) {
    const file = fileList[fileList.length - 1].originFileObj;

    // convert sang base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // set chỉ chuỗi base64, không set cả object Upload
      setImage([
        {
          uid: fileList[fileList.length - 1].uid,
          url: reader.result, // base64 string
          isOld: false,
        },
      ]);
    };
  } else {
    setImage([]);
  }
};
  const handleName =(e) =>{
    setName(e.target.value)
  }
  const handleGioiTinh =(e) =>{
    setGioiTinh(e.target.value)
  }
  const handleEmail =(e) =>{
    setEmail(e.target.value)
  }
  const handleSDT =(e) =>{
    setSDT(e.target.value)
  }
  const handleNganHang =(value) =>{
    setNganHang(value)
  }
  const handleSTK =(e) =>{
    setSTK(e.target.value)
  }
  const handleNamSinh =(date, dateString) =>{
    setNamSinh(dateString)
    // console.log('năm sinh',dateString)
  }
  const handleGioiThieu =(e) =>{
    setGioiThieu(e.target.value)
  }
  const handleCheck =() =>{
    if(user?.roles === "Admin"){
      setCheck()
    }else{
      if(!user?.date){
        if(check===true){
          setCheck(false)
        }else{
          setCheck(true)
        }
      }else{
        setCheck(true)
      }
    }
  }
const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
// console.log('anh hayvl',user?.image_user)
// console.log('image show',image.length > 0 ? image[0].url : image)
  const onFinish = (checked) => {
    mutation.mutate({
      image_user: image.length > 0 ? image[0].url : null,
      name: name,
      email: email,
      sex: gioitinh,
      phone: sdt,
      date: namsinh
    })
    setComponentDisabled(checked)
  };
  console.log('roles',user?.roles)
  return (
    <>
      <title>Thông tin</title>
      <Switch checked={componentDisabled} onChange={(checked) => { setComponentDisabled(checked)
      handleCheck()}}>
        Mở khóa
      </Switch>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        disabled={componentDisabled}
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
      <Form.Item  
        label="Ảnh đại diện"
        valuePropName="fileList" 
        getValueFromEvent={normFile}>
          <Upload 
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture-circle"
            fileList={image} 
            onPreview={handlePreview} 
            onChange={handleOnchange} 
            beforeUpload={() => false}>
            {(image.length === 0 || image[0]?.isOld) && componentDisabled === false ?  (
              <button
                style={{
                  color: "inherit",
                  cursor: "inherit",
                  border: 0,
                  background: "none",
                }}
                type="button"
              >
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Đổi ảnh</div>
              </button>
              ) : null}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{ display: 'none' }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: visible => setPreviewOpen(visible),
                  afterOpenChange: visible => !visible && setPreviewImage(''),
                }}
                src={previewImage}
              />
          )}
        </Form.Item>
        <Form.Item label="name">
          <Input value={name} onChange={handleName}/>
        </Form.Item>
        <Form.Item label="Giới tính">
          <Radio.Group onChange={handleGioiTinh} value={gioitinh}>
            <Radio value="Nam"> Nam </Radio>
            <Radio value="Nữ"> Nữ </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Email">
          <Input value={email} onChange={handleEmail}/>
        </Form.Item>
        <Form.Item label="Số điện thoại">
          <Input value={sdt} onChange={handleSDT} />
        </Form.Item>
        <Form.Item label="Tên ngân hàng">
          <Select value={nganhang} onChange={handleNganHang}>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="STK">
          <Input value={stk} onChange={handleSTK}/>
        </Form.Item>
        <Form.Item label="Năm sinh">
          <DatePicker 
          value={namsinh ? dayjs(namsinh) : null} onChange={handleNamSinh} 
          format='YYYY-MM-DD' 
          disabled={check} />
           {user?.date && user?.roles === 'User' ?(
             <span>
              {<Tooltip title="Năm sinh đã bị khóa cần đổi ngày sinh vui lòng liên hệ admin">
              <InfoCircleOutlined style={{ color: 'rgba(243, 8, 8, 1)' }} />
            </Tooltip>}</span>
           ):(
            <span></span>
           )}
        </Form.Item>
        <Form.Item label="Giới thiệu">
          <TextArea rows={4} value={gioithieu} onChange={handleGioiThieu}/>
        </Form.Item>
        {componentDisabled === false ?(
          <Form.Item label="Nhấn để">
            <Button htmlType="submit">Lưu</Button>
          </Form.Item>
        ):(
          null
        )}
      </Form>
    </>
  )
}

export default Information