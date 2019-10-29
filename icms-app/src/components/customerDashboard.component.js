import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Form, Container, Row, Col, Jumbotron } from 'react-bootstrap';
import Popup from 'reactjs-popup';

import CustomerPolicies from "./customerPolicies.component";
import CustomerClaims from "./customerClaims.component";
import CustomerRequests from "./customerRequests.component";
import AddMoney from "./addMoney.component";
import EditProfile from "./editProfilefromDash.component";

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
        this.fetchData = this.fetchData.bind(this);
        this.numberWithCommas = this.numberWithCommas.bind(this);
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    fetchData(){
        axios.get('http://localhost:4000/customer/profile', {withCredentials: true})
        .then(response => {
            var bal = this.numberWithCommas(response.data[0].balance);
            this.setState({
                firstname: response.data[0].firstname,
                lastname: response.data[0].lastname,
                branch: response.data[0].branch,
                balance: bal
            });
        }).catch(function(err){
            console.log(err + 'bulla');
        });
    }

    componentDidMount(){
        this.fetchData();
        this.timer = setInterval(() => this.fetchData(), 250);
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
                <div>
                    <Jumbotron style={{backgroundColor: "#f5efed", alignItems: "center", margin:"0%"}} fluid>
                            <Container>
                                <Row>
                                    <Col md={10}>
                                        <h3>Welcome {this.state.firstname} {this.state.lastname}</h3>
                                            <br/>
                                            <br/>
                                            <h5>
                                                Branch:  {this.state.branch} <br/><br/>
                                                Wallet balance: {this.state.balance} <br/><br/>
                                                <AddMoney balance={this.state.balance}/>
                                            </h5>
                                    </Col>
                                    <Col md={2}>
                                        <Button variant="info" onClick={this.userSignOut}>Sign Out</Button><br/>
                                    </Col>
                                </Row>
                            </Container>
                    </Jumbotron>
               </div>
               <div>
                   <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                       <div class="mx-auto order-0">
                           <div className="collapse navbar-collapse">
                               <ul className="navbar-nav mr-auto">
                                   <li className="navbar-item">
                                   <Link to="/mypolicies" className="nav-link">My Policies</Link>
                                   </li>
                                   <li className="navbar-item">
                                   <Link to="/myclaims" className="nav-link">My Claims</Link>
                                   </li>
                                   <li className="navbar-item">
                                   <Link to="/myrequests" className="nav-link">My Requests</Link>
                                   </li>
                                   <li className="navbar-item">
                                   <Link to="dashboard/editprofile" className="nav-link">Edit Profile</Link>
                                   </li>
                               </ul>
                           </div>
                       </div>
                   </nav>
               </div>
               <Route path = "/mypolicies" component = {CustomerPolicies} />
               <Route path = "/myclaims" component = {CustomerClaims} />
               <Route path = "/myrequests" component = {CustomerRequests} />
               <Route path = "/dashboard/editprofile" component = {EditProfile} />
            </Router>

        );
    }
}
