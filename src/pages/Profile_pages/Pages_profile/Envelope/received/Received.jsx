import React from 'react'
import Cardlist from '../../../../../components/Card/Card_list'
import dayjs from 'dayjs';
import * as ProfileService from '../../../../../services/ProfileService'
import { useQuery } from '@tanstack/react-query';

export const Received = ({Iduser}) => {

  const fetchGetUserEnvelopeStatus = async () =>{
    const res = await ProfileService.getUserBoxStatus(Iduser);
    return res;
  }
  const { data } = useQuery({
    queryKey: ["GetUserEnvelopeStatus", Iduser], // key phải nằm trong object
    queryFn: fetchGetUserEnvelopeStatus,
    enabled: !!Iduser, 
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });
  console.log('data recei',data)

  return (
    <>
      <div className='boder-lucky-list-user' >
            <div className='container-list' style={{overflowY:'auto'}}>
              <div className='container-lucky-list-user-child'>
                {data?.data?.map((item, index) =>(
                      <Cardlist
                          key={item._id}
                          color="#7df9ff"
                          speed={1}
                          chaos={0.5}
                          thickness={2}>
                            <div className='body-card'>
                              <div className="container-car">
                                <div className="electric-card">
                                  <h2>{item.nameEnvelope}</h2>
                                  <span className="tag">{item.feature}</span>
                                  <span className="tag" style={{background:'red'}}>Trạng thái: {item.listUser[0].status}</span>
                                  <div className="tags">
                                    <span>Đã nhận :</span>
                                    <span>{item.listUser[0].valuemoney}</span>
                                  </div>
                                  <div className="tags">
                                    <span>Ngày tạo :</span>
                                    <span>{dayjs(item.listUser[0].receivingTime).format('DD-MM-YYYY HH:mm')}</span>
                                  </div>
                                 
                                 
                                </div>
                              </div>
                            </div>
                          </Cardlist>
                    ))}
              </div>
            </div>
          </div>
    </>
  )
}
