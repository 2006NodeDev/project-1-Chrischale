import { ILoginState, state } from "./index";
import { AnyAction } from "redux";
import { profileTypes } from "../ActionMappers/profile-action-mapper";



//when running reducer for the first time this initializes it to null
//since creating a new user is just logging in as a new object, i left this as loginstate
const initialState:ILoginState = {
    currUser:undefined,
    errorMessage:''

}

export const profileReducer=(state = initialState, action:AnyAction) => {
    switch(action.type){
        case profileTypes.BAD_CREDENTIALS:{
            return {
                ...state,
                errorMessage:'Please Fill Out All Fields'
            }
        }
        case profileTypes.PROFILE_NOT_FOUND:{
            return {
                ...state,
                errorMessage:'Profile Not Found'
            }
        }
        case profileTypes.SERVER_ERROR:{
            return {
                ...state,
                errorMessage:'Oops...Internal Server Error'
            }        
        }
        case profileTypes.RESET_ERROR:{
            return {
                ...state,
                errorMessage:''
            }        
        }
        case profileTypes.PROFILE_FOUND:{
            return {
                ...state,
                currUser:action.payload.currUser
            }
        }
        default:{
            return state
        }

    }
 
    
}