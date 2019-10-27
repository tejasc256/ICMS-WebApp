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
            mgr_id: ''
        }

        this.userSignOut = this.userSignOut.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:4000/agent/profile', {withCredentials: true})
        .then(response => {
            console.log(response)
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
    }

    userSignOut(){
        axios.get('http://localhost:4000/login/logout', {withCredentials: true})
        .then(response => {
            this.props.history.push("/login");
        })
        .catch(function(err) {
            console.log(err);
        })
    }

    render(){
        return (
            <Router>
                <div style={{marginTop: 10}}>
                    <h3>
                        Agent Dashboard
                    </h3>
                   <h5>Welcome {this.state.firstname} {this.state.lastname}</h5>
                   {this.state.branch} <br/>
                   {this.state.commission} <br/>
                   {this.state.mgr_id} <br/>
                       <Button variant="secondary" onClick={this.userSignOut}>Sign Out</Button><br/>
               </div>
               <div className="container">
                   <nav className="navbar navbar-expand-lg navbar-light bg-light">
                       <ul className="navbar-nav mr-auto">
                           <li className="navbar-item">
                           <Link to="/requests" className="nav-link">Pending Requests</Link>
                           </li>
                       </ul>
                   </nav>
               </div>
               <Route path = "/requests" component = {PendingRequests} />
            </Router>
        );
    }
}
