import { combineReducers } from "redux";
import { User } from "../Models/Users";
import { loginReducer } from "./login-reducer";
import { profileReducer } from "./profile-reducer";

//login interface
export interface ILoginState{
    user:User|null
}


//user interface


//profile interface
export interface IProfileState{
    user:User|null

}


//type def for state
export interface IState{
    loginState:ILoginState
    profileState:IProfileState

}

//the whole state of the store
export const state = combineReducers <IState>({
    //takes in an object that is all of the reducers
    loginState:loginReducer,
    profileState:profileReducer,



})