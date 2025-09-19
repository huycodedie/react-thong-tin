import React,{useState} from 'react'
import './style.css'
import { Space, Table,Tag, Input, QRCode, Image, InputNumber, message, DatePicker } from 'antd';
import { datajs } from './data';
import {
  CopyOutlined
} from '@ant-design/icons';
import anh from '../../../../../image/anh.jpg';
import { createStyles } from 'antd-style';

const onOk = value => {
  console.log('onOk: ', value);
};

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});
const columns = [
    {
    title: 'STT',
    key: 'stt',
    render:(text,record,index) => index + 1
  },
  {
    title: 'id thể loại',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // fixed: 'left',
    render: text => <span style={{cursor:'pointer'}}>{text}</span>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: ( tag ) => 
        {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        }},
  {
    title: 'Action',
    key: 'action',
    // fixed:'right',
    render: (_, record) => (
      <Space size="middle">
        <span style={{cursor:'pointer'}}>Invite</span>
        <span style={{cursor:'pointer',color:'red'}}>Delete</span>
      </Space>
    ),
  },
];


const Envelope = () => {
    // const [data, setData] = useState([]);
    const [text, setText] = useState('50');
    const [messageApi, contextHolder] = message.useMessage();
    const [textvh, setTextVh] = useState('50');
    let van = 'the_loai';

    const hand = (value)=>{
      setText(value)
    }
    const handvh = (value)=>{
      setTextVh(value)
    }
    const valueInput = `https://t.lixitet.top/api/${van}`;

    const copy = () =>{
      navigator.clipboard.writeText(valueInput)
        .then(() => messageApi.success('Đã sao chép'))
        .catch(() => messageApi.error('Sao chép thất bại'));
    };
    const { styles } = useStyle();
    
  //    useEffect(() => {
  //   fetch('https://t.lixitet.top/api/the_loai')
  //     .then(response => response.json())
  //     .then(json => {
  //       const dataWithKey = json.map((item, index) => ({
  //         ...item,
  //         key: item.id_tl || index
          
  //       }));
  //       setData(dataWithKey);
  //     })
  //     .catch(error => console.error('Lỗi khi fetch:', error));
  // }, []);
  return (
    
    <div>
      <div className='container-envelope' >
        <div style={{}}>
          <Image width={100} src={anh}
          />
        </div>
        <div style={{padding:'15px'}}>
          <h2>Tên lì xì: </h2>
          <div className='input-gioihan'>
            <div >
              <label style={{display:'block'}} >Giá giới hạn {text} nghìn </label>
              <InputNumber min={1} max={999999} className='input-gh' value={text} onChange={hand}/>
            </div>
            <div style={{display:''}}>
              <label style={{paddingLeft:'0px',display:'block'}}>số lượng</label>
              <InputNumber style={{width:'50px'}} min={1} max={10} defaultValue={2}/>
            </div>
          </div>
          <div style={{paddingTop:'10px'}}>
              <label style={{display:'block'}} >Giá vô hạn {textvh} nghìn </label>
              <InputNumber min={1} max={999999} className='input-gh' value={textvh} onChange={handvh}/>
          </div>
        </div>

         {/* ngày bắt đầu và kết thúc */}
         
        <div className='container-time'>
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
        <div style={{paddingLeft:'15px', paddingTop:'15px'}}>
            <Space direction="vertical" align="center">
              <QRCode s value={'https://t.lixitet.top/api/'+van || '...'} />
              <div style={{display:'flex'}}>
                <Input placeholder="..." maxLength={60} value={'https://t.lixitet.top/api/'+ van} readOnly/>
                <CopyOutlined style={{paddingLeft:'5px'}} onClick={copy}/>
                {contextHolder}
              </div>
            </Space>
        </div>
      </div>
      <div style={{paddingTop:'20px'}}>
        <Table
          className={styles.customTable}
          columns={columns}
          dataSource={datajs}
          scroll={{ x: 'max-content', y: 55 * 10 }}
        />
      </div>
    </div>
  )
}

export default Envelope