import axios from "axios"

export const getBoxLiXi = async (id,access_token) =>{    
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/envelope/getall-user/${id}`,{
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const createBoxLiXi = async (data) =>{    
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/envelope/create`,data.data)
    return res.data
}
export const deleteBoxLiXi = async (idBox) =>{    
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/envelope/delete/${idBox}`)
    return res.data
}

export const getUserBoxLiXi = async (idBox) =>{    
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/envelope/get-user-box/${idBox}`)
    return res.data
}
export const deleteUserBoxLiXi = async (idBox, user) =>{    
    // console.log('idbox',idBox)
    // console.log('user',user)
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/envelope/delete/${idBox}/Normal`, {
        data: {user: String(user)}
    })
    return res.data
}

export const getUserBoxStatus = async (idUser) =>{    
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/envelope/get-user-box-status/${idUser}`)
    return res.data
}
// export const postuserbox = async (idbox, idmoney, iduser, money) =>{
//     console.log('data qua',idbox,idmoney,iduser,money)
//         const res = await axios.post(`${process.env.REACT_APP_API_URL}/envelope/create/${idbox}/Normal`, {
//             user: String(iduser),
//             idmoney: String(idmoney),
//             money: Number(money)
//         })
//     return res.data
// }