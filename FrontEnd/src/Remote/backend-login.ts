import { FunctionComponent } from "react"
import { proj1Client } from "."



export const backendLogin = async (username:string, password:string) => {
    
    let credentials = {
        username,
        password
    }
    console.log("creds into backeng login:" + credentials)
    try{
        let response = await proj1Client.post('/login', credentials)
        console.log(response)
        return response.data

    }catch(err){
        console.log('login error ' + err)
        throw (err)

    }
    

}