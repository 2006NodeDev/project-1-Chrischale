import { User } from "../Models/Users";


export const userTypes = {
    USER_UPDATE_LOGIN: 'USER_UPDATE_LOGIN'
}

export function updateLoginUser(loginUser:User){
    return {
        type: userTypes.USER_UPDATE_LOGIN,
        payload:{
            loginUser
        }
    }

}
