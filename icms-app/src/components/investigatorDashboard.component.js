import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';
import Popup from 'reactjs-popup';

import PendingClaims from './viewClaims.component';

export default class investigatorDashboard extends  Component {
    constructor(props){
        super(props);

        this.state = {
            firstname: '',
            lastname: ''
        }

        this.userSignOut = this.userSignOut.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:4000/investigate/profile', {withCredentials: true})
        .then(response => {
            console.log(response)
            this.setState({
                firstname: response.data[0].firstname,
                lastname: response.data[0].lastname
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
                        Investigator Dashboard
                    </h3>
                   <h5>Welcome {this.state.firstname} {this.state.lastname}</h5>
                       <Button variant="secondary" onClick={this.userSignOut}>Sign Out</Button><br/>
               </div>
               <div className="container">
                   <nav className="navbar navbar-expand-lg navbar-light bg-light">
                       <ul className="navbar-nav mr-auto">
                           <li className="navbar-item">
                           <Link to="/claims" className="nav-link">Pending Claims</Link>
                           </li>
                       </ul>
                   </nav>
               </div>
               <Route path = "/claims" component = {PendingClaims} />
            </Router>
        );
    }
}
