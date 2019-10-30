import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class agentLogin extends  Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            passwordssword: '',
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeCustEmail = this.onChangeCustEmail.bind(this);
        this.onChangeCustPassword = this.onChangeCustPassword.bind(this);
    }

    onChangeCustEmail(e){
        this.setState({
            email: e.target.value
        });
    }

    onChangeCustPassword(e){
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        axios.post('http://localhost:4000/login/agent', {email: this.state.email, password: this.state.password}, {withCredentials: true}).then(response => {
            console.log('login response', response.data);
            if(response.data === "AuthPass"){
                this.props.history.push("/agent/dashboard");
            }
            else{
                alert('Please check credentials');
            }
        }).catch(function(err) {
            console.log(err);
        });
    }
    render(){
        const myStyle = {
            marginTop: "50px", width: "50%", marginLeft: "auto", marginRight: "auto"
        }
        return (
            <div style={myStyle}>
               <h3>Agent Login</h3>
               <form onSubmit={this.onSubmit}>
                   <div className="form-group">
                       <label>Email: </label>
                       <input  type="email"
                               className="form-control"
                               value={this.state.email}
                               onChange={this.onChangeCustEmail}
                               />
                   </div>
                   <div className="form-group">
                       <label>Password: </label>
                       <input
                               type="password"
                               className="form-control"
                               value={this.state.passwordsswod}
                               onChange={this.onChangeCustPassword}
                               />
                   </div>
                   <div className="form-group">
                       <input type="submit" value="Login" className="btn btn-primary" />
                   </div>
               </form>
           </div>
        );
    }
}
