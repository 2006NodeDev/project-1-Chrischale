//tells you who you're logged in as by displaying at the top

import React, { FunctionComponent, useState } from 'react'
import { TitleComponent } from '../TitleComponent/TitleComponent'
import { User } from '../../Models/Users';
import { Redirect, RouteComponentProps } from 'react-router';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { ProfileComponent } from '../ProfileComponent/ProfileComponent';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  }),
);



interface ICurrLoginUser extends RouteComponentProps{
    user: User | null
}

export const CurrLoginComponent: FunctionComponent <ICurrLoginUser> = (props) => {
    const [state, changeState] = useState(0);
    const classes = useStyles();
    const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();


    return (
        (props.user)?
        <div>
            <TitleComponent size = 'small' title = {`You are logged in as: ${props.user.username}!`}/>
            
            <Typography className={classes.root}>
                <Link href="#" onClick={ProfileComponent}>
                    View Profile
                </Link>
            </Typography>


        </div>
        :
        <Redirect to='/home' />
    )
    
}