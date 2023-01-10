import axiosClient from "../Constan/AxiosConfig"

export const LoginService = async(account) => {
    const res = await axiosClient.post("api/loginNative",account)
    return res
}
export const RegisterService = async(account) => {
    const res = await axiosClient.post("api/register",account)
    return res
}
export const AddOrderSerive = async(order) => {
    const res = await axiosClient.post("api/addOrderReactNative",order)
    return res
}
export const getOrderByEmail = async(email) => {
    const res = await axiosClient.get(`api/userOrder/${email}`)
    return res
}
export const addTokenUser = async(token) => {
    const res = await axiosClient.post(`api/addTokenUser`,token)
    return res
}
export const getOrderByEmailInfinityScroll = async(action) => {
    try{
        const res = await axiosClient.get(`api/userOrder/${action.email}?page=${action.pageParam}&limit=4`)
        return res.data
    } catch (error) {
        console.log(error);
    }
}
export const getAllOrderInfinityScroll = async(action) => {
    try{
        const res = await axiosClient.get(`/api/getAllOrder?page=${action.pageParam}&limit=4`)
        return res.data
    } catch (error) {
        console.log(error);
    }
}