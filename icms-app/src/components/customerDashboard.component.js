import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';
import Popup from 'reactjs-popup';

import CustomerPolicies from "./customerPolicies.component";
import CustomerClaims from "./customerClaims.component";
import AddMoney from "./addMoney.component";

export default class customerDashboard extends  Component {
    constructor(props){
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            branch: '',
            balance: ''
        }

        this.userSignOut = this.userSignOut.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:4000/customer/profile', {withCredentials: true})
        .then(response => {
            this.setState({
                firstname: response.data[0].firstname,
                lastname: response.data[0].lastname,
                branch: response.data[0].branch,
                balance: response.data[0].balance
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
                   <h3>Welcome {this.state.firstname} {this.state.lastname}</h3>
                       <Button variant="secondary" onClick={this.userSignOut}>Sign Out</Button><br/>
                       Wallet balance = {this.state.balance} <br/>
                   <AddMoney/>
               </div>
               <div className="container">
                   <nav className="navbar navbar-expand-lg navbar-light bg-light">
                       <ul className="navbar-nav mr-auto">
                           <li className="navbar-item">
                           <Link to="/mypolicies" className="nav-link">My Policies</Link>
                           </li>
                           <li className="navbar-item">
                           <Link to="/myclaims" className="nav-link">My Claims</Link>
                           </li>
                       </ul>
                   </nav>
               </div>
               <Route path = "/mypolicies" component = {CustomerPolicies} />
               <Route path = "/myclaims" component = {CustomerClaims} />
            </Router>

        );
    }
}
