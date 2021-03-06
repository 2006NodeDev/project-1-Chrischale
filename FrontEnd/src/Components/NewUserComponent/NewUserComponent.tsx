import React, { FunctionComponent, useState, SyntheticEvent, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../Reducers';
import { newuserActionMapper , newuserErrorReset } from '../../ActionMappers/newuser-action-mapper';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isUndefined } from 'util';
import { User } from '../../Models/Users';


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

    

    const [username, changeUsername] = useState('')
    const [password, changePassword] = useState('')
    const [firstname, changeFirstName] = useState('')
    const [lastname, changeLastName] = useState('')
    const [address, changeAddress] = useState('')
    const [email, changeEmail] = useState('')
    const [image, changeImage] = useState(null)

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

  const updateImage = (event:any) => {
    let file:File = event.currentTarget.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      changeImage(reader.result)
    }
  }

    const dispatch = useDispatch()
    
    const newUserSubmit = async (e:SyntheticEvent) => {
      e.preventDefault()
      
        // e.preventDefault()
        // let res = await backendNewUser(username, password, firstname, lastname, address, email)
        // console.log("new user submit response in compontn" + res)
        
        // props.changeNewUser(res)
        // props.history.push(`/profile/${res.userId}`) 
        
        let thunk = newuserActionMapper(username, password, firstname, lastname, address, email, image)
        dispatch(thunk) 
    }

    const newUser = useSelector((state:IState) => {
      return state.loginState.currUser
    })

    const errorMessage = useSelector((state:IState) => {
      return state.loginState.errorMessage
    })

    useEffect(() => {
      if(errorMessage){
        toast.error(errorMessage)
        dispatch(newuserErrorReset())
      }
    })

    useEffect(()=>{
      if(newUser){
        console.log("new user was created:" + newUser.username + newUser.userId)
  
        props.history.push(`/profile/${newUser.userId}`)
  
      }
    })

    

  return (
    <form className={classes.root} autoComplete="off" onSubmit={newUserSubmit}>
      <div>
      <TextField
          id="standard-password-input"
          label="Username"
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
        <br />
        <label htmlFor='file'>
          Profile Picture
        </label>
        <hr />
        <input type='file' name='file' accept='image/*' onChange={updateImage}></input>
        <img src={image} width="150" height="200"/>
        <hr />

        <Button type = 'submit' variant = 'contained' color = 'primary' onClick={newUserSubmit}> Submit </Button>

      </div>
    </form>
  )


})