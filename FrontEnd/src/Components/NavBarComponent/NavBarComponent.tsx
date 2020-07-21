import React, { FunctionComponent } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link, Route } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { TitleComponent } from '../TitleComponent/TitleComponent';
import { IState } from '../../Reducers';
import { useSelector } from 'react-redux';




const useStyles = makeStyles((theme:Theme) => ({
    root: {
      flexGrow: 1,
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
  
  

export const NavBarComponent: FunctionComponent <any> = (props) =>{
    
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const currUser = useSelector((state:IState) => {
      return state.loginState.currUser
    })

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    //defult menu always has login
    let menuItems = []
    if(currUser){
        menuItems.push(<MenuItem onClick={handleClose}><Link to='/'>Home</Link></MenuItem>,
        <MenuItem onClick={handleClose}> <Link to={`/profile/${currUser.userId}`}>My Profile</Link></MenuItem>,
        <MenuItem onClick={handleClose}><Link to='/contact'>Contact</Link></MenuItem>)
    }


    if(currUser && currUser.roleDetails.role === ('Finance Manager' || 'Admin')){
      menuItems.push(<MenuItem onClick={handleClose}> <Link to='/users'>All Users</Link></MenuItem>)
      
    }

    return (

        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
            <IconButton
                onClick={handleClick}
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                aria-controls="simple-menu" 
                aria-haspopup="true" 
                
            >
              <MenuIcon />
            </IconButton>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                {menuItems}
            </Menu>

            <Typography className={classes.title} variant="h6" noWrap>
              <TitleComponent size='medium' title={(props.user)? `Welcome ${props.user.firstName}` : 'FIND A FRIEND'} />
            </Typography>
            <Route exact path = '/' render={(props) => (
              <div>
              <Button variant="contained" color="secondary" onClick = {()=>{props.history.push('/login')}}>Login</Button>

              <Button variant="contained" color="secondary" onClick = {()=>{props.history.push('/users/newuser')}}>Sign Up</Button>
              </div>  
            )
            }></Route>

            </Toolbar>
        </AppBar>
        </div>
        
    );

}