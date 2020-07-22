import React, { FunctionComponent, useState, SyntheticEvent, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../Reducers';
import { toast } from 'react-toastify';
import { updateUserActionMapper, updateUserErrorReset } from '../../ActionMappers/update-user-action-mapper';
import { TitleComponent } from '../TitleComponent/TitleComponent'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link, useParams } from 'react-router-dom';


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


export const UpdateUserComponent:FunctionComponent<any> = ((props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    let {userId} = useParams()

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  

    

    const [username, changeUsername] = useState('')
    const [password, changePassword] = useState('')
    const [firstname, changeFirstName] = useState('')
    const [lastname, changeLastName] = useState('')
    const [address, changeAddress] = useState('')
    const [email, changeEmail] = useState('')
    const [role, changeRole] = useState('')
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
  const updateRole = (event:any) => {
    event.preventDefault()
    changeRole(event.currentTarget.value)
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

    
    const updatedUserSubmit = async (e:SyntheticEvent) => {
      e.preventDefault()
        // e.preventDefault()
        // let res = await backendNewUser(username, password, firstname, lastname, address, email)
        // console.log("new user submit response in compontn" + res)
        
        // props.changeNewUser(res)
        // props.history.push(`/profile/${res.userId}`) 
        
        let thunk = updateUserActionMapper(userId, username, password, firstname, lastname, address, email, role, image)
        dispatch(thunk) 
        
    }
    const updatedUser = useSelector((state:IState) => {
      return state.loginState.currUser
    })

    const errorMessage = useSelector((state:IState) => {
      return state.loginState.errorMessage
    })

    useEffect(() => {
      if(errorMessage){
        toast.error(errorMessage)
        dispatch(updateUserErrorReset())
      }
    })

    // useEffect(()=>{
    //   if(updatedUser){
    //     props.history.push(`/profile/${updatedUser.userId}`)

    //   }
    // })

    

  return (
      
    <form className={classes.root} autoComplete="off" onSubmit={updatedUserSubmit}>
      <div>
      <TitleComponent title='Update Profile' size='medium' />

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
        <br />
        <TextField
          id="standard-password-input"
          label="Role"
          autoComplete="off"
          value ={role} 
          onChange = {updateRole}
          
        />
        <br />
        <label htmlFor='file'>
          Profile Picture
        </label>
        <hr />
        <input type='file' name='file' accept='image/*' onChange={updateImage}></input>
        <img src={image} width="150" height="200"/>
        <hr />

        <Button type = 'submit' variant = 'contained' color = 'secondary' onClick={handleClickOpen}> Submit </Button>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are You Sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please review all changes before submitting.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Link to={`/profile/${userId}`}>
          <Button onClick={updatedUserSubmit} color="secondary">
            Update
          </Button>
          </Link>
          <Button onClick={handleClose} color="secondary" autoFocus>
            Back
          </Button>
        </DialogActions>
      </Dialog>

      </div>
    </form>
  )


})