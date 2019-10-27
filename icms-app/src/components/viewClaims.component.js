
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Button } from 'react-bootstrap';

class Claim extends Component {
    constructor(props){
        super(props);

        this.grantClaim = this.grantClaim.bind(this);
        this.rejectClaim = this.rejectClaim.bind(this);
    }

    grantClaim(){
        axios.post('http://localhost:4000/investigate', {claim_id: this.props.claim.claim_id, granted: 1}, {withCredentials: true})
        .then(response => {
            console.log((response));
        })
        .catch(function(err) {
            console.log(err);
        });
    }

    rejectClaim(){
        axios.post('http://localhost:4000/investigate', {claim_id: this.props.claim.claim_id, granted: 0}, {withCredentials: true})
        .then(response => {
            console.log((response));
        })
        .catch(function(err) {
            console.log(err);
        });
    }

    render(){
        return(
            <tr>
                <td>{this.props.claim.claim_id}</td>
                <td>{this.props.claim.cid}</td>
                <td>{this.props.claim.pname}</td>
                <td>{this.props.claim.aname}</td>
                <td>{this.props.claim.amount}</td>
                <td><Button variant="success" onClick={this.grantClaim}>Reimburse</Button></td>
                <td><Button variant="danger" onClick={this.rejectClaim}>Reject</Button></td>
            </tr>
        );
    }
}
export default class OtherPage extends  Component {
    constructor(props){
        super(props);
        this.state = {claims: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/claim/')
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
                            <th>Policy Name</th>
                            <th>Attribute Name</th>
                            <th>Amount</th>
                            <th>Reimburse</th>
                            <th>Reject</th>
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
