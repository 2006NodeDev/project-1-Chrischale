import React, { useState } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { NavBarComponent } from './Components/NavBarComponent/NavBarComponent';
import { Button } from '@material-ui/core/'
import { LoginComponent } from './Components/LoginComponent/LoginComponent';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { TitleComponent } from './Components/TitleComponent/TitleComponent';
import { User } from './Models/Users';
import { ProfileComponent } from './Components/ProfileComponent/ProfileComponent';
import {SearchUsersComponent} from './Components/SearchUsersComponent/SearchUsersComponent'
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContainer } from 'react-toastify';
import { DisplayUsersComponent } from './Components/DisplayUsersComponent/DisplayUsersComponent';
import { EmailComponent } from './Components/EmailComponent/EmailComponent';
import { NewUserComponent } from './Components/NewUserComponent/NewUserComponent';




function App() {
  
  return (
    <div className="App">
      <Provider store={store}>
      <Router>
      <NavBarComponent />
        <Route exact path = '/' render = {(props) => (
          <header className="App-header">
            
            <TitleComponent title='Welcome to People Link! ' size = 'large' />
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
            </a>
            Please Login to Continue
            
          </header>
        )}></Route>
        <Route path='/login' render={(props)=>(<LoginComponent {...props}/>)}></Route>
        <Route exact path='/profile/:userId' component={ProfileComponent}></Route>
        <Route exact path='/users' component={SearchUsersComponent}/>
        <Route path = '/contact' render={() => (<EmailComponent />)} />
        <Route path = '/users/newuser' render={(props)=>(<NewUserComponent {...props}/>)} />
      </Router>
      <ToastContainer position='bottom-right'/>
      </Provider>
    </div>
  );
}

export default App;
