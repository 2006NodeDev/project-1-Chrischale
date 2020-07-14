import { compose, applyMiddleware, createStore } from "redux"
import reduxThunk from 'redux-thunk'
import { state } from "./Reducers"



//browser window
const w:any = window

//if they have dev tools use them, else ues the default composer 
const composeEnhancers = w.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

//making redux thinkg
const enhancer = composeEnhancers(
    applyMiddleware(reduxThunk)
)

//making the store
export const store = createStore(
    state,
    enhancer
)