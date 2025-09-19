import React from 'react'
import { Button, Result } from 'antd';

const NotFound_page = () => {
  return (
    <Result
    status="500"
    title="500"
    subTitle="Sorry, something went wrong."
    extra={<Button type="primary"><a href='/'>Back Home</a></Button>}
  />
  )
}

export default NotFound_page