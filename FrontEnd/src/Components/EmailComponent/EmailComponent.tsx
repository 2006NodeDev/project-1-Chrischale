import React, { FunctionComponent, SyntheticEvent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

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

const emailSubmit = (e:SyntheticEvent) => {
    e.preventDefault()
    //FINISH THIS TOMORROW

}


export const EmailComponent: FunctionComponent <any> = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState('Controlled');
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };
  
    return (
      <form className={classes.root} noValidate autoComplete="off">
        <div>
         
        <TextField
            id="filled-multiline-static"
            label="New Email"
            multiline
            rows={15}
            
            variant="filled"
          />
          <br />
          <Button variant="outlined" color="primary"> Send </Button>
        </div>

      </form>
    );
  }