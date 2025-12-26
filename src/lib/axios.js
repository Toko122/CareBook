import axios from "axios";

const instance = axios.create({
    baseURL: "https://care-book-92s3-cshzd7ukg-toko122s-projects.vercel.app/api"
})

instance.interceptors.request.use((config) => {
     if (typeof window !== 'undefined') {
       const token = localStorage.getItem('token')
       if (
         token &&
         !config.url?.includes("/auth/login") &&
         !config.url?.includes("/auth/register")
       ) {
         config.headers.Authorization = `Bearer ${token}`;
       }
     }
     return config
})

export default instance