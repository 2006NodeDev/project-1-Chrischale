import React, { useState } from 'react';
import './App.css';
import { NavBarComponent } from './Components/NavBarComponent/NavBarComponent';
import { Button } from '@material-ui/core/'
import { LoginComponent } from './Components/LoginComponent/LoginComponent';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { TitleComponent } from './Components/TitleComponent/TitleComponent';
import { User } from './Models/Users';
import { ProfileComponent } from './Components/ProfileComponent/ProfileComponent';
import { UserDisplayComponent } from './Components/SearchResultsComponent/SearchResultsComponent';
import { AllUsersComponent } from './Components/AllUsersComponent/AllUsersComponent';
import { Provider } from 'react-redux';
import { store } from './store';




function App() {
  const [currUser, changeCurrUser] = useState<null|User> (null)

  return (
    <div className="App">
      <Provider store={store}>
      <Router>
      <NavBarComponent user = {currUser}/>
        <Route path = '/' render = {(props) => (
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
            <br/>
            <br />
            <Button variant="contained" color="primary" onClick = {()=>{props.history.push('/login');}}>Login</Button>
          
          </header>
        )}>
        </Route>
        <Route path = '/login' render = {(props)=>(<LoginComponent changeCurrUser={changeCurrUser} {...props}/>)}></Route>
        <Route path = '/profile/:userId' component={ProfileComponent}></Route>
        <Route path ='/users' component={AllUsersComponent}/>
        

      </Router>
      </Provider>
      </div>
  );
}

export default App;
