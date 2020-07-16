import React, { FunctionComponent, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { User } from '../../Models/Users'
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from '@material-ui/core'
import { EmailComponent } from '../EmailComponent/EmailComponent';
import { Redirect } from 'react-router';


interface IDisplayUserProps{
    user: User | null
}
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export const DisplayUsersComponent:FunctionComponent<IDisplayUserProps> = (props) => {
    //get all the user infomation 
    
    let classes = useStyles()
    //change into a card later if you have time ... 
    return(
        <div className = {classes.root}
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
        <Card>
        <CardActionArea>
            <CardMedia
                className={classes.media}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                Name: {props.user?.firstName} {props.user?.lastName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                Role: {props.user?.roleDetails.role}
            </Typography>
                    
            </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Contact
                </Button>
                <Button size="small" color="primary">
                    View
                </Button>
        </CardActions>
        </Card> 
        <br/>          
    
        </div>
    )
    
}