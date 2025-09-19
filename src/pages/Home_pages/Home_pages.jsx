import React, { useState } from "react";
import { Homepages } from "./style";
import Inputpages from "../../components/Input_pages/Input_pages";
import Lucky from '../Lucky_money_pages/Lucky_money_pages'
import { Flex,Modal } from "antd";
import "./style.css";

import * as UserService from '../../services/UserService'
import { useMutationHook } from "../../hooks/useMutationHook";
import { useAppMessage } from "../../components/Message/MessageAnt";
import { ButtonLoading } from "../../components/ButtonComponents/ButtonLoading";
const Home_pages = () => {
  const {success ,warning } = useAppMessage();
  const [show,setShow] = useState(false);
  const [value, setValue] = useState("");
  const handOnchaneValue = (e) =>{
    setValue(e.target.value)
  }
  
  const mutation = useMutationHook(
    data => UserService.laylucky(data)
  )
  // const {data, isLoading, isError, isSuccess} = mutation
  
  const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);

  const handclick = () =>{
    if(isValidObjectId(value)){
      mutation.mutate(
       value
      )
      success("Thành công")
    }else{
      warning("Mã lì xì không đúng")
    }
    console.log('log',value)
  }
  const handsetshow =()=>{
    setShow(false);
  }
  return (
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
            <Lucky handshow={handsetshow}/>
          </Modal>
    </Homepages>
  );
};

export default Home_pages;
