import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { api } from '../../services/api-service';

export default class Dash extends Component {

    constructor(props) {
        super(props);
        this.state = {token: localStorage.getItem('token')};
    }

    logout = () => {
        let logoutPromise = api.logout(this.state.token);
        logoutPromise.then((response) => {
            localStorage.removeItem('token');
            this.setState({
                token: undefined
            });
        }, err => {
            
        });
    }
    render() {
        if (this.state.token) {
            return (
                <React.Fragment>
                    <h3>Dashboard</h3>
                    <button onClick = {this.logout}>Logout</button>
                </React.Fragment>
            )
        } else {
            return <Redirect to='/signin'/>
        }
    }
}
