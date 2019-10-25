
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Claim = props => (
    <tr>
        <td>{props.claim.claim_id}</td>
        <td>{props.claim.cid}</td>
        <td>{props.claim.pid}</td>
        <td>{props.claim.aid}</td>
        <td>{props.claim.amount}</td>
    </tr>
)
export default class OtherPage extends  Component {
    constructor(props){
        super(props);
        this.state = {claims: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/claims/')
            .then(response => {
                console.log(response.data);
                this.setState({ claims: response.data });
            })
            .catch(function (error){
                console.log(error);
            }   )
    }

    claimList() {
        return this.state.claims.map(function(currentClaim, i){
            return (<Claim claim={currentClaim} key={i} />);
            });
    }

    render(){
        return (
            <div>
                <h3>Claims List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Claim ID</th>
                            <th>CID</th>
                            <th>PID</th>
                            <th>Attribute ID</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.claimList() }
                    </tbody>
                </table>
            </div>
        );
    }
}
