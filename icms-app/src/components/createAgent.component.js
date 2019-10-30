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
            message: '',
            firstname: '',
            lastname: '',
            commission: 0,
            branch: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeCustEmail = this.onChangeCustEmail.bind(this);
        this.onChangeCustPassword = this.onChangeCustPassword.bind(this);
        this.onChangeCustPassword2 = this.onChangeCustPassword2.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeBranch = this.onChangeBranch.bind(this);
        this.onChangeCommission = this.onChangeCommission.bind(this);
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

    onChangeFirstName(e){
        this.setState({
            firstname: e.target.value
        })
    }

    onChangeLastName(e){
        this.setState({
            lastname: e.target.value
        })
    }

    onChangeCommission(e){
        this.setState({
            commission: e.target.value
        })
    }

    onChangeBranch(e){
        this.setState({
            branch: e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault();

        if(this.state.cust_password !== this.state.cust_password2){
            this.setState({
                message: 'Passwords dont match'
            });
        }
        else{
            axios.post('http://localhost:4000/manager/create/agent', {
                email: this.state.cust_email,
                password: this.state.cust_password,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                commission: this.state.commission,
                branch: this.state.branch}, {withCredentials: true}).then(response => {
                console.log('login response', response.data);
                if(response.data.errno){
                    alert('Email already Exists!');
                }
                else{
                    //Show toast
                    this.props.history.push("/manager/dashboard");
                }
            }).catch(function(err) {
                console.log(err);
            });
        }
    }
    render(){
        const MyStyle = {
            width: "50%", marginLeft: "auto", marginRight: "auto", marginTop: "2%"
        }
        return (
            <div style={MyStyle}>
               <h3>Create Agent</h3>
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

                   <div className="form-group">
                       <label>First Name: </label>
                       <input
                               type="text"
                               className="form-control"
                               value={this.state.firstname}
                               onChange={this.onChangeFirstName}
                               />
                   </div>
                   <div className="form-group">
                       <label>Last Name: </label>
                       <input
                               type="text"
                               className="form-control"
                               value={this.state.lastname}
                               onChange={this.onChangeLastName}
                               />
                   </div>
                   <div className="form-group">
                       <label>Commission: </label>
                       <input
                               type="number"
                               className="form-control"
                               value={this.state.commission}
                               onChange={this.onChangeCommission}
                               />
                   </div>
                   <div className="form-group">
                       <label>Branch </label>
                       <input
                               type="text"
                               className="form-control"
                               value={this.state.branch}
                               onChange={this.onChangeBranch}
                               />
                   </div>
                   <div>
                        {this.state.message}
                   </div>
                   <div className="form-group">
                       <input type="submit" value="Create Agent" className="btn btn-primary" />
                   </div>
               </form>
           </div>
        );
    }
}
