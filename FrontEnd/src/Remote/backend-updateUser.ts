import { FunctionComponent } from "react"
import { proj1Client } from "."



export const backendUpdateUser = async (username:string, password:string, firstName:string, lastName:string,  address:string, email:string, role:string) => {
    
    let credentials = {
        username,
        password,
        firstName,
        lastName,
        address,
        email,
        role   
    }
    try{
        let response = await proj1Client.patch('/users/updateuser', credentials)
        //console.log("backend response" + response)
        return response.data

    }catch(err){
        console.log('updating user error ' + err)

    }
    

}