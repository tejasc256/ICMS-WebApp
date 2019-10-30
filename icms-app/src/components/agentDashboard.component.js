import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';
import Popup from 'reactjs-popup';

import PendingRequests from './viewRequests.component';

export default class agentDashboard extends  Component {
    constructor(props){
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            branch: '',
            commission: '',
            mgr_id: '',
            branches: []
        }

        this.userSignOut = this.userSignOut.bind(this);
        this.getBranch = this.getBranch.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:4000/agent/profile', {withCredentials: true})
        .then(response => {
            if(response.data === 'AuthFail'){
                this.props.history.push("/");
            }
            this.setState({
                firstname: response.data[0].firstname,
                lastname: response.data[0].lastname,
                branch: response.data[0].branch,
                commission: response.data[0].commission,
                mgr_id: response.data[0].mgr_id
            });
        }).catch(function(err){
            console.log(err + 'bulla');
        });

        axios.get('http://localhost:4000/branch')
        .then(response => {
            this.setState({
                branches: response.data
            });
        })
        .catch(function(err) {
            console.log(err);
        });
    }

    getBranch(){
        for(var i=0; i<this.state.branches.length; i++){
            if(this.state.branches[i].branch_id === this.state.branch){
                return (this.state.branches[i].city + ', ' + this.state.branches[i].country);
            }
        }
    }

    userSignOut(){
        axios.get('http://localhost:4000/login/logout', {withCredentials: true})
        .then(response => {
            this.props.history.push("/");
        })
        .catch(function(err) {
            console.log(err);
        })
    }

    render(){
        const MyStyle = {
            width: "70%", marginLeft: "auto", marginRight: "auto", marginTop: "2%"
        }
        return (
            <Router>
                <div style={MyStyle}>
                    <h3>
                        Agent Dashboard
                    </h3>
                    <h5>Welcome {this.state.firstname} {this.state.lastname}</h5><br/>
                    Branch: {this.getBranch()} <br/>
                Commission: {this.state.commission} %<br/>
            Manager ID: {this.state.mgr_id} <br/><br/>
        <Button variant="secondary" onClick={this.userSignOut}>Sign Out</Button><br/>
    </div>
    <div>
        <PendingRequests />
    </div>
</Router>
);
}
}
