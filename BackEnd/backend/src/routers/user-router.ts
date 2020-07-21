import express, { Request, Response, NextFunction } from 'express'
import { authorizationMiddleware } from '../middleware/authoriz-middleware'
import {authenticationMiddleware} from '../middleware/authent-middleware'
import { getAllUsers, findUserbyID, updateUser, newUser } from '../dao/SQL/users-dao'
import { UserIdIncorrectError } from '../errors/UserIdIncorrectErr'
import { User } from '../models/Users'
import { BadCredError } from '../errors/Bad CredentialsErr'
//import { createNewUserService, getAllUsersService, getUserByIDService } from '../services/user-service'


export const uRouter = express.Router()


//add new user
uRouter.put('/newuser', async (req:Request, res:Response, next: NextFunction) => {
    
    let new_user: User = req.body
    console.log("router!:" + new_user)
      
    try{
        if (!(new_user.username || new_user.password || new_user.firstName || new_user.lastName)){
            throw new Error ('Please Fill Required Fields')
        }else{
            let result = await newUser(new_user)
            //let result = await createNewUserService(new_user)
            res.json(result)    

        }


    }catch (err){
        if(err.message === 'Please Fill All Fields'){
            throw BadCredError
        }

        next(err)

    }


})


//Find Users
uRouter.get('/', authenticationMiddleware, authorizationMiddleware(['Finance Manager']), async (req:Request, res:Response, next:NextFunction) => {

    try{

        let user_return = await getAllUsers()
//        let user_return = await getAllUsersService()
        res.json(user_return)
    
    } catch (err) {
        next(err)

    } 
    
})


//Find User by id
uRouter.get('/:id', authenticationMiddleware, authorizationMiddleware(['Finance Manager']), async (req:Request, res:Response, next:NextFunction)=>{
    let req_id = req.params.id
    //console.log(req_id)
    if (isNaN(+req_id)){
        next (UserIdIncorrectError)
    } else {
        try{
            let ret_user = await findUserbyID(+req_id)
//            let ret_user = await getUserByIDService(+req_id)
            res.json(ret_user)
        }catch (err){
            next(err)
    
        }
    }


})





//Update User
uRouter.patch('/:id', authenticationMiddleware, async (req:Request, res:Response, next: NextFunction) => {
    //The reimbursementId must be present as well as all fields to update, 
    //any field left undefined will not be updated. This can be used to approve and deny.
    
        let upd_user: User = req.body
          
        try{
            if (isNaN(upd_user.userId)){
                throw UserIdIncorrectError
            } else if(!upd_user){
                throw new Error ('Please provide details to update')
            }

            

            let result = await updateUser(upd_user)
            res.json(result)
    
        }catch (err){
            if(err.message === 'Please provide details to update'){
                throw BadCredError
            }

            next(err)
    
        }
    
    
    })




    








