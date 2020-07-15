//display a user's profile in detail


import React, { FunctionComponent, useState, useEffect } from 'react'
import { UserDisplayComponent } from '../SearchResultsComponent/SearchResultsComponent'
import { User } from '../../Models/Users'
import { useParams } from 'react-router'
import { getUserProfile } from '../../Remote/backend-getUserProfile'
import { useSelector, useDispatch } from 'react-redux'
import { IState } from '../../Reducers'
import { updateProfileUser }  from '../../ActionMappers/profile-action-mapper'
import { Grid, Paper, makeStyles, createStyles, Theme } from '@material-ui/core'


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


    const profile = useSelector((state:IState) => {
        return state.profileState.user
    })

    const dispatch = useDispatch()

    const changeProfile = () => {
        let action = updateProfileUser(userProfile)
        dispatch(action)
    }

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
            <div className={classes.root}>
            <Grid container spacing={2}>
            <Grid item xs>
                <Paper className={classes.paper}>Name: {userProfile.firstName} {userProfile.lastName}</Paper>
                <head>
                    This is text stuff
                </head>
            </Grid>
            <Grid item xs>
                <Paper className={classes.paper}>Email: {userProfile.email}</Paper>
            </Grid>
            <Grid item xs>
                <Paper className={classes.paper}>Address: {userProfile.address}</Paper>
            </Grid>
            <Grid item xs>
                <Paper className={classes.paper}>Role: {userProfile.roleDetails.role}</Paper>
            </Grid>
            
            <Grid item xs>
                <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
            <Grid item xs>
                <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
            </Grid>
            
        </div>
        :
        <div>
            <h3> User Not Found</h3>
        </div>
    )

}