import { getAllUsers, findUserbyID, newUser } from "../dao/SQL/users-dao";
import { User } from "../models/Users";
import { saveProfilePicture } from "../dao/CloudStorage/user-images";
import { bucketURL } from "../dao/CloudStorage";


//service function to expand cloud funcs when we get to it
export async function getAllUsersService():Promise<User[]>{
    return await getAllUsers()
}

export async function getUserByIDService(id:number):Promise<User>{
    return await findUserbyID(id)
}

export async function createNewUserService(newuser:User):Promise<User>{
    try{
        let base64img=newuser.image
        let [dataType, imagebase64Data] = base64img.split(';base64,')
        let contentType = dataType.split('/').pop()
        //return the last element after content file path has been split at all the /
    

    if(newuser.image){
        newuser.image = `${bucketURL}/users/${newuser.username}/profile.${contentType}`

    }
    let savenewUser = await newUser(newuser)
    await saveProfilePicture(contentType, imagebase64Data, `/users/${newuser.username}/profile.${contentType}`)
    return savenewUser


    }catch(err){
        throw err

    }

}