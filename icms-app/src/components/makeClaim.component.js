import React, { Component } from 'react';
import axios from 'axios';

import { Modal, Button, Form } from 'react-bootstrap';

class MakeClaimAttribute extends Component {
    constructor(props){
        super(props);

        this.state = {
            amount: 0,
            showModal: false
        }

        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount(){
        console.log(this.props);
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

    onSubmit(){
        axios.post('http://localhost:4000/claim/create', {pid: this.props.pid, aid: this.props.attribute.aid, amount: this.state.amount}, {withCredentials: true})
        .then(response => {
            //Display Toast
            this.handleClose();
        })
        .catch(function(err) {
            console.log(err);
        });
    }

    render(){
        return(
            <div>
                <Button variant="primary" onClick={this.handleOpen}>Make Claim</Button>
                <Modal size="sm" aria-labelledby="contained-modal-title-vcenter" centered
                show = {this.state.showModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                {this.props.attribute.name}
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formAmount">
                            <Form.Label>Claim Amount</Form.Label>
                            <Form.Control type="number" placeholder="Enter amount" onChange={this.onChangeAmount}/>
                            <Form.Text className="text-muted">
                                Max Amount = {this.props.attribute.amount}
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" onClick={this.onSubmit}>
                            Make Claim
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                Claims may take upto 14 to be settled
                </Modal.Footer>
                </Modal>
            </div>

        );
    }
}

class Attribute extends Component {
    constructor(props){
        super(props);

    }

    render(){
        return(
            <tr>
                <td>{this.props.attribute.aid}</td>
                <td>{this.props.attribute.name}</td>
                <td>{this.props.attribute.amount}</td>
                <td><MakeClaimAttribute pid={this.props.pid} attribute={this.props.attribute}/></td>
            </tr>
        );
    }
}

export default class MakeClaim extends Component {
    constructor(props){
        super(props);

        this.state ={
            showModal: false,
            attributes: []
        }

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.attributesList = this.attributesList.bind(this);

    }

    attributesList(){
        var ppid = this.props.pid;
        return this.state.attributes.map(function(curAtt, i){
            return (<Attribute pid={ppid} attribute={curAtt} key={i}/>);
            })
    }

    componentDidMount() {
        axios.get('http://localhost:4000/attribute/'+this.props.pid, {withCredentials: true})
            .then(response => {
                this.setState({attributes: response.data});
            })
            .catch(function (error) {
                console.log(error);
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

    render(){
        return(
            <div>
            <Button variant="primary" onClick={this.handleOpen}>Make a Claim</Button>
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered
            show = {this.state.showModal} onHide={this.handleClose}>
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Make Claim
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <table className="table table-striped" >
                <thead>
                    <tr>
                        <th>AID</th>
                        <th>Attribute Name</th>
                        <th>Max Amount</th>
                    </tr>
                </thead>
                <tbody>
                    { this.attributesList() }
                </tbody>
            </table>
            </Modal.Body>
            <Modal.Footer>
            Claims may take upto 14 to be settled
            </Modal.Footer>
            </Modal>
            </div>
        );
    }
}
