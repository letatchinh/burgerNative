import axios from "axios"
const ipCongty = "192.168.88.167"
const ipNha = "192.168.1.4"
const ipDongNau = "192.168.1.72"
const axiosClient = axios.create({
    baseURL: `http://${ipNha}:5000/burger-demo-44d52/us-central1/app`,
   headers : {
       'content-type' : 'application/json'
   },
  });
  export  default axiosClient