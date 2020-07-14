import { FunctionComponent } from "react"
import { proj1Client } from "."
import { User } from '../Models/Users'



export const getUserProfile = async (user:User) => {
    
    try{
        let response = await proj1Client.get(`/users/${user.userId}`)
        console.log(response)
        return response.data

    }catch(err){
        console.log('get profile error' + err)

    }
    

}