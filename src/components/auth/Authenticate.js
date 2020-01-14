import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Route } from 'react-router-dom';
import { api } from '../../services/api-service';

export default class Authenticate extends Component {

    constructor (props) {
        super(props);
        this.state = {
            signin: {
                email: '',
                id: '',    
                isSubmitted: false,        
            },
            signup: {
                email: '',
                first_name: '',
                last_name: ''                
            },
        }
    }

    formFunctions = {
        onChange : (e) => {
            let targetName = e.target.name;
            let concern = this.props.concern;

            let concernState = {
                ...this.state[concern],
                [targetName]: e.target.value
            }
            this.setState({
                ...this.state,
                [concern]: {...concernState}
            });
        },
        signInFunctions : {
            onSubmit: () => {
                let responsePromise = api.authenticate({email: this.state.signin.email, id: this.state.signin.id});
                responsePromise.then((response) => {
                    let {status, token} =response.data;
                    if (status === -1) {

                    } else {
                        localStorage.setItem('token', token);
                        let signin = {
                            ...this.state.signin,
                            isSubmitted: true
                        };
                        this.setState({
                            ['signin']: {...signin}                            
                        });
                    };
                }, err => {
                    console.log(err);
                });
                // let profiles = [...this.state.profiles];
                // let isSubmitted = false;
                
                // for (let i=0; i<profiles.length; i++) {
                //     if (profiles[i].email === this.state.signin.email && profiles[i].id ===Number.parseInt(this.state.signin.id)) {
                //         isSubmitted = true;
                //         localStorage.setItem('token', new Date()*1+'');
                //     }
                // }

                // let signin = {
                //     ...this.state.signin,
                //     isSubmitted: isSubmitted
                // };
                // this.setState({
                //     ...this.state,
                //     ['signin']: {...signin}                            
                // });                
            }
        },
        signUpFunctions: {
            onSubmit: () => {
                let signupPromise = api.addUser({email: this.state.signup.email, first_name: this.state.signup.first_name, last_name: this.state.signup.first_name});
                signupPromise.then((response) => {
                    console.log(response.body);
                }, err=> {});
            }
        }
    }

    render () {
        let componentUI = null;

        if (this.props.concern === 'signin') {
            if(this.state.signin.isSubmitted === true) {
                componentUI = <Redirect to='/'/>
            } else {
                componentUI = (
                    <React.Fragment>
                        <div>Sign In</div>
                        <h2>michael.lawson@reqres.in 7</h2>
                        <div>{JSON.stringify(this.props.profiles)}</div>
                        <input placeholder="email" name="email" onChange = {this.formFunctions.onChange}/>
                        <input placeholder="id" name="id" onChange = {this.formFunctions.onChange}/>
                        <input type="submit" onClick={this.formFunctions.signInFunctions.onSubmit}/>
                    </React.Fragment>
                );
            }
        } else if (this.props.concern === 'signup') {
            componentUI = <React.Fragment>
                <div>Signup</div>
                <input placeholder="email" name="email" onChange = {this.formFunctions.onChange}/>
                <input placeholder="first_name" name="first_name" onChange = {this.formFunctions.onChange}/>
                <input placeholder="last_name" name="last_name" onChange = {this.formFunctions.onChange}/>
                <input type ="submit" onClick = {this.formFunctions.signUpFunctions.onSubmit}/>
            </React.Fragment>
        }

        return componentUI;
    }
};