//all the event listeners relevant to creating a new user

import { expressEventEmitter, customExpressEvents } from ".";
import { User } from "../models/Users";
import { userTopic } from "../messaging";

expressEventEmitter.on(customExpressEvents.NEW_USER, (newUser:User) =>{
    //resolve a contained func async-ly
    setImmediate(()=>{
        try{
            let res = userTopic.publishJSON(newUser)
            //get back message's id
            console.log(res)

        }catch (err){
            console.log(err)
        }
    })
    
})




expressEventEmitter.on(customExpressEvents.NEW_USER, (newUser:User) =>{
    
})




expressEventEmitter.on(customExpressEvents.NEW_USER, (newUser:User) =>{
    
})



expressEventEmitter.on(customExpressEvents.NEW_USER, (newUser:User) =>{
    
})