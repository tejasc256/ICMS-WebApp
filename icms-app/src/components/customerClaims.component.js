import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Claim = props => (
    <tr>
        <td>{props.claim.claim_id}</td>
        <td>{props.claim.pname}</td>
        <td>{props.claim.amount}</td>
        <td>{props.claim.aname}</td>
    </tr>
)
export default class OtherPage extends  Component {
    constructor(props){
        super(props);
        this.state = {claims: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/customer/claims', {withCredentials: true})
            .then(response => {
                this.setState({ claims: response.data });
            })
            .catch(function (error){
                console.log(error);
            }   )
    }

    claimsList() {
        return this.state.claims.map(function(currentClaim, i){
            return (<Claim claim={currentClaim} key={i} />);
            })
    }

    render(){
        return (
            <div>
                <h3>Claims List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Claim ID</th>
                            <th>Policy Name</th>
                            <th>Amount</th>
                            <th>Attribute Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.claimsList() }
                    </tbody>
                </table>
            </div>
        );
    }
}
