import React, { useState } from "react"
import { Homepages } from "./style"
import Inputpages from "../../components/Input_pages/Input_pages"
import Lucky from '../Lucky_money_pages/Lucky_money_pages'
import { Flex, Modal } from "antd"
import { useMutationHook } from "../../hooks/useMutationHook"
import { useAppMessage } from "../../components/Message/MessageAnt"
import { ButtonLoading } from "../../components/ButtonComponents/ButtonLoading"
import * as EnvelopeService from '../../services/EnvelopeService.js'
import "./style.css"
import { useSelector } from "react-redux"
const Home_pages = () => {

  const user = useSelector((state) => state.user)
  const {success ,warning ,error} = useAppMessage();
  const [show,setShow] = useState(false);
  const [value, setValue] = useState("");
  const handOnchaneValue = (e) =>{
    setValue(e.target.value)
  }
  const mutation = useMutationHook( async(idbox)=>{
    if( user?.id===''){
      error('Vui lòng đăng nhập tài khoản')
    } else{
      const res = await EnvelopeService.laylucky(idbox,user?.id)
      checkDataBox(res)
      return res
    }
  })
  const {data} = mutation

  const checkDataBox =(datares)=>{
    if(datares?.status === 'OK'){
        success("Thành công")
        setShow(true)
    } else if(datares?.status === 'ERR'){
        warning(datares?.message)
    }
  }
  // console.log('data',data)

  const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);

  const handclick = () =>{
    if(isValidObjectId(value)){
      mutation.mutate(
       value
      )
    }else{
      warning("Mã lì xì không đúng")
    }
  }
  const handsetshow =()=>{
    setShow(false);
  }
  return (
    <>
      <title>Trang chủ</title>
      <Homepages>
        <div className="input-lucky">
          <h1 className="heder">Hãy thử vận may với lì xì được chia sẻ</h1>
          <Inputpages TextTable="Nhập mã được chia sẻ" valueInput={value} handOnchaneValue={handOnchaneValue}/>
          <Flex gap="small" vertical align="center">
            <Flex gap="small" wrap>
              <ButtonLoading type="primary" htmlType="submit" name = 'Tìm box' handvalueclick={handclick}/>
            </Flex>
          </Flex>
        </div>
        <Modal open={show} width={950}
                afterOpenChange={open => 
                    setShow(open)
                  }
                onCancel={() => 
                  setShow(false)
                }
                onOk={() => setShow(false)}>
              <Lucky data={data} iduser={user?.id} handshow={handsetshow}/>
            </Modal>
      </Homepages>
      <div className="p-10">
        <h1 className="text-4xl font-bold text-blue-500">
          Tailwind hoạt động rồi! 🎉
        </h1>
    </div>
    </>
  );
};

export default Home_pages;
