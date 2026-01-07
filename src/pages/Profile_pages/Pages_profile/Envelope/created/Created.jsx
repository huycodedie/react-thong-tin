import React,{useState, useEffect} from 'react'
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import { useMutationHook } from "../../../../../hooks/useMutationHook";
import { Modal} from 'antd';
import Addlucky from '../../Add/Add_lucky/Add_lucky';
import { PlusOutlined } from '@ant-design/icons';
import * as ProfileService from '../../../../../services/ProfileService'
import { useQuery } from '@tanstack/react-query';
import Cardlist from '../../../../../components/Card/Card_list'

export const Created = ({Iduser, roles, token}) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  
  const mutation = useMutationHook(
    data => ProfileService.createBoxLiXi(data)
  )
  const {isSuccess} = mutation
  console.log('isbuccess',isSuccess)
  useEffect(()=>{
    if(isSuccess){
      refetch()
    }
  },[isSuccess])

  const fetchDeleteEnvelopr = async (idBox)=>{
    const res = await ProfileService.deleteBoxLiXi(idBox);
    await refetch();
    return res;
  }
  const fetchGetEnvelopeUser = async () =>{
    const res = await ProfileService.getBoxLiXi(Iduser,token);
    return res;
  }
  const { data, refetch } = useQuery({
    queryKey: ["getEnvelope", Iduser], // key phải nằm trong object
    queryFn: fetchGetEnvelopeUser,
    enabled: !!Iduser, 
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });

  const handleCreateBox =(data)=>{
    // console.log('data',data)
    mutation.mutate({
      data
    })
  }

  const handleShowCreate =()=>{
    setShow(false)
  } 

  const handleClick = (id) => {
    const data = {
      id: id
    };
    navigate("/profile/li-xi-ca-nhan/thongtin", { state: data });  // ✅ truyền dữ liệu qua state
  };

  console.log('data create',data)
  return (
    <>
        <title>Lì xì</title>
          <div className='boder-lucky-list-user' >
            <div style={{textAlign:'end', paddingRight:'50px'}}>
              <button onClick={()=> setShow(true)} style={{cursor:'pointer'}}
                  size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                  icon={<PlusOutlined />}
              > thêm box</button>
            </div>
            <div className='container-list'>
              <div className='container-lucky-list-user-child'>
                {data?.data?.map((item, index) =>(
                      <Cardlist
                          key={item._id}
                          color="#7df9ff"
                          speed={1}
                          chaos={0.5}
                          thickness={2}
                          style={{ borderRadius: 15}}>
                            <div className='body-card'>
                              <div className="container-car">
                                <div className="electric-card">
                                  <span className="tag">{item.feature}</span>
                                  <span className="tag">Trạng thái: {item.feature}</span>
                                  <h2>{item.nameEnvelope}</h2>
                                  <span>{item.note||'thử với vận may chính mình biết đâu bất ngờ'} {item._id}</span>
                                  <div className="tags">
                                    <span>Đã nhận :</span>
                                    <span>{item.listUser?.length}</span>
                                  </div>
                                  <div className="tags">
                                    <span>Ngày tạo :</span>
                                    <span>{dayjs(item.createdAt).format('DD-MM-YYYY HH:mm')}</span>
                                  </div>
                                  <div className="tags">
                                    <span>Thời gian mở :</span>
                                    <span>{dayjs(item.runningtime).format('DD-MM-YYYY HH:mm')}</span>
                                  </div>
                                  <div className="tags">
                                    <span>Thời gian đóng :</span>
                                    <span>{dayjs(item.endtime).format('DD-MM-YYYY HH:mm')}</span>
                                  </div>
                                  <div className="btn">
                                    <button className="btn-click-get" onClick={()=>{handleClick(item._id)}}>Get Started</button>

                                    <button className="btn-click-delete" onClick={()=>{fetchDeleteEnvelopr(item._id)}}>Delete</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Cardlist>
                    ))}
              </div>
            </div>
            <Modal open={show}
                afterOpenChange={open => 
                  setShow(open)
                }
                onCancel={() => {
                setShow(false); setTimeout(()=>{})}
              }>
              <Addlucky iduser={Iduser} roles={roles} handleShowCreate={handleShowCreate} handleCreateBox={handleCreateBox}/>
            </Modal>
          </div>
    </>
  )
}
