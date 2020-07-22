import {EventEmitter} from 'events'



export const expressEventEmitter = new EventEmitter()

//defining custom events so we can reference this directly
export const customExpressEvents = {
    NEW_USER: 'NEW_USER'
    
}