import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Signin from "./components/signin/Signin";
import Signup from "./components/signup/Signup";
import About from "./components/about/About";
import Dash from "./components/dash/Dash";
import Authenticate from './components/auth/Authenticate';
import { PrivateRoute } from './privateRoute/privateRoute';
import { PublicRoute } from './publicRoute/publicRoute';

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isLoggedIn: false,
    }
  }

  render () {
    return (
      <div className="App">
              <BrowserRouter>
                <Switch>
  
                  <PrivateRoute exact path="/" component={Dash} conditionExpression = {localStorage.getItem('token')}/>

                  <PublicRoute exact path="/signin" component={Authenticate} restricted={true} componentProps={
                    {concern: 'signin'}
                  }/> 


                  <PublicRoute exact path="/signup" component={Authenticate} restricted={true} componentProps={
                    {concern: 'signup'}
                  }/> 

                  <Redirect to="/"/>
                </Switch>
              </BrowserRouter>
      </div>
    );
  }
}

export default App;
/*
 Public Routes: Visited from anywhere: Signup, signin, About
 Private Route: Dashboard else send to signin

 Components: 
  1. Signin
  2. Signup
  3. About
  4. Dashboard

                    <Route path="/signin" exact render = {props => <Signin callback = {this.loginResponse} profiles={this.state.profiles}/>}/>
  
                  <Route path="/signup" exact render = {props => <Signup profiles={this.state.profiles}/>}/>
                  <Route exact path="/signin" render = {props => <Authenticate 
                    concern = 'signin'
                  />}/>
*/