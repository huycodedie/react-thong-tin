import React, { Fragment, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {tab} from './routes/tab'
import Default_components from './components/DefaultComponents/DefaultComponents';
import { MessageProvider } from './components/Message/MessageProvider';
import { isJsonString } from './utils';
import { jwtDecode } from 'jwt-decode';
import * as UserService from './services/UserService'
import { useDispatch } from 'react-redux';
import { updateUser } from './redux/slides/userSlide';

// import axios from 'axios';
// import { useQuery } from '@tanstack/react-query';

function App() {
  const dispatch = useDispatch()

  useEffect(() =>{
    let {storageData, decoded} = handleDecoded()
    if(decoded?.id){
      handleGetDetailsUser(decoded?.id,storageData)
    }    
  },[])  

  const handleDecoded = () =>{
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if(storageData && isJsonString(storageData)){
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData)        
    }     
    return {decoded, storageData}
  }

  UserService.axiosJWT.interceptors.request.use(async (config) => {
      // Do something before request is sent
      const currentTime = new Date()
      const {decoded} = handleDecoded()
      if(decoded?.exp < currentTime.getTime() / 1000){
        const data = await UserService.refreshToken()
        config.headers['token'] = `Bearer ${data?.access_token}`
      }

      return config;
    }, (err) => {
      // Do something with request error
      return Promise.reject(err)
    });

  const handleGetDetailsUser = async (id, token)=>{
    const timetoken = Date.now() / 1000;
    const decodedtoken = jwtDecode(token)
    if(decodedtoken.exp < timetoken){
      const res = await UserService.getDetailsUser(id,token)
      dispatch(updateUser({...res?.data, access_token: token}))
    }
  }
  return (
    <div>
    <MessageProvider>
      <Router>
        <Routes>
          {tab.map((route) => {
            const Page = route.page
            const Layout = route.isShow ? Default_components : Fragment
            return (
              <Route key={route.path} path={route.path} element={
              <Layout>
                <div>
                  <Page/>
                </div>
              </Layout>
            }/>
            )
          })}
        </Routes>
      </Router>
      </MessageProvider>
    </div>
  );
}

export default App;
