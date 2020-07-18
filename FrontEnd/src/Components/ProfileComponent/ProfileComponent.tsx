//display a user's profile in detail


import React, { FunctionComponent, useState, useEffect } from 'react'
import { SearchUsersComponent } from '../SearchUsersComponent/SearchUsersComponent'
import { User } from '../../Models/Users'
import { useParams } from 'react-router'
import { getUserProfile } from '../../Remote/backend-getUserProfile'
import { useSelector, useDispatch } from 'react-redux'
import { IState } from '../../Reducers'
import { Grid, Paper, makeStyles, createStyles, Theme } from '@material-ui/core'
import { DisplayUsersComponent } from '../DisplayUsersComponent/DisplayUsersComponent'


export const ProfileComponent:FunctionComponent<any> = (props) => {
    let[userProfile, changeUserProfile] = useState <null | User>(null)
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



    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
            flexGrow: 1,
            },
            paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            },
        }),
    );

    const classes = useStyles();
    console.log(userProfile)
    return(
        
        (userProfile)?
        <div>
            Welcome {userProfile.firstName} {userProfile.lastName}
            <DisplayUsersComponent user={userProfile}/>

        </div>
        
        :
        <div>
            <h3> User Not Found</h3>
        </div>
    )

}