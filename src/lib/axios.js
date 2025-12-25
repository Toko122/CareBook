import axios from "axios";

const instance = axios.create({
    baseURL: "https://care-book-92s3-ibxl9zyr0-toko122s-projects.vercel.app/api"
})

instance.interceptors.request.use((config) => {
     const token = localStorage.getItem('token')
     if(token){
       config.headers.Authorization = `Bearer ${token}`
     } 
     return config
})

export default instance