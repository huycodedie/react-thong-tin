import React,{useState} from 'react'
import { Cart,  Image, Left, Right} from './style'
import anh from '../../image/anh.jpg'
import './style.css'
import { datalucky } from './datalucky'
import Notificationmoney from './Notification_money/Notification_money';
import ResultError from '../../components/Result/Result_Error'
import { Modal } from 'antd';

function Itemlucky ({textspan,money,Name_money,result,sethandResult}) {
  const [show, setShow] = useState(false);

  const handshowmoney =()=>{
    setShow(false);
  }
  console.log("show",show);
  return (        
    <div>
      <Cart role="listitem-cart" onClick={()=>{
      setShow(true);
      }}>
      <Left role='left'>
        <Image role="image">
          <img style={{display:'flex', width:'100%', height:'auto',borderRadius:'12px',objectFit:'contain',boxShadow:'0 4px 12px rgba(0,0,0,0.3)'}}
            src={anh} 
            alt="Thiệp chúc mừng năm mới" 
            loading="lazy" 
          />
        </Image>
      </Left>
      <Right role='right'>
          <span style={{display: '-webkit-box',
                      WebkitLineClamp: 6,           
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      wordBreak: 'break-word',
                      maxWidth: '300px'} }>
          {textspan || 'Chúc bạn 1 năm mới ' + new Date().getFullYear() + ' vui vẻ'}
          {money}
          </span>
      </Right>
    </Cart>
    <Modal open={show}
        afterOpenChange={open => 
          setShow(open)
        }
        onCancel={() => {
        setShow(false); setTimeout(()=>{sethandResult()})}
      }>
      {result === false ? <Notificationmoney Name_money={Name_money} gia_tri={money} handmoney={handshowmoney} handresultset={sethandResult}/> : 

      <ResultError name_title={"Nhận Lì Xì thất bại"} name_subtitle={"Bạn đã nhận lì xì rồi không thể nhận thêm nữa"} handmoney={handshowmoney}/>}
    </Modal>
    </div>
    
  )
}

const shuffleArray = (array) => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
const Lucky_money_pages = ({handshow}) => {
  const [result, setResult] = useState(false);

  const handresult =()=>{
    setResult(true);
  }

  console.log("result",result);
  return (
    <div style={{display:'grid', alignItems:'center', justifyContent:'center'}}>
      <div className='Luckymoney'>
        {datalucky.map((item) => {
          // Lọc bỏ những giatri có soluong = 0
          let filteredList = item.giatri.filter(gt => parseInt(gt.soluong) > 0);

          // Tìm item có soluong > 500 (dùng làm phần tử bù)
          const bigItem = filteredList.find(gt => parseInt(gt.soluong) > 500);

          // Nếu số item hiện tại chưa đủ sl => bù thêm từ bigItem
          if (bigItem && filteredList.length < item.sl) {
            const missing = item.sl - filteredList.length;
            for (let i = 0; i < missing; i++) {
              filteredList.push({ ...bigItem, id: bigItem.id + '-extra-' + i });
            }
          }
          filteredList = shuffleArray(filteredList);
          return(
            <div key={item.key} className={`Container ${item.sl === 4 || item.sl === 2 ? "column-2" : "column-3" }` }>
            {filteredList.map((gt) =>(
              <Itemlucky key={gt.id} money={gt.sotien} Name_money={item.name} result={result} sethandResult={handresult}></Itemlucky>
            ))}   
            
          </div>
          )
        })}
         
      </div>
      <div style={{textAlign:'end',paddingRight:'20px',paddingTop:"15px"}}>
        <button onClick={()=>{handshow()}} style={{cursor:'pointer',backgroundColor:'#1677ff',height:'35px',width:'80px',border:'1px solid transparent',borderRadius:'6px',color:'#fff'}} type="primary" key="console" >
                    Trở lại
            </button>
      </div>
    </div>
  );
};


export default Lucky_money_pages