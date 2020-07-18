import { FunctionComponent } from "react"
import { proj1Client } from "."



export const backendNewUser = async (username:string, password:string, firstName:string, lastName:string,  address:string, email:string) => {
    
    let credentials = {
        username,
        password,
        firstName,
        lastName,
        address,
        email   
    }
    try{
        let response = await proj1Client.put('/users/newuser', credentials)
        console.log("backend response" + response)
        return response.data

    }catch(err){
        console.log('new user error ' + err)

    }
    

}