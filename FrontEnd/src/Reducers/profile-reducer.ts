import { state, IProfileState } from "./index";
import { AnyAction } from "redux";



//when running reducer for the first time this initializes it to null
const initialState:IProfileState = {
    user:null

}

export const profileReducer= (state = initialState, action:AnyAction) => {
    switch(action.type){
        case 'not logged in':{
            return state

        }
        case 'insufficient auth':{
            return state

        }
        default:{
            return state
        }

    }
 
    
}