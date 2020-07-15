import Reat, { FunctionComponent, useEffect, useState } from 'react'
import { getAllUsers } from '../../Remote/backend-getAllUsers'
import React from 'react'
import { UserDisplayComponent } from '../SearchResultsComponent/SearchResultsComponent'
import { User } from '../../Models/Users'

export const AllUsersComponent:FunctionComponent<any> = (props) => {
    //get all the user infomation 
    let [allUsers, changeAllUsers] = useState<User[]>([])

    useEffect(() => {
        const getUsers = async ()=>{
            let response = await getAllUsers()
            changeAllUsers(response)
        }
        if(allUsers.length === 0){
            getUsers()   
        }
    })

    let userDisplays = allUsers.map((user) => {
        return <UserDisplayComponent key={'user-key-' + user.userId} user = {user} />

    })

    return(
        //make a grid here instead for neatness sake
        <div>
            {userDisplays}
        </div>
    )
    
}