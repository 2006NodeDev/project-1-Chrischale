import { ILoginState, state } from "./index";
import { AnyAction } from "redux";
import { loginTypes } from "../ActionMappers/login-action-mapper";



//when running reducer for the first time this initializes it to null
const initialState:ILoginState = {
    currUser:undefined,
    errorMessage:''

}

export const loginReducer=(state = initialState, action:AnyAction) => {
    switch(action.type){
        case loginTypes.AUTH_ERROR:{
            return {
                ...state,
                errorMessage:'Incorrect Username or Pasword'
            }
        }
        case loginTypes.USER_NOT_FOUND:{
            return {
                ...state,
                errorMessage:'User Not Found'
            }
        }
        case loginTypes.BAD_CREDENTIALS:{
            return {
                ...state,
                errorMessage:'Please Fill Out All Fields'
            }
        }
        case loginTypes.SERVER_ERROR:{
            return {
                ...state,
                errorMessage:'Oops...Internal Server Error'
            }        
        }
        case loginTypes.RESET_ERROR:{
            return {
                ...state,
                errorMessage:''
            }        
        }
        case loginTypes.LOGIN_SUCCESSFUL:{
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