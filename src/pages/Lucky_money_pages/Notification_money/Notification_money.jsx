import React from 'react'
import { Button, Result } from 'antd';

const Notification_money = ({Name_money,gia_tri,handmoney,handresultset}) => {
  return (
    <Result
    status="success"
    title={`Đã nhận thành công Lì Xì ${Name_money}`}
    subTitle={`Mã Lì xì: 2017182818828182881 bạn đã nhận được ${gia_tri}.000 .`}
    extra={[
      <Button type="primary" key="console" onClick={()=>{handmoney(); 
      setTimeout(() => {
          handresultset();  // tránh set cùng lúc bị nhầm giá trị
        }, 1);}}>
        Trở lại
      </Button>,
    ]}
  />
  )
}

export default Notification_money