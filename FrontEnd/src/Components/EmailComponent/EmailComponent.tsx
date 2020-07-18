import React, { FunctionComponent, SyntheticEvent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { User } from '../../Models/Users';
import { useSelector } from 'react-redux';
import { IState } from '../../Reducers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '75ch',
      },
    },
  }),
);

//for the send button
const emailSubmit = (e:SyntheticEvent) => {
    e.preventDefault()
    //FINISH THIS?

}





export const EmailComponent: FunctionComponent <any> = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState('Controlled');

    const sender = useSelector((state:IState) => {
      return state.loginState.currUser
    })
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };
  
    return (
      <form className={classes.root} noValidate autoComplete="off">
        <div>
        <TextField
          id="standard-read-only-input"
          label="From"
          defaultValue={sender?.email}
          InputProps={{
            readOnly: true,
          }}
        />
        <br/>
        <TextField
            id="filled-multiline-static"
            label="To:"
            multiline
            rows={15}
            
            variant="outlined"
          />
          <br />
          <Button variant="outlined" color="primary"> Send </Button>
        </div>

      </form>
    );
  }