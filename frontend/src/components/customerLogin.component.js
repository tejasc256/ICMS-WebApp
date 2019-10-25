
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class customerLogin extends  Component {
    constructor(props){
        super(props);

        this.state = {
            cust_email: '',
            cust_password: '',
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeCustEmail = this.onChangeCustEmail.bind(this);
        this.onChangeCustPassword = this.onChangeCustPassword.bind(this);
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

    onSubmit(e){
        e.preventDefault();

        axios.post('http://localhost:4000/login/customer', {email: this.state.cust_email, password: this.state.cust_password}, {withCredentials: true}).then(response => {
            console.log('login response', response.data);
            if(response.data === "AuthPass"){
                this.props.history.push("/dashboard");
            }
            else{
                this.setState({
                    cust_email: response.data
                });
            }
        });


    }
    render(){
        return (
            <div style={{marginTop: 10}}>
               <h3>Customer Login</h3>
               <form onSubmit={this.onSubmit}>
                   <div className="form-group">
                       <label>Email: </label>
                       <input  type="text"
                               className="form-control"
                               value={this.state.cust_email}
                               onChange={this.onChangeCustEmail}
                               />
                   </div>
                   <div className="form-group">
                       <label>Password: </label>
                       <input
                               type="text"
                               className="form-control"
                               value={this.state.cust_password}
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
