import React, {Component} from 'react';

export default class Signin extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            id: '',
            showWCAlert: false
        }
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    onSubmit = () => {
        //console.log(this.props.profiles)
        let profiles = [...this.props.profiles];
        debugger
        for (let i=0; i<profiles.length; i++) {
            if (profiles[i].email === this.state.email && profiles[i].id ===Number.parseInt(this.state.id)) {
                this.props.callback({
                    status: 200,
                    profile: Object.assign({}, profiles[i])
                });
                return;
            }
        }

        this.props.callback({
            status: 404
        });
    }

    render () {

        let WCBar = null;
        if (this.state.showWCAlert === true) {
            //Wrong Credentials
            WCBar = <h3>Wrong credentials!</h3>
        } else {
            WCBar = null;
        }

        return (
            <React.Fragment>
                <div>Sign In</div>
                <div>{JSON.stringify(this.props.profiles)}</div>
                <input placeholder="email" name="email" onChange = {this.onChange}/>
                <input placeholder="id" name="id" onChange = {this.onChange}/>
                <input type="submit" onClick={this.onSubmit}/>
            </React.Fragment>
        );
    }
};