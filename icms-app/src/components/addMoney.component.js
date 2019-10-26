
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

export default class customerLogin extends  Component {
    constructor(props){
        super(props);

        this.state = {
            amount: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
    }

    onChangeAmount(e){
        this.setState({
            amount: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        axios.post('http://localhost:4000/customer/addmoney', {addedmoney: this.state.amount}, {withCredentials: true}).then(response => {
            console.log('login response', response.data);
            this.props.history.push("/dashboard");
        }).catch(function(err) {
            console.log(err);
        });
    }
    render(){
        return (
            <div style={{marginTop: 10}}>
               <h3>Add Money</h3>
               <Form>
               <Form.Group controlId="formAmount">
               <Form.Label>Amount</Form.Label>
               <Form.Control type="number" placeholder="Enter amount" onChange={this.onChangeAmount}/>
               <Form.Text className="text-muted">
               We'll never share your bank details with anyone else.
               </Form.Text>
               </Form.Group>
               <Button variant="primary" type="submit" onClick={this.onSubmit}>
               Add
               </Button>
               </Form>
           </div>
        );
    }
}
