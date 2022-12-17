import axiosClient from "../Constan/AxiosConfig"

export const LoginService = async(account) => {
    const res = await axiosClient.post("api/users",account)
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