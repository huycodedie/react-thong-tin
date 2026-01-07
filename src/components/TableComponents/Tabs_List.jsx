import React from 'react'
import { Tabs } from 'antd';
const Tabs_List = () => {
  return (
    <Tabs
        defaultActiveKey="1"
        centered
        items={Array.from({ length: 2 }).map((_, i) => {
        const id = String(i + 1);
        return id === '1'
          ? { label: 'Tạo lì xì', key: id, children: 
          <div>
            Tạo lì xì

          </div> }


          : { label: 'lì xì đã nhận', key: id, children: 
          <div>
            lì xì đã nhận
          </div> };
        })}
    />
  )
}

export default Tabs_List