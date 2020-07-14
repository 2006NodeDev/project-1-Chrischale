import { ILoginState, state } from "./index";
import { AnyAction } from "redux";



//when running reducer for the first time this initializes it to null
const initialState:ILoginState = {
    user:null

}

export const loginReducer= (state = initialState, action:AnyAction) => {
    switch(action.type){
        case 'bad credentials error':{
            return state

        }
        case 'user not found':{
            return state

        }
        case 'login successful':{
            return state

        }
        default:{
            return state
        }

    }
 
    
}