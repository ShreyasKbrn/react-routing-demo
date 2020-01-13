import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PublicRoute = ({component: Component, restricted, componentProps, ...rest}) => {
    debugger
    return (
        localStorage.getItem('token') && restricted ? 
        <Redirect to="/"/>:
        <Route {...rest}  to="/signin" render = {props => (
            <Component {...componentProps}/>
        )}/>
    );
}
