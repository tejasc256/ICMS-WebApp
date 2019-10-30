import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import { Form, Button } from 'react-bootstrap';

export default class customerSignUp extends  Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            firstname: '',
            lastname: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeCustEmail = this.onChangeCustEmail.bind(this);
        this.onChangeCustPassword = this.onChangeCustPassword.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
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


    onSubmit(e){
        e.preventDefault();

        axios.post('http://localhost:4000/investigator/create', {
            email: this.state.email,
            password: this.state.password,
            firstname: this.state.firstname,
            lastname: this.state.lastname}, {withCredentials: true}).then(response => {
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

    render(){
        return (
            <div style={{marginTop: 10}}>
            <h3>Create Investigator</h3>
            <Form>
            <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"  onChange={this.onChangeCustEmail}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={this.onChangeCustPassword}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter First Name" onChange={this.onChangeFirstName}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Last Name" onChange={this.onChangeLastName}/>
            </Form.Group>
            <Button variant="primary" onClick={this.onSubmit}>
            Submit
            </Button>
            </Form>
           </div>
        );
    }
}
