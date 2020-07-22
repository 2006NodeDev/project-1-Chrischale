//display a user's profile in detail

import 'react-toastify/dist/ReactToastify.css';

import React, { FunctionComponent, useState, useEffect, SyntheticEvent } from 'react'
import { SearchUsersComponent } from '../SearchUsersComponent/SearchUsersComponent'
import { User } from '../../Models/Users'
import { useParams, Redirect } from 'react-router'
import { getUserProfile } from '../../Remote/backend-getUserProfile'
import { useSelector, useDispatch } from 'react-redux'
import { IState } from '../../Reducers'
import { Grid, Paper, makeStyles, createStyles, Theme, CardActionArea, Card, CardContent, Typography, Hidden, CardMedia, Button } from '@material-ui/core'
import { DisplayUsersComponent } from '../DisplayUsersComponent/DisplayUsersComponent'
import { EmailComponent } from '../EmailComponent/EmailComponent'
import { profileActionMapper, profileErrorReset } from '../../ActionMappers/profile-action-mapper';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';





const useStyles = makeStyles({
    card: {
      display: 'flex',
    },
    cardDetails: {
      flex: 1,
    },
    cardMedia: {
      width: 160,
    },
  });


export const ProfileComponent:FunctionComponent<any> = (props) => {
    let[userProfile, changeUserProfile] = useState(null)
    let {userId} = useParams()
    //to get userID from the path
    console.log("profile comp user id:" + userId)
    console.log("userProfile" + userProfile)

    const newUser = useSelector((state:IState) => {
        return state.loginState.currUser
    })
  
    const errorMessage = useSelector((state:IState) => {
        return state.loginState.errorMessage
    })



    const dispatch = useDispatch()

    // let thunk = profileActionMapper(userProfile.userID)
    // dispatch(thunk)
         

    useEffect(()=>{

      if(errorMessage){
          toast.error(errorMessage)
          dispatch(profileErrorReset())
      }
    })
    
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

    
    const classes = useStyles();
    
 
    return(
        
        (userProfile)?
        <div>
            <Link to='/users/updateuser'>
            Update Profile
            </Link>

           <Grid item xs={12} md={6}>
            <CardActionArea component="a" href="#">
          
            <Card className={classes.card}>
            <div className={classes.cardDetails}>
                <CardContent>
            
                <Typography component="h2" variant="h5">
                    NAME: {userProfile.firstName} {userProfile.lastName}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    ROLE: {userProfile.roleDetails.role}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                    ADDRESS: {userProfile.address}
                </Typography>
                <Link to = '/contact'>
                    EMAIL: {userProfile.email}
                </Link>
                </CardContent>
            </div>
            
            </Card>
            </CardActionArea>
            </Grid>
            

        </div>
        
        :
        <div>
            <h3> User Not Found</h3>
        </div>
    )

}