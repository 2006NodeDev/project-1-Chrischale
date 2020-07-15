import { FunctionComponent } from "react"
import { proj1Client } from "."
import { User } from '../Models/Users'



export const getUserProfile = async (userId:number) => {
    
    try{
        let response = await proj1Client.get(`/users/${userId}`)
        console.log(response)
        return response.data

    }catch(err){
        console.log('getting profile error' + err)

    }
    

}