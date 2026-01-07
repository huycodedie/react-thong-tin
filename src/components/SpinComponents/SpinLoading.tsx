import React from 'react'
import { Flex, Spin } from 'antd';
import './style.css'
const contentStyle = {
  
  background: 'rgba(0, 0, 0, 0.214)',
  borderRadius: 50,
};


const SpinLoading = () => {
  return (
    <Flex gap="middle">
      <Spin className='custom-spin' size="large">
        <div style={contentStyle} ></div>
      </Spin>
    </Flex>

  )
}

export default SpinLoading