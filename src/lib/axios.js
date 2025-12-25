import axios from "axios";

const instance = axios.create({
    baseURL: "https://care-book-92s3-jinsttrv5-toko122s-projects.vercel.app/api"
})

instance.interceptors.request.use((config) => {
     const token = localStorage.getItem('token')
     if(token && !config.url?.includes("/features/auth/login") &&
      !config.url?.includes("/features/auth/register")){
       config.headers.Authorization = `Bearer ${token}`
     } 
     return config
})

export default instance