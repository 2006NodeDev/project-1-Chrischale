import { ILoginState, state } from "./index";
import { AnyAction } from "redux";
import { updateUserTypes } from "../ActionMappers/update-user-action-mapper";



//when running reducer for the first time this initializes it to null
//since creating a new user is just logging in as a new object, i left this as loginstate
const initialState:ILoginState = {
    currUser:undefined,
    errorMessage:''

}

export const updateuserReducer=(state = initialState, action:AnyAction) => {
    switch(action.type){
        case updateUserTypes.BAD_CREDENTIALS:{
            return {
                ...state,
                errorMessage:'Please Fill Out All Fields'
            }
        }
        case updateUserTypes.USERNAME_TAKEN:{
            return {
                ...state,
                errorMessage:'Username Taken'
            }
        }
        case updateUserTypes.SERVER_ERROR:{
            return {
                ...state,
                errorMessage:'Oops...Internal Server Error'
            }        
        }
        case updateUserTypes.RESET_ERROR:{
            return {
                ...state,
                errorMessage:''
            }        
        }
        case updateUserTypes.UPDATE_SUCCESSFUL:{
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