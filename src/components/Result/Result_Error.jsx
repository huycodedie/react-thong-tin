import React from 'react'
import './stype.css'
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Result, Typography } from 'antd';
const { Paragraph, Text } = Typography;

const Result_Error = ({name_title,name_subtitle,sub,handmoney}) => {
  return (
    <Result
    status="error"
    title={name_title}
    subTitle={name_subtitle}
    extra={[
      <Button type="primary" key="console" onClick={()=> handmoney()}>
        Quay lại
      </Button>,
      // <Button key="buy">Buy Again</Button>,
    ]}
  >
   {sub ===1 ? <div className="desc">
      <Paragraph>
        <Text
          strong
          style={{
            fontSize: 16,
          }}
        >
          The content you submitted has the following error:
        </Text>
      </Paragraph>
      <Paragraph>
        <CloseCircleOutlined className="site-result-demo-error-icon" /> Your account has been
        frozen. <a href='/profile'>Thaw immediately &gt;</a>
      </Paragraph>
      <Paragraph>
        <CloseCircleOutlined className="site-result-demo-error-icon" /> Your account is not yet
        eligible to apply. <a href='/profile'>Apply Unlock &gt;</a>
      </Paragraph>
    </div>: "" }
  </Result>
  )
}

export default Result_Error