import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Route } from 'react-router-dom';

export default class Authenticate extends Component {

    getUsers = () => {
        return axios.get('https://my-json-server.typicode.com/ShreyasKbrn/the_bill_split_mocky/profile');
      }

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
                id: '',
                first_name: '',
                last_name: ''                
            },
        }

        this.getUsers().then((response) => {
            this.setState({
              profiles: [...response.data]
            }, () => {
              console.log(this.state)
            });
          }).catch(err => {
            console.error(err)
          });
    }

    componentDidMount () {

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
                let profiles = [...this.state.profiles];
                let isSubmitted = false;
                
                for (let i=0; i<profiles.length; i++) {
                    if (profiles[i].email === this.state.signin.email && profiles[i].id ===Number.parseInt(this.state.signin.id)) {
                        isSubmitted = true;
                        localStorage.setItem('token', new Date()*1+'');
                    }
                }

                let signin = {
                    ...this.state.signin,
                    isSubmitted: isSubmitted
                };
                this.setState({
                    ...this.state,
                    ['signin']: {...signin}                            
                });                
            }
        },
        signUpFunctions: {
            onSubmit: () => {}
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
            componentUI = <h3>Signup</h3>
        }

        return componentUI;
    }
};