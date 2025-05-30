import axios from 'axios'
import {ACCESS_TOKEN_NAME} from "../constants/auth.js";

axios.defaults.baseURL = import.meta.env.VITE_API_URL

axios.interceptors.request.use(config => {
    const token = localStorage.getItem(ACCESS_TOKEN_NAME)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default axios