import { combineReducers } from "redux";
import { User } from "../Models/Users";
import { loginReducer } from "./login-reducer";

//login interface
export interface ILoginState{
    currUser:User|undefined,
    errorMessage:string

}


//type def for state
export interface IState{
    loginState:ILoginState
   // userState:IUserState

}

//the whole state of the store
export const state = combineReducers <IState>({
    //takes in an object that is all of the reducers
    loginState:loginReducer,
   // userState:userReducer



})