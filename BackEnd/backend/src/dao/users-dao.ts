import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";
import { userDTOtoUser } from "../utils/UserDTO-to-User";
import { UserNotFoundError } from "../errors/UserNotFoundErr";
import { AuthError } from "../errors/AuthError";
import {UsernameTakenError} from "../errors/UsernameTakenError"
import { User } from "../models/Users";
import { BadCredError } from "../errors/Bad CredentialsErr";



//login

export async function getUserByUsernamePassword(username: string, password:string) : Promise <User>{
    let client: PoolClient

    try{
        client = await connectionPool.connect() //gives you a promise, so you take it out of the stack to prevent blocking
        let result:QueryResult = await client.query(`select * from ers."users" u left join ers."roles" r2 on u."role_id" = r2."role_id" where u."username" = $1 and u."password" = $2;`, [username, password])
        if (result.rowCount === 0){
            throw new Error ('User Not Found')
        } else {
            return userDTOtoUser(result.rows[0])

        }
    }catch (err){
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
        
        let result = await client.query(`update ers."users" u set "first_name" = $1, "last_name" = $2, "email" = $3, "role_id" = $4, "role" = $5, "address" = $6 where u."user_id" =  $7 returning *;`, 
                                                        [newReimb.firstName, newReimb.lastName, newReimb.email, newReimb.roleDetails.roleID, newReimb.roleDetails.role, newReimb.address, upd_Reimb.userId])
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
export async function newUser (new_user: User) : Promise <User> {
    let client:PoolClient
      
    try{
        client = await connectionPool.connect() 
        let n = await client.query(`select * from ers."users" u where u."username" = $1;`, [new_user.username])
        
        let existingUser = (n.rows[0])
        console.log("existing" + existingUser)

        if(existingUser){
            throw Error ("Username Already Taken")
        }
       
        let result = await client.query(`insert into ers."users" ("username", "password", "first_name", "last_name", "address", "email", "role_id", "role")
        values ($1, $2, $3, $4, $5, $6, $7, $8) returning *;`, [new_user.username, new_user.password, new_user.firstName, new_user.lastName, new_user.address, new_user.email, '2', 'User'])
        console.log(result.rows[0])
        return result.rows[0]
             
    }catch (err){
        if (err.message === 'ID is not a number'){
            throw new TypeError
        }

        if (err.message === 'Username Already Taken'){
            throw new UsernameTakenError
        }
        
        console.log(err)
        throw new Error('Unimplimented id error')
        
    }finally{
        client && client.release()

    }


}

