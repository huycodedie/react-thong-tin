import React,{useState} from 'react'
import Cardlist from '../../../../components/Card/Card_list'
import anh from '../../../../image/anh.jpg'
import './style.css'
import { Modal, Avatar } from 'antd';
import Addlucky from '../Add/Add_lucky/Add_lucky';
import { PlusOutlined } from '@ant-design/icons';


const Lucky_money_list_users = () => {
const [show, setShow] = useState(false);

  let Id = 28;
  return (
    <div className='boder-lucky-list-user' >
      <div style={{textAlign:'center'}}>
        <Avatar onClick={()=> setShow(true)} style={{cursor:'pointer'}}
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            icon={<PlusOutlined />}
        />
      </div>
      <div className='boder-lucky-list-user-child'>
      
        {/* <Cardlist  imgercard={"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"} titlecard={"thêm lì xì"} onClick={()=>{
      setShow(true);
      }} describecard={"cùng trao nhiều lì xì nào"} tinhnang={""}/> */}
        {Array(Id).fill().map((item, index) =>(
              <Cardlist imgercard={anh} titlecard={"thêm lì xì"} describecard={"cùng trao nhiều lì xì nào"} tinhnang={"1"}/>
            ))}
      </div>
      <Modal open={show}
              afterOpenChange={open => 
                setShow(open)
              }
              onCancel={() => {
              setShow(false); setTimeout(()=>{})}
            }>
            <Addlucky/>
            </Modal>
    </div>
  )
}

export default Lucky_money_list_users