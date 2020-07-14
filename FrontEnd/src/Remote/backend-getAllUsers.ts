import { FunctionComponent } from "react"
import { proj1Client } from "."



export const getAllUsers = async () => {
    
    try{
        let response = await proj1Client.get('/users')
        console.log(response)
        return response.data

    }catch(err){
        console.log('get all users error' + err)

    }
    

}