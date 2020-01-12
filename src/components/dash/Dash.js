import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

export default class Dash extends Component {

    constructor(props) {
        super(props);
        this.state = {token: localStorage.getItem('token')};
    }

    logout = () => {
        localStorage.removeItem('token');
        this.setState({
            token: undefined
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
