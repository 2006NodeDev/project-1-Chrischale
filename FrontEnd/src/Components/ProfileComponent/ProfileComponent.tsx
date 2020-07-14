//display a user's profile in detail


import React, { FunctionComponent, useState, useEffect } from 'react'
import { UserDisplayComponent } from '../UserDisplayComponent/UserDisplayComponent'
import { User } from '../../Models/Users'
import { useParams } from 'react-router'
import { getUserProfile } from '../../Remote/backend-getUserProfile'
import { useSelector, useDispatch } from 'react-redux'
import { IState } from '../../Reducers'
import { updateProfileUser }  from '../../ActionMappers/profile-action-mapper'



export const ProfileComponent : FunctionComponent<any> = (props) => {
    let[userProfile, changeUserProfile] = useState<null | User>(null)
    let {userId} = useParams()
    //to get userID from the path

    
    useEffect(() => {
        let getUser = async()=>{
            let userInfo = await getUserProfile(userId)
            changeUserProfile(userInfo)

        }
        //if no profile received yet, go get it
        if(!userProfile || userProfile.userId !== +userId){
            getUser()
        }

    })


    const profile = useSelector((state:IState) => {
        return state.profileState.user
    })

    const dispatch = useDispatch()

    const changeProfile = () => {
        let action = updateProfileUser(userProfile)
        dispatch(action)
    }

    


    return(
        (userProfile)?
        <div>
            
            <UserDisplayComponent user={userProfile} />
        

        </div>
        :
        <div>
            <h3> User Not Found</h3>
        </div>
    )

}