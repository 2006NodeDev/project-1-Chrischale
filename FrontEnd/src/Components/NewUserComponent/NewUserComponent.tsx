import React, { FunctionComponent, useState, SyntheticEvent, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../Reducers';
import { newuserActionMapper , newuserErrorReset } from '../../ActionMappers/newuser-action-mapper';
import { toast } from 'react-toastify';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);


export const NewUserComponent:FunctionComponent<any> = ((props) => {
    const classes = useStyles();

    const errorMessage = useSelector((state:IState) => {
      return state.loginState.errorMessage
    })

    const [username, changeUsername] = useState('')
    const [password, changePassword] = useState('')
    const [firstname, changeFirstName] = useState('')
    const [lastname, changeLastName] = useState('')
    const [address, changeAddress] = useState('')
    const [email, changeEmail] = useState('')

    const newUser = useSelector((state:IState) => {
      return state.loginState.currUser
    })

    const dispatch = useDispatch()
    
    const newUserSubmit = async (e:SyntheticEvent) => {
      e.preventDefault()
        // e.preventDefault()
        // let res = await backendNewUser(username, password, firstname, lastname, address, email)
        // console.log("new user submit response in compontn" + res)
        
        // props.changeNewUser(res)
        // props.history.push(`/profile/${res.userId}`) 
        
        let thunk = newuserActionMapper(username, password)
        dispatch(thunk) 
    }

    useEffect(() => {
      if(errorMessage){
        toast.error(errorMessage)
        dispatch(newuserErrorReset())
      }
    })

    const updateUsername = (event:any) => {
      event.preventDefault()
      changeUsername(event.currentTarget.value)
  }
  const updatePassword = (event : any) => {
      event.preventDefault()
      changePassword(event.currentTarget.value)
  }
  const updateFirstName = (event:any) => {
      event.preventDefault()
      changeFirstName(event.currentTarget.value)
  }
  const updateLastName = (event:any) => {
      event.preventDefault()
      changeLastName(event.currentTarget.value)
  }
  const updateEmail = (event:any) => {
      event.preventDefault()
      changeEmail(event.currentTarget.value)
  }
  const updateAddress = (event:any) => {
      event.preventDefault()
      changeAddress(event.currentTarget.value)
  }

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={newUserSubmit}>
      <div>
      <TextField
          id="standard-password-input"
          label="Username"
          type="username"
          autoComplete="off"
          value ={username} 
          onChange = {updateUsername}
        />
        <br />
        <TextField
          id="standard-password-input"
          label="Password"
          autoComplete="off"
          type="password"
          value ={password} 
          onChange = {updatePassword}
          
        />
        <br />
        <TextField
          id="standard-password-input"
          label="First Name"
          autoComplete="off"
          value ={firstname} 
          onChange = {updateFirstName}
        />
        <br />
        <TextField
          id="standard-password-input"
          label="Last Name"
          autoComplete="off"
          value ={lastname} 
          onChange = {updateLastName}

        />
        <br />
        <TextField
          id="standard-multiline-static"
          label="Address"
          autoComplete="off"
          multiline
          rows={4}
          value ={address} 
          onChange = {updateAddress}

        />
        <br/>
        <TextField
          id="standard-password-input"
          label="Email"
          type="email"
          autoComplete="off"
          value ={email} 
          onChange = {updateEmail}

        />
        <hr />

        <Button type = 'submit' variant = 'contained' color = 'primary' onClick={newUserSubmit}> Submit </Button>

      </div>
    </form>
  )


})