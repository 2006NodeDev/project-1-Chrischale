import axios from 'axios'

export const proj1Client = axios.create({
    //baseURL:'http://localhost:2020',
    baseURL:'http://35.190.10.193:80',
    headers:{
        'Content-Type':'application/json'
    },
    withCredentials:true
})