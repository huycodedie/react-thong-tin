import React,{useState} from 'react'
import './style.css'
import { Input, InputNumber,DatePicker } from 'antd';

const onOk = value => {
  console.log('onOk: ', value);
};
const onChange = (e) => {
  console.log(e);
};
const Add_lucky = () => {
  const [text, setText] = useState('50'); 
  const [textvh, setTextVh] = useState('50');
  const hand = (value)=>{
    setText(value)
  }
  const handvh = (value)=>{
    setTextVh(value)
  }

  return (
    <div className='container-add'>
      <div style={{}}>
        <div style={{textAlign:'center'}}>
          <h2>Tạo Lì Xì</h2>
        </div>
        <div style={{}}>
          <label style={{paddingRight:'15px'}} htmlFor="đá">Tên lì xì</label>
          <Input style={{width:'200px'}} placeholder="input with clear icon" allowClear onChange={onChange} />
        </div>
        <div className='input-gioihan-1'>
          <div >
            <label style={{display:'block'}} >Giá giới hạn {text} nghìn </label>
            <InputNumber min={1} max={999999} className='input-gh' value={text} onChange={hand}/>
          </div>
          <div style={{paddingLeft:'5px'}}>
            <label style={{paddingLeft:'0px',display:'block'}}>số lượng</label>
            <InputNumber style={{width:'50px'}} min={1} max={10} defaultValue={2}/>
          </div>
        </div>
        <div style={{paddingTop:'10px'}}>
            <label style={{display:'block'}} >Giá vô hạn {textvh} nghìn </label>
            <InputNumber min={1} max={999999} className='input-gh' value={textvh} onChange={handvh}/>
        </div>
        <div className='container-time-1'>
          <div >
            <div >
              <label style={{display:'block'}} >Ngày bắt đầu:</label>
              <DatePicker
                showTime
                onChange={(value, dateString) => {
                  console.log('Selected Time: ', value);
                  console.log('Formatted Selected Time: ', dateString);
                }}
                onOk={onOk}
              />
            </div>
          </div>
          <div style={{paddingTop:'10px'}}>
              <label style={{display:'block'}} >Ngày kết thúc:</label>
              <DatePicker
                showTime
                onChange={(value, dateString) => {
                  console.log('Selected Time: ', value);
                  console.log('Formatted Selected Time: ', dateString);
                }}
                onOk={onOk}
              />
          </div>
          </div>
      </div>
    </div>
  )
}

export default Add_lucky