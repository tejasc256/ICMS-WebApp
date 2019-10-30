import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';
import Popup from 'reactjs-popup';

import ViewAgents from './viewAgents.component';
import ViewInvestigators from './viewInvestigators.component';

export default class managerDashboard extends  Component {
    constructor(props){
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            branch: ''
        }

        this.userSignOut = this.userSignOut.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:4000/manager/profile', {withCredentials: true})
        .then(response => {
            if(response.data === 'AuthFail'){
                this.props.history.push("/");
            }
            this.setState({
                firstname: response.data[0].firstname,
                lastname: response.data[0].lastname,
                branch: response.data[0].branch
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
                        Manager Dashboard
                    </h3>
                   <h5>Welcome {this.state.firstname} {this.state.lastname}</h5>
                   {this.state.branch} <br/>
                       <Button variant="secondary" onClick={this.userSignOut}>Sign Out</Button><br/>
                       <Button variant="primary" href="/create/agent">Create Agent</Button><br/>
                       <Button variant="primary" href="/create/investigator">Create Investigator</Button>
               </div>
               <div className="container">
                   <nav className="navbar navbar-expand-lg navbar-light bg-light">
                       <ul className="navbar-nav mr-auto">
                           <li className="navbar-item">
                           <Link to="/agents" className="nav-link">View Agents</Link>
                           </li>
                           <li className="navbar-item">
                           <Link to="/investigators" className="nav-link">View Investigators</Link>
                           </li>
                       </ul>
                   </nav>
               </div>
               <Route path = "/agents" component = {ViewAgents} />
               <Route path = "/investigators" component = {ViewInvestigators} />
            </Router>
        );
    }
}
