import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Request = props => (
    <tr>
        <td>{props.request.pid}</td>
        <td>{props.request.name}</td>
        <td>{props.request.premium}</td>
    </tr>
)
export default class OtherPage extends  Component {
    constructor(props){
        super(props);
        this.state = {requests: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/request', {withCredentials: true})
            .then(response => {
                this.setState({ requests: response.data });
            })
            .catch(function (error){
                console.log(error);
            }   )
    }

    policyList() {
        return this.state.requests.map(function(currentPolicy, i){
            return (<Request request={currentPolicy} key={i} />);
            })
    }

    render(){
        return (
            <div>
                <h3>Requests List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>PID</th>
                            <th>Policy Name</th>
                            <th>Premium</th>
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
