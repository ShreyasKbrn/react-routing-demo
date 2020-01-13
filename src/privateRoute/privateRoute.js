import React from 'react';
import {Redirect, Route} from 'react-router-dom';

export const PrivateRoute = ({component: Component, conditionExpression, ...rest}) => {
    //debugger
    return <Route {...rest} render = {props => (
        conditionExpression? 
        <Component {...props}/> : <Redirect to='/signin'/> 
    )}/>
}