import React from 'react';
import {Redirect, Route} from 'react-router-dom';

export const PrivateRoute = ({component: Component, ...rest}) => {
    //debugger
    return <Route {...rest} render = {props => (
        localStorage.getItem('token')? 
        <Component {...props}/> : <Redirect to='/signin'/> 
    )}/>
}