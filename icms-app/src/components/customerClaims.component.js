import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Claim extends Component {
    constructor(props){
        super(props);

        if(props.claim.status == 0){
            this.state = {status: 'Rejected'};
        }
        else if(props.claim.status == 1){
            this.state = {status: 'Reimbursed'};
        }
        else{
            this.state = {status: 'Pending'};
        }
    }

    render(){
        if(this.props.claim.status == 0){
            return(
                <tr className="table-danger">
                    <td>{this.props.claim.claim_id}</td>
                    <td>{this.props.claim.pname}</td>
                    <td>{this.props.claim.amount}</td>
                    <td>{this.props.claim.aname}</td>
                    <td>{this.state.status}</td>
                </tr>
            );
        }
        else if(this.props.claim.status == 1){
            return(
                <tr className="table-success">
                    <td>{this.props.claim.claim_id}</td>
                    <td>{this.props.claim.pname}</td>
                    <td>{this.props.claim.amount}</td>
                    <td>{this.props.claim.aname}</td>
                    <td>{this.state.status}</td>
                </tr>
            );
        }
        else{
            return(
                <tr className="table-warning">
                    <td>{this.props.claim.claim_id}</td>
                    <td>{this.props.claim.pname}</td>
                    <td>{this.props.claim.amount}</td>
                    <td>{this.props.claim.aname}</td>
                    <td>{this.state.status}</td>
                </tr>
            );
        }
    }
}

export default class OtherPage extends  Component {
    constructor(props){
        super(props);
        this.state = {claims: []};

        this.claimsList = this.claimsList.bind(this);
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
        const MyStyle = {
            width: "70%", marginLeft: "auto", marginRight: "auto", marginTop: "2%"
        }
        return (
            <div style={MyStyle}>
                <h3>Claims List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Claim ID</th>
                            <th>Policy Name</th>
                            <th>Amount</th>
                            <th>Attribute Name</th>
                            <th>Status</th>
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
