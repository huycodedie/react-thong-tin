import React from 'react'

import './style.css'
import { Tabs} from 'antd';
import { useSelector } from 'react-redux';
import { Received } from './received/Received';
import { Created } from './created/Created';

const Lucky_money_list_users = () => {
  const user = useSelector((state) => state.user)
  const storageData = sessionStorage.getItem("access_token")
    // console.log('datta',data?.data)
    // console.log('load',isLoading)
    // console.log('show',show)

  return (
    <Tabs
        defaultActiveKey="1"
        centered
        items={Array.from({ length: 2 }).map((_, i) => {
        const id = String(i + 1);
        return id === '1'
          ? { label: 'Tạo lì xì', key: id, children: 
          <div>
            <Created Iduser={user.id}  roles={user.roles} token={storageData}/>
          </div> }
          : { label: 'lì xì đã nhận', key: id, children: 
          <div>
            <Received Iduser={user.id}/>
          </div> };
        })}
    />
  )
}

export default Lucky_money_list_users