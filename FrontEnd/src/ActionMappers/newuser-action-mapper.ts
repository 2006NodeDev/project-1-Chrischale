import { User } from "../Models/Users";
import { backendNewUser } from "../Remote/backend-createNewUser";


export const newuserTypes = {
    LOGIN_SUCCESSFUL: 'LB_SUCCESSFUL_LOGIN',
    BAD_CREDENTIALS: 'LB_BAD_CREDENTIALS',
    USERNAME_TAKEN:'LB_USERNAME_TAKEN',
    SERVER_ERROR:'LB_LOGIN_SERVER',
    RESET_ERROR:'LB_RESET_ERROR'

}

export const newuserActionMapper = (username:string, password:string, firstName:string, lastName:string, address:string, email:string, image:string)=> async (dispatch:any) => {
    let default_role = "User"
    let userId = 0
    try{
        let currUser = await backendNewUser(userId, username, password, firstName, lastName, address, email, default_role, image)
        console.log(currUser)
        dispatch({
            type:newuserTypes.LOGIN_SUCCESSFUL,
            payload:{
                currUser
            }
        })
    }catch (err) {
        console.log(err.message)
        if(err.message.includes('400')){
            dispatch({
                type:newuserTypes.BAD_CREDENTIALS
            })
        }else if (err.message.includes('405')){
            dispatch({
                type:newuserTypes.USERNAME_TAKEN
            })
        } else{
            dispatch({
                type:newuserTypes.SERVER_ERROR
            })
        }        
    }
}


export const newuserErrorReset = () => {
    return{
        type:newuserTypes.RESET_ERROR

    }

}

