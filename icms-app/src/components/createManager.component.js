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
            lastname: '',
            branches: [],
            branch: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeCustEmail = this.onChangeCustEmail.bind(this);
        this.onChangeCustPassword = this.onChangeCustPassword.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.populateBranches = this.populateBranches.bind(this);
        this.onChangeBranch = this.onChangeBranch.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:4000/branch')
        .then(response => {
            console.log(response.data);
            this.setState({
                branches: response.data
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    populateBranches(){
        return this.state.branches.map(function(current, i) {
            return(<option value={current.branch_id}>{current.city}</option>)
        });
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

    onChangeBranch(e){
        this.setState({
            branch: e.target.value
        });
        console.log(this.state.branch);
    }

    onSubmit(e){
        e.preventDefault();

        if(!this.state.email){
            alert('Enter email');
        }
        else if(!this.state.password){
            alert('Password cannot be null');
        }
        else if(!this.state.firstname || !this.state.lastname){
            alert('Enter Name');
        }
        else if(!this.state.branch || this.state.branch === 'Choose Branch..'){
            alert('Choose Branch');
        }
        else{

            axios.post('http://localhost:4000/manager/create', {
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
                        this.props.history.push("/ceo/dashboard");
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
            <h3>Create Manager</h3>
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
            <Form.Group controlId="formGridState">
                <Form.Label>Branch</Form.Label>
                <Form.Control as="select" onChange={this.onChangeBranch}>
                    <option>Choose Branch..</option>
                    {this.populateBranches()}
                </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={this.onSubmit}>
            Submit
            </Button>
            </Form>
           </div>
        );
    }
}
