import { User } from "../Models/Users";


export const userTypes = {
    USER_PROFILE_UPDATE: 'USER_PROFILE_UPDATE'
}

export function updateProfileUser(loginUser:User|null){
    return {
        type: userTypes.USER_PROFILE_UPDATE,
        payload:{
            loginUser
        }
    }

}
