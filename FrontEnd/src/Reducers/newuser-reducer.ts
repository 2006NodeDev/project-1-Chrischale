import { ILoginState, state } from "./index";
import { AnyAction } from "redux";
import { newuserTypes } from "../ActionMappers/newuser-action-mapper";



//when running reducer for the first time this initializes it to null
//since creating a new user is just logging in as a new object, i left this as loginstate
const initialState:ILoginState = {
    currUser:undefined,
    errorMessage:''

}

export const newuserReducer=(state = initialState, action:AnyAction) => {
    switch(action.type){
        case newuserTypes.BAD_CREDENTIALS:{
            return {
                ...state,
                errorMessage:'Please Fill Out All Fields'
            }
        }
        case newuserTypes.USERNAME_TAKEN:{
            return {
                ...state,
                errorMessage:'Username Taken'
            }
        }
        case newuserTypes.SERVER_ERROR:{
            return {
                ...state,
                errorMessage:'Oops...Internal Server Error'
            }        
        }
        case newuserTypes.RESET_ERROR:{
            return {
                ...state,
                errorMessage:''
            }        
        }
        case newuserTypes.LOGIN_SUCCESSFUL:{
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