import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class RequestRow extends Component {
    constructor(props){
        super(props);

        this.fulfillRequest = this.fulfillRequest.bind(this);
    }

    fulfillRequest(){
        axios.get('http://localhost:4000/agent/fulfill/' + this.props.request.rid, {withCredentials: true})
        .then(response => {
            alert('Request Approved');
        })
        .catch(function(err) {
            console.log(err);
        });
    }

    render(){
        return(
            <tr>
                <td>{this.props.request.rid}</td>
                <td>{this.props.request.name}</td>
                <td>{this.props.request.firstname}</td>
                <td>{this.props.request.email}</td>
                <td>  <Button variant="primary" onClick={this.fulfillRequest}>Approve</Button> </td>
            </tr>
        );
    }
}

const Request = props => (
    <tr>
        <td>{props.request.rid}</td>
        <td>{props.request.name}</td>
        <td>{props.request.firstname}</td>
        <td>{props.request.email}</td>
        <td>  <Button variant="primary" >Approve</Button> </td>
    </tr>
)
export default class OtherPage extends  Component {
    constructor(props){
        super(props);
        this.state = {requests: []};

        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(){
        axios.get('http://localhost:4000/request/', {withCredentials: true})
            .then(response => {
                this.setState({ requests: response.data });
            })
            .catch(function (error){
                console.log(error);
            }   );
    }

    componentDidMount() {
        this.fetchData();
        this.timer = setInterval(() => this.fetchData(), 250);
    }

    policyList() {
        return this.state.requests.map(function(currentRequest, i){
            return (<RequestRow request={currentRequest} key={i} />);
            })
    }

    render(){
        const MyStyle = {
            width: "70%", marginLeft: "auto", marginRight: "auto", marginTop: "2%"
        }
        return (
            <div style={MyStyle}>
                <h3>Requests List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>RID</th>
                            <th>Policy Name</th>
                            <th>Customer Name</th>
                            <th>Customer Email</th>
                            <th>Approve</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.policyList() }
                    </tbody>
                </table>
            </div>
        );
    }
}
