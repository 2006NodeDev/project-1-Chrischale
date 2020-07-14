//how to display users when searched for


import React, {FunctionComponent} from 'react'
import { User } from '../../Models/Users';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { createStyles, Theme, makeStyles } from '@material-ui/core';



interface IUserDisplayProps{
    user:User|null
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(20),
        height: theme.spacing(20),
      },
    },
    paper:{
        backgroundColor: 'white'
    }
  }),
);

export const UserDisplayComponent:FunctionComponent<IUserDisplayProps> = (props) =>{
    let classes = useStyles()
//change into a card later if you have time ... 
    return(
        <div className = {classes.root}>
            
            <Paper className = {classes.paper} elevation={4}>
                <Typography variant='body1'>
                    Username: {props.user?.username}
                </Typography>
                <Typography variant='body1'>
                    Email: {props.user?.email}
                </Typography>
                <Typography variant='body1'>
                    Role: {props.user?.roleDetails.role}
                </Typography>


            </Paper>

        </div>
    )
}