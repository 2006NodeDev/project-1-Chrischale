import axios from 'axios'
import {p1BaseUrl} from '../environment'

export const proj1Client = axios.create({
    //baseURL:'http://localhost:2020',
    baseURL:p1BaseUrl,
    headers:{
        'Content-Type':'application/json'
    },
    withCredentials:true
})