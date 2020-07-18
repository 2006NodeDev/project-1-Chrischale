import { User } from "../Models/Users";
import { backendLogin } from "../Remote/backend-login";


export const loginTypes = {
    LOGIN_SUCCESSFUL: 'LB_SUCCESSFUL_LOGIN',
    AUTH_ERROR: 'LB_AUTH_ERROR',
    BAD_CREDENTIALS: 'LB_BAD_CREDENTIALS',
    SERVER_ERROR:'LB_LOGIN_SERVER',
    USER_NOT_FOUND:'LB_LOGIN_USER_NOT_FOUND',
    RESET_ERROR:'LB_RESET_ERROR'

}

export const loginActionMapper = (username:string, password:string) => async (dispatch:any) => {
    try{
        let currUser = await backendLogin(username, password)
        console.log(currUser)
        
        dispatch({
            type:loginTypes.LOGIN_SUCCESSFUL,
            payload:{
                currUser
            }
        })
    }catch (err) {
        console.log(err.message)
        if(err.message.includes('404')){
            dispatch({
                type:loginTypes.USER_NOT_FOUND
            })
        } else if(err.message.includes('401')){
            dispatch({
                type:loginTypes.AUTH_ERROR
            })
        } else if(err.message.includes('400')){
            dispatch({
                type:loginTypes.BAD_CREDENTIALS
            })
        } else{
            dispatch({
                type:loginTypes.SERVER_ERROR
            })
        }        
    }
}


export const loginErrorReset = () => {
    return{
        type:loginTypes.RESET_ERROR

    }

}

