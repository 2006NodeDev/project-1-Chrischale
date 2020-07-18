import React, { FunctionComponent, useState, SyntheticEvent, useEffect } from 'react'
import { TextField, makeStyles, createStyles, Theme, Button, FormGroup, FormControlLabel, Checkbox, CheckboxProps, withStyles } from '@material-ui/core'
import { Route, Router, Redirect, RouteComponentProps } from 'react-router';
import { ProfileComponent } from '../ProfileComponent/ProfileComponent';
import {backendLogin} from '../../Remote/backend-login'
import { User } from '../../Models/Users';
import { useSelector, useDispatch } from 'react-redux';
import { ILoginState, IState } from '../../Reducers';
import { loginActionMapper, loginErrorReset } from '../../ActionMappers/login-action-mapper';
import { green } from '@material-ui/core/colors';
import thunk from 'redux-thunk';
import { toast } from 'react-toastify'




const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);


export const LoginComponent: FunctionComponent <any> = (props) => {

    const login_state = useSelector((state:IState) => {
      return state.loginState.currUser
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };
    const classes = useStyles();
    

    const [username, changeUsername] = useState('')
    const [password, changePassword] = useState('')

    const errorMessage = useSelector((state:IState) => {
      return state.loginState.errorMessage
    })

    const [state, setState] = React.useState({
      checkedA: true,
    });
    
 
    const updateUsername = (event:any) => {
        event.preventDefault()
        changeUsername(event.currentTarget.value)
    }
    const updatePassword = (event : any) => {
        event.preventDefault()
        changePassword(event.currentTarget.value)
    }


    const dispatch = useDispatch()

    

    const loginSubmit = async (e:SyntheticEvent) => {
        e.preventDefault()
        // let res = await backendLogin(username, password)
        // console.log(res)
        
        // props.changeCurrUser(res)
        // changePassword('')

        

        let thunk = loginActionMapper(username, password)
        dispatch(thunk)
        props.history.push(`/profile/${login_state.userId}`)
         
          
    }

    useEffect(()=>{
      if(errorMessage){
          toast.error(errorMessage)
          dispatch(loginErrorReset())
      }
  })

  

    return (
        <div>
            <form autoComplete="off" onSubmit={loginSubmit}>
                <TextField id="username-basic" label="Username" value ={username} onChange = {updateUsername}/>
                <br/>
                <TextField id="password-basic" label="Password" type = 'password' value = {password} onChange = {updatePassword}/>
                <br/>
                <br/>
                <Button type = 'submit' variant = 'contained' color = 'primary' onClick = {loginSubmit}> Submit </Button>
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedA}
                      onChange={handleChange}
                      name="checkedA"
                      color="primary"
                    />
                  }
                  label="Keep Me Logged In"
                />

            </form>
            
        </div>
    )

}