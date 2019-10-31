
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Form, Button, Modal } from 'react-bootstrap';

export default class customerLogin extends  Component {
    constructor(props){
        super(props);

        this.state = {
            amount: '',
            showModal: false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    onChangeAmount(e){
        this.setState({
            amount: e.target.value
        });
    }

    handleClose(){
        this.setState({
            showModal: false
        });
    }

    handleOpen(){
        this.setState({
            showModal: true
        });
    }

    onSubmit(e){
        e.preventDefault();

        if(this.state.amount < 0){
            alert('Enter Positive Value');
        }
        else{
            axios.post('http://localhost:4000/customer/addmoney', {addedmoney: this.state.amount}, {withCredentials: true}).then(response => {
                console.log('login response', response.data);
                this.handleClose();
            }).catch(function(err) {
                console.log(err);
            });
        }
    }
    render(){
        return (
            <div>
                <Button variant="primary" onClick={this.handleOpen}>Add Money</Button>
                <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered
                    show = {this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Money to Wallet
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Current balance : {this.props.balance}
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
                    </Modal.Body>
                    <Modal.Footer>
                        Chaddah Choudhary Insurance and Claims Company
                    </Modal.Footer>
                </Modal>
           </div>
        );
    }
}
