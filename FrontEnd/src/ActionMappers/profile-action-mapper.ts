import { User } from "../Models/Users";
import { getUserProfile } from "../Remote/backend-getUserProfile";


export const profileTypes = {
    PROFILE_FOUND: 'LB_PROFILE_FOUND',
    BAD_CREDENTIALS: 'LB_BAD_CREDENTIALS',
    PROFILE_NOT_FOUND: 'LB_PROFILE_NOT_FOUND',
    SERVER_ERROR:'LB_LOGIN_SERVER',
    RESET_ERROR:'LB_RESET_ERROR'

}

export const profileActionMapper = (userId:number)=> async (dispatch:any) => {
    
    try{
        let currUser = await getUserProfile(userId)
        console.log(currUser)
        dispatch({
            type:profileTypes.PROFILE_FOUND,
            payload:{
                currUser
            }
        })
    }catch (err) {
        console.log(err.message)
        if(err.message.includes('400')){
            dispatch({
                type:profileTypes.BAD_CREDENTIALS
            })
        }else if (err.message.includes('404')){
            dispatch({
                type:profileTypes.PROFILE_NOT_FOUND
            })
        } else{
            dispatch({
                type:profileTypes.SERVER_ERROR
            })
        }        
    }
}


export const profileErrorReset = () => {
    return{
        type:profileTypes.RESET_ERROR

    }

}

