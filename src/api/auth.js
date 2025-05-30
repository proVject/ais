import axios from "./axios";

/*
"email": "user1@mail.com",
"password": "PassWord12345",
"remember_me": "1"
* */
const login = (credentials) => {
    return axios.post('/api/v1/login', credentials).then((res) => res.data)
}
const isActive = (token) => {
    return axios.get(`/api/v1/oauth/activate/${token}`).then((res) => res.data)
}

export default {
    login,
    isActive
}