import React, { Component } from 'react';
import axios from 'axios';

import { Form, Button } from 'react-bootstrap';


export default class editProfile extends  Component {
    constructor(props){
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            branches: [],
            chosenbranch: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.populateBranches = this.populateBranches.bind(this);
        this.onChangeBranch = this.onChangeBranch.bind(this);
    }


    onChangeFirstName(e){
        this.setState({
            firstname: e.target.value
        });
    }

    onChangeLastName(e){
        this.setState({
            lastname: e.target.value
        });
    }

    onChangeBranch(e){
        this.setState({
            chosenbranch: e.target.value
        });
        console.log(this.state.chosenbranch);
    }

    populateBranches(){
        return this.state.branches.map(function(current, i) {
            return(<option value={current.branch_id}>{current.city}</option>)
        });
    }

    componentDidMount(){
        axios.get('http://localhost:4000/customer/profile', {withCredentials: true})
        .then(response => {
            this.setState({
                firstname: response.data[0].firstname,
                lastname: response.data[0].lastname,
                chosenbranch: response.data[0].branch
            });
        })
        .catch(err => {
            console.log(err);
        });
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

    onSubmit(e){
        e.preventDefault();
        console.log(this.state.firstname + this.state.lastname);
        axios.post('http://localhost:4000/customer/editprofile', {firstname: this.state.firstname, lastname: this.state.lastname, branch: this.state.chosenbranch}, {withCredentials: true}).then(response => {
            this.props.history.push("/dashboard");
        }).catch(function(err) {
            console.log(err);
        });
    }
    render(){
        const MyStyle = {
            width: "70%", marginLeft: "auto", marginRight: "auto", marginTop: "2%"
        }
        return (
            <div style={MyStyle}>
                <h3>Edit Profile</h3>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" defaultValue={this.state.firstname} onChange={this.onChangeFirstName} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" defaultValue={this.state.lastname} onChange={this.onChangeLastName}/>
                    </Form.Group>
                    <Form.Group controlId="formGridState">
                        <Form.Label>Branch</Form.Label>
                        <Form.Control as="select" onChange={this.onChangeBranch}>
                            {this.populateBranches()}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" onClick={this.onSubmit}>
                        Edit Profile
                    </Button>
                </Form>
            </div>
        );
    }
}
