import axios from "axios"

export const laylucky = async (idbox,userId) =>{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/envelope/get-details/${idbox}`, {
            id: String(userId)
        })
    return res.data
}
export const postuserbox = async (idbox, idmoney, iduser, money) =>{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/envelope/create/${idbox}/Normal`, {
            user: String(iduser),
            idmoney: String(idmoney),
            money: Number(money)
        })
    return res.data
}