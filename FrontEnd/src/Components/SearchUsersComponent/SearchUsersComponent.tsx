import React, { FunctionComponent, useEffect, useState } from 'react'
import { getAllUsers } from '../../Remote/backend-getAllUsers'
import { DisplayUsersComponent } from '../DisplayUsersComponent/DisplayUsersComponent'
import { User } from '../../Models/Users'


export const SearchUsersComponent:FunctionComponent<any> = (props) => {

    let [allUsers, changeAllUsers] = useState<User[]>([])

    //query the server
    useEffect(()=>{

        const getUsers = async ()=>{
            let response = await getAllUsers()
            changeAllUsers(response)
        }

        if(allUsers.length === 0){
            getUsers()
        }
    })

    let userDisplays = allUsers.map((user)=>{
        return <DisplayUsersComponent key={'user-key-' + user.userId} user={user}/>
    })

    return(
        //we should turn this into a grid to make it look nicer
        <div>
            {userDisplays}
        </div>
        
        
    )
}