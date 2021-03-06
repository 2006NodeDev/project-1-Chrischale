import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";
import { userDTOtoUser } from "../../utils/UserDTO-to-User";
import { UserNotFoundError } from "../../errors/UserNotFoundErr";
import { AuthError } from "../../errors/AuthError";
import {UsernameTakenError} from "../../errors/UsernameTakenError"
import { User } from "../../models/Users";
import { BadCredError } from "../../errors/Bad CredentialsErr";



//login

export async function getUserByUsernamePassword(username: string, password:string) : Promise <User>{
    let client: PoolClient

    try{
        
        client = await connectionPool.connect() //gives you a promise, so you take it out of the stack to prevent blocking
        
        let result:QueryResult = await client.query(`select * from ers."users" u where u."username" = $1 and u."password" = $2;`, [username, password])

        if(!result){
            console.log("no result from client query :(")
        }
        console.log("got dao result" + result)
        
        if (result.rowCount === 0){
            throw new Error ('User Not Found')
        } else {
            return userDTOtoUser(result.rows[0])

        }
    }catch (err){
        console.log(err)
        if(err.message === 'User Not Found'){
            
            throw new AuthError
        }
        throw new Error('cant login error')
    } finally {
        client && client.release()
    }
}


//get all users

export async function getAllUsers(){
    let client:PoolClient

    try{
        client = await connectionPool.connect() //gives you a promise, so you take it out of the stack to prevent blocking
        let result:QueryResult = await client.query('select * from ers."users";')
        
        return result.rows.map(userDTOtoUser)

    }catch (err){

        console.log(err)
        throw new Error('No Users in System')

    }finally{
        client && client.release()

    }

}



//get users by id

export async function findUserbyID(id: number){
    let client:PoolClient
    
    try{
        client = await connectionPool.connect() //gives you a promise, so you take it out of the stack to prevent blocking
        let result:QueryResult = await client.query(`select * from ers."users" u where u."user_id" = $1;`, [id])
        
        if (result.rowCount === 0){
            throw new Error('User Not Found')
        } else{
            return userDTOtoUser(result.rows[0])


        }

    }catch (err){
        if(err.message === 'User Not Found'){
            throw new UserNotFoundError()
        }
        throw new Error('Unimplimented id error')
        
 
    }finally{
        client && client.release()

    }
 

}



//update user

export async function updateUser(upd_Reimb : User) : Promise <User>{
    let client:PoolClient
      
    try{
        client = await connectionPool.connect() //gives you a promise, so you take it out of the stack to prevent blocking
        let n = await client.query(`select * from ers."users" r where  r."user_id" = $1;`, [upd_Reimb.userId])

        //convert required user to a User object
        let newReimb = userDTOtoUser(n.rows[0])
       
        for (const f in upd_Reimb){
            let q =  upd_Reimb[f]
            newReimb[f] = q           
        }

        if(newReimb.roleDetails.role === 'Admin'){
            newReimb.roleDetails.roleID = 1
        } else if (newReimb.roleDetails.role === 'Finance Manager'){
            newReimb.roleDetails.roleID = 3
        }else{
            newReimb.roleDetails.roleID = 2

        }
        
        let result = await client.query(`update ers."users" u set "first_name" = $1, "last_name" = $2, "address" = $3 "email" = $4, "role_id" = $5, "role" = $6, "image" = $7 where u."user_id" =  $8 returning *;`, 
                                                        [newReimb.firstName, newReimb.lastName, newReimb.address, newReimb.email, newReimb.roleDetails.roleID, newReimb.roleDetails.role, newReimb.address, newReimb.image, upd_Reimb.userId])
        return result.rows[0]
             
    }catch (err){
        if (err.message === 'ID is not a number'){
            throw new BadCredError
        }
        
        
        console.log(err)
        throw new Error('Unimplimented id error')
        
    }finally{
        client && client.release()

    }
}




//create new user
export async function newUser(new_user: User) : Promise <User> {
    let client:PoolClient
      
    try{
        client = await connectionPool.connect() 
        let n = await client.query(`select * from ers."users" u where u."username" = $1;`, [new_user.username])
        
        let existingUser = (n.rows[0])

        if(existingUser){
            throw Error ("Username Already Taken")
        }
       
        let result = await client.query(`insert into ers."users" ("username", "password", "first_name", "last_name", "address", "email", "role_id", "role", "image")
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *;`, [new_user.username, new_user.password, new_user.firstName, new_user.lastName, new_user.address, new_user.email, '2', "User", new_user.image])
        console.log("dto user" + userDTOtoUser(result.rows[0]))
        return (userDTOtoUser(result.rows[0]))
             
    }catch (err){
        console.log(err)
        if (err.message === 'ID is not a number'){
            throw new TypeError
        }

        if (err.message === 'Username Already Taken'){
            throw new UsernameTakenError
        }
        
        throw new Error('Unimplimented id error')
        
    }finally{
        client && client.release()

    }


}

