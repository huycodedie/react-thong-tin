import React,{useState} from 'react'
import './style.css'
import { Input, InputNumber, Form, Space, Button, DatePicker, Radio } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const Add_lucky = ({iduser, roles, handleShowCreate, handleCreateBox}) => {

  const [featureValue, setFeatureValue] = useState("");

  const config = {
    rules: [{ type: 'object', required: true, message: 'Vui lòng chọn thời gian!' }],
  };
  
  const onFinish = values => {
      const valueArray = values.value || [];

    const infinityMoney = values.infinityMoney;
  
    if (infinityMoney !== undefined) {
      valueArray.push({
        money: infinityMoney
      });
    }
    const payload = {
      ...values,
      value: valueArray,
      user: iduser,
    };
    handleCreateBox(payload)
    console.log('Received values of form:', payload);
    handleShowCreate()
  };
  return (
    <div style={{display:'flex',justifyContent:'center'}}>
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        style={{ maxWidth: 600 ,textAlign:'center'}}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="nameEnvelope"
          rules={[{ required: true, message: 'Vui lòng nhập tên lì xì!' }]}
        >
          <Input />
        </Form.Item>
        <span label='dsadsa' style={{display:'flex'}}>Giá trị may mắn{iduser} </span>
        <Form.List name="value">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                   <Space key={key} style={{ display: 'flex', marginBottom: 8,justifyContent:'center' }} align="baseline">
                  <Form.Item
                    label='gt'
                    {...restField}
                    name={[name, 'money']}
                    rules={[{ required: true, message: 'nhập số tiền' }]}
                  >
                    <InputNumber placeholder="First Name" />
                  </Form.Item>
                  <Form.Item
                    label="sl"
                    {...restField}
                    name={[name, 'quantity']}
                    rules={[{ required: true, message: 'nhập số lượng' }]}
                  >
                    <InputNumber placeholder="Last Name" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}

              <Form.Item>
                <Button type="dashed" style={{width:'300px'}} onClick={() => add()} block icon={<PlusOutlined />}>
                  Thêm
                </Button>
              </Form.Item>
              
            </>
          )}
        </Form.List>
        <Form.Item
          label="Giá trị vô hạn"
          name="infinityMoney"
          rules={[{ required: true, message: 'Vui lòng nhập giá trị vô hạn' }]}
        >
          <InputNumber placeholder="Nhập giá trị vô hạn" />
        </Form.Item>
        {roles === 'Admin' && (
          <Form.Item 
            label="Mục gì"
            name='feature'
            >
            <Radio.Group onChange={(e) => setFeatureValue(e.target.value)} >
              <Radio value='Normal'> Normal </Radio>
              <Radio value='Birthday'> Birthday </Radio>
              <Radio value='select-user' > select-user </Radio>
            </Radio.Group>
          </Form.Item>
        )}

          {featureValue === 'select-user' && (
            <Form.Item 
          label="Số chắc thê"
          name='quantityBox'
          rules={[{ required: true, message: 'Vui lòng chọn số lượng lì xì' }]}
          >
          <Radio.Group >
            <Radio value={2}> 2 </Radio>
            <Radio value={4}> 4 </Radio>
            <Radio value={6}> 6 </Radio>
          </Radio.Group>
        </Form.Item>
          )}

        <Form.Item 
          label="Số lượng lì xì"
          name='quantityBox'
          rules={[{ required: true, message: 'Vui lòng chọn số lượng lì xì' }]}
          >
          <Radio.Group >
            <Radio value={2}> 2 </Radio>
            <Radio value={4}> 4 </Radio>
            <Radio value={6}> 6 </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Lời chúc người nhận"
          name="note"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="runningtime" label="Thời gian hoạt động" {...config}>
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item name="endtime" label="Thời gian kết thúc" {...config}>
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Add_lucky