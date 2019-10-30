import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class customerSignUp extends  Component {
    constructor(props){
        super(props);

        this.state = {
            cust_email: '',
            cust_password: '',
            cust_password2: '',
            message: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeCustEmail = this.onChangeCustEmail.bind(this);
        this.onChangeCustPassword = this.onChangeCustPassword.bind(this);
        this.onChangeCustPassword2 = this.onChangeCustPassword2.bind(this);
    }

    onChangeCustEmail(e){
        this.setState({
            cust_email: e.target.value
        });
    }

    onChangeCustPassword(e){
        this.setState({
            cust_password: e.target.value
        });
    }

    onChangeCustPassword2(e){
        this.setState({
            cust_password2: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        if(this.state.cust_password !== this.state.cust_password2){
            this.setState({
                message: 'Passwords dont match'
            });
        }
        else if(!this.state.cust_email){
            this.setState({
                message: 'Please input email'
            });
        }
        else{
            axios.post('http://localhost:4000/customer/signup', {email: this.state.cust_email, password: this.state.cust_password}, {withCredentials: true}).then(response => {
                console.log('login response', response.data);
                if(response.data.errno){
                    alert('Email already Exists!');
                }
                else{
                    this.props.history.push('/editprofile');
                }
            }).catch(function(err) {
                console.log(err);
            });
        }
    }
    render(){
        const myStyle = {
            marginTop: "50px", width: "50%", marginLeft: "auto", marginRight: "auto"
        }
        return (
            <div style={myStyle}>
               <h3>Sign Up</h3>
               <form onSubmit={this.onSubmit}>
                   <div className="form-group">
                       <label>Email: </label>
                       <input  type="email"
                               className="form-control"
                               value={this.state.cust_email}
                               onChange={this.onChangeCustEmail}
                               />
                   </div>
                   <div className="form-group">
                       <label>Password: </label>
                       <input
                               type="password"
                               className="form-control"
                               value={this.state.cust_password}
                               onChange={this.onChangeCustPassword}
                               />
                   </div>
                   <div className="form-group">
                       <label>Confirm Password: </label>
                       <input
                               type="password"
                               className="form-control"
                               value={this.state.cust_password2}
                               onChange={this.onChangeCustPassword2}
                               />
                   </div>
                   <div>
                        {this.state.message}
                   </div>
                   <div className="form-group">
                       <input type="submit" value="Sign Up" className="btn btn-primary" />
                   </div>
               </form>
           </div>
        );
    }
}
