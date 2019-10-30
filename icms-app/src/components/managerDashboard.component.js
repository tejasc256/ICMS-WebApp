import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Form, ButtonGroup } from 'react-bootstrap';
import Popup from 'reactjs-popup';

import ViewAgents from './viewAgents.component';
import ViewInvestigators from './viewInvestigators.component';

export default class managerDashboard extends  Component {
    constructor(props){
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            branch: '',
            branches: []
        }

        this.userSignOut = this.userSignOut.bind(this);
        this.getBranch = this.getBranch.bind(this);
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
                        Manager Dashboard
                    </h3>
                   <h5>Welcome {this.state.firstname} {this.state.lastname}</h5>
                   Branch: {this.getBranch()} <br/><br/>
               <Button variant="secondary" onClick={this.userSignOut}>Sign Out</Button><br/><br/>
                        <ButtonGroup>
                       <Button variant="primary" href="/create/agent">Create Agent</Button><br/>
                       <Button variant="primary" href="/create/investigator">Create Investigator</Button>
                       </ButtonGroup>
               </div>
               <div style={MyStyle}>
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
