import React, { Component } from 'react';
import axios from 'axios';

import { Modal, Button } from 'react-bootstrap';

const Attribute = props => (
    <tr>
        <td>{props.attribute.aid}</td>
        <td>{props.attribute.name}</td>
        <td>{props.attribute.amount}</td>
    </tr>
)

export default class ViewPolicy extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            pid: '',
            name: '',
            premium: '',
            duration: '',
            type: '',
            attributes: [],
            showModal: false
        }

    }

    componentDidMount() {
        axios.get('http://localhost:4000/policy/'+this.props.pid, {withCredentials: true})
            .then(response => {
                this.setState({
                    pid: response.data[0].pid,
                    name: response.data[0].name,
                    premium: response.data[0].premium,
                    duration: response.data[0].duration,
                    type: response.data[0].type
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        axios.get('http://localhost:4000/attribute/'+this.props.pid, {withCredentials: true})
            .then(response => {
                this.setState({attributes: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onSubmit(e) {
        e.preventDefault();

        axios.post('http://localhost:4000/request', {pid: this.state.pid, type: this.state.type}, {withCredentials: true})
        .then(response => {
            console.log(response);
            if(response.data === "AuthFail"){
                alert('Please Login');
            }
            else{
                if(response.data.isSuccess === 0){
                    alert('Please add sufficient money to your wallet');
                }
                this.handleClose();
                this.props.history.push("/dashboard");
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    attributesList(){
        return this.state.attributes.map(function(curAtt, i){
            return (<Attribute attribute={curAtt} key={i} />);
            })
    }

    handleClose(){
        this.setState({
            showModal: false
        })
    }

    handleOpen(){
        this.setState({
            showModal: true
        });
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleOpen} variant="primary">View More Details</Button>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <div style={{marginTop: "5%", marginLeft: "10%", marginRight: "10%", marginBottom: "5%"}}>
                        <h3 align="center">{this.state.name}</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>PID: </label>
                                <input  type="text"
                                        className="form-control"
                                        value={this.state.pid}
                                        />
                            </div>
                            <div className="form-group">
                                <label>Name: </label>
                                <input
                                        type="text"
                                        className="form-control"
                                        value={this.state.name}
                                        />
                            </div>
                            <div className="form-group">
                                <label>Premium: </label>
                                <input
                                        type="text"
                                        className="form-control"
                                        value={this.state.premium}
                                        />
                            </div>
                            <div className="form-group">
                                <label>Duration: </label>
                                <input
                                        type="text"
                                        className="form-control"
                                        value={this.state.duration}
                                        />
                            </div>
                            <br />
                            <h3>Coverage</h3>
                            <table className="table table-striped" style={{ marginTop: 20 }} >
                                <thead>
                                    <tr>
                                        <th>AID</th>
                                        <th>Attribute Name</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.attributesList() }
                                </tbody>
                            </table>
                            <div className="form-group">
                                <input type="submit" value="Buy Policy" className="btn btn-primary" />
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        );
    }
}
