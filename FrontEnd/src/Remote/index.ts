import axios from 'axios'

export const proj1Client = axios.create({
    baseURL:'http://localhost:2020',
    headers:{
        'Content-Type':'application/json'
    },
    withCredentials:true
})