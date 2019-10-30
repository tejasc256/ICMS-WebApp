
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import MakeClaim from "./makeClaim.component";

const Policy = props => (
    <tr>
        <td>{props.policy.pid}</td>
        <td>{props.policy.name}</td>
        <td>{props.policy.premium}</td>
        <td>{props.policy.duration}</td>
        <td>
            <MakeClaim pid={props.policy.pid}/>
        </td>
    </tr>
)
export default class OtherPage extends  Component {
    constructor(props){
        super(props);
        this.state = {policies: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/customer/policies', {withCredentials: true})
            .then(response => {
                this.setState({ policies: response.data });
            })
            .catch(function (error){
                console.log(error);
            }   )
    }

    policyList() {
        return this.state.policies.map(function(currentPolicy, i){
            return (<Policy policy={currentPolicy} key={i} />);
            })
    }

    render(){
        const MyStyle = {
            width: "70%", marginLeft: "auto", marginRight: "auto", marginTop: "2%"
        }
        return (
            <div style={MyStyle}>
                <h3>Policies List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>PID</th>
                            <th>Policy Name</th>
                            <th>Premium</th>
                            <th>Duration</th>
                            <th>Claim</th>
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
