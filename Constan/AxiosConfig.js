import axios from "axios"
const axiosClient = axios.create({
    baseURL: "http://localhost:5000/burger-demo-44d52/us-central1/app",
   headers : {
       'content-type' : 'application/json'
   },
  });
  export  default axiosClient