import axios from "axios";

const instance = axios.create({
    baseURL: "https://care-book-92s3.vercel.app/api"
})

instance.interceptors.request.use((config) => {
     const token = localStorage.getItem('token')
    if (
      token &&
      !config.url?.includes("/auth/login") &&
      !config.url?.includes("/auth/register")
    ) {

      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  

     return config
})

export default instance