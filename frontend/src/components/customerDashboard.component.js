import React, { Component } from 'react';
import axios from 'axios';

export default class customerDashboard extends  Component {
    constructor(props){
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            branch: '',
            balance: ''
        }

        this.onChangeCustEmail = this.onChangeCustEmail.bind(this);
        this.onChangeCustPassword = this.onChangeCustPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidMount(){
        axios.get('localhost:4000/customer/profile', {withCredentials: true}).then(response => {
            console.log(response.data);
            // this.setState({
            //     firstname: response.data[0].firstname,
            //     lastname: response.data[0].lastname,
            //     branch: response.data[0].branch,
            //     balance: response.data[0].balance
            // });
        }).catch(function(err){
            console.log(err + 'bulla');
        });
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

            console.log('Form Submitted');
            console.log('Name: ' + this.state.cust_email);
            console.log('Age: ' + this.state.cust_password);

            axios.post('http://localhost:4000/login/customer', {email: this.state.cust_email, password: this.state.cust_password}).then(response => {
                axios.get('http://localhost:4000/login/testpage').then(response => {
                    console.log(response);
                }).catch(function(error) {
                    console.log(error);
                });
            });

        }
    render(){
        return (
            <div style={{marginTop: 10}}>
               <h3>Welcome {this.state.firstname} {this.state.lastname}</h3>
           </div>
        );
    }
}
