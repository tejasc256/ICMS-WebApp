import React, { Component } from 'react';
import axios from 'axios';

import{ Form, Button } from 'react-bootstrap';

export default class editProfile extends  Component {
    constructor(props){
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            dob: '',
            branch: '',
            branches: []
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.populateBranches = this.populateBranches.bind(this);
        this.onChangeBranch = this.onChangeBranch.bind(this);
        this.onChangeDOB = this.onChangeDOB.bind(this);
        this.checkAge = this.checkAge.bind(this);
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
            branch: e.target.value
        });
        console.log(this.state.branch);
    }

    onChangeDOB(e){
        this.setState({
            dob: e.target.value
        });
    }

    populateBranches(){
        return this.state.branches.map(function(current, i) {
            return(<option value={current.branch_id}>{current.city}</option>)
        });
    }

    checkAge(){
        var oneyear = 1000*60*60*24*30*12;
        var present = new Date();
        var entered = new Date(this.state.dob);
        var difference = (present.getTime() - entered.getTime())/oneyear;
        return difference;
    }


    onSubmit(e){
        e.preventDefault();
        if(!this.state.branch){
            alert('Please Choose Branch');
        }
        else if(this.checkAge() < 18){
            alert('You have to be atleast 18 years of age');
        }
        else if(!this.state.firstname || !this.state.lastname){
            alert('Enter Names');
        }
        else{
            axios.post('http://localhost:4000/customer', {firstname: this.state.firstname, lastname: this.state.lastname, dob: this.state.dob, branch: this.state.branch}, {withCredentials: true}).then(response => {
                this.props.history.push("/dashboard");
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
                <h3>Profile Details</h3>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" onChange={this.onChangeFirstName} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" onChange={this.onChangeLastName}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Date of Birth Name</Form.Label>
                            <Form.Control type="date" onChange={this.onChangeDOB}/>
                        </Form.Group>
                        <Form.Group controlId="formGridState">
                            <Form.Label>Branch</Form.Label>
                            <Form.Control as="select" onChange={this.onChangeBranch}>
                                <option>Choose Branch...</option>
                                {this.populateBranches()}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" onClick={this.onSubmit}>
                            Set Up Profile
                        </Button>
                    </Form>
            </div>
        );
    }
}
