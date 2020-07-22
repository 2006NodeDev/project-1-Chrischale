import { User } from "../Models/Users";
import { backendUpdateUser } from "../Remote/backend-updateUser";


export const updateUserTypes = {
    UPDATE_SUCCESSFUL: 'LB_UPDATE_LOGIN',
    BAD_CREDENTIALS: 'LB_BAD_CREDENTIALS',
    USERNAME_TAKEN:'LB_USERNAME_TAKEN',
    SERVER_ERROR:'LB_LOGIN_SERVER',
    RESET_ERROR:'LB_RESET_ERROR'

}

export const updateUserActionMapper = (userId:number, username:string, password:string, firstName:string, lastName:string, address:string, email:string, role:string, image:string)=> async (dispatch:any) => {
    try{
        let currUser = await backendUpdateUser(userId, username, password, firstName, lastName, address, email, role, image)
        console.log(currUser)
        dispatch({
            type:updateUserTypes.UPDATE_SUCCESSFUL,
            payload:{
                currUser
            }
        })
    }catch (err) {
        console.log(err.message)
        if(err.message.includes('400')){
            dispatch({
                type:updateUserTypes.BAD_CREDENTIALS
            })
        }else if (err.message.includes('405')){
            dispatch({
                type:updateUserTypes.USERNAME_TAKEN
            })
        } else{
            dispatch({
                type:updateUserTypes.SERVER_ERROR
            })
        }        
    }
}


export const updateUserErrorReset = () => {
    return{
        type:updateUserTypes.RESET_ERROR

    }

}

