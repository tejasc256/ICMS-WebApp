import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import {CardDeck} from 'react-bootstrap';
import ViewManagers from "./viewManagers.component";
import CustomerBranchchart from "./customerbranchchart.component";
import PolicyTypechart from "./policyChart.component";
import RequestsAgentchart from "./requestsperagentchart.component";
import ClaimsPolicychart from "./claimsperpolicychart.component";
import ClaimsBranchchart from "./claimsperbranchchart.component";
import AgentsManagerchart from "./agentspermanagerchart.component";
import ClaimsCustomerchart from "./claimspercustomerchart.component";
import ClaimsInvestigatorchart from "./claimsperinvestigator.component";
import barchart from "../images/barchart.png";
import linechart from "../images/linechart.png";
import donutchart from "../images/donutchart.png";

//import CustomerClaims from "./customerClaims.component";

export default class ceoDashboard extends  Component {
    constructor(props){
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            branch: '',
            //balance: ''
        }

        this.userSignOut = this.userSignOut.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:4000/ceo/profile', {withCredentials: true})
        .then(response => {
            this.setState({
                firstname: response.data[0].firstname,
                lastname: response.data[0].lastname,
                //branch: response.data[0].branch,
                //balance: response.data[0].balance
            });
        }).catch(function(err){
            console.log(err + 'bulla');
        });
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

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
      }

    render(){
        return (
            <Router>
                <div style={{marginTop: 10}}>
                   <h3>Welcome {this.state.firstname} {this.state.lastname}</h3>
                       <Button variant="secondary" onClick={this.userSignOut}>Sign Out</Button>
               </div>
               <div className="container">
                    <br/>
                    <CardDeck>
                        <Card style={{ width: '18rem' }}>
                            {/* <Card.Img variant="top" src={donutchart} /> */}
                            <Card.Body>
                                <Card.Title>Policies by Type</Card.Title>
                                
                                <Link to="/ceo/policychart" className="nav-link">
                                <Button variant="primary" onClick={this.scrollToBottom}>View Report</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Customers per Branch</Card.Title>
                                
                                <Link to="/ceo/customerbranchchart" className="nav-link">
                                <Button variant="primary" onClick={this.scrollToBottom}>View Report</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Policices sold per Agent</Card.Title>
                                
                                <Link to="/ceo/requestsperagentchart" className="nav-link">
                                <Button variant="primary" onClick={this.scrollToBottom}>View Report</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                    <br/>
                    <CardDeck>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Claims per Policy</Card.Title>
                                
                                <Link to="/ceo/claimsperpolicychart" className="nav-link">
                                <Button variant="primary" onClick={this.scrollToBottom}>View Report</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Agents per Manager</Card.Title>
                                
                                <Link to="/ceo/agentspermanagerchart" className="nav-link">
                                <Button variant="primary" onClick={this.scrollToBottom}>View Report</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Claims per Branch</Card.Title>
                                
                                <Link to="/ceo/claimsperbranchchart" className="nav-link">
                                <Button variant="primary" onClick={this.scrollToBottom}>View Report</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                    <br/>
                    <CardDeck>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Claims per Customer</Card.Title>
                                
                                <Link to="/ceo/claimspercustomerchart" className="nav-link">
                                <Button variant="primary" onClick={this.scrollToBottom}>View Report</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Claims per Investigator</Card.Title>
                                
                                <Link to="/ceo/claimsperinvestigatorchart" className="nav-link">
                                <Button variant="primary" onClick={this.scrollToBottom}>View Report</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                           {/* <li className="navbar-item">
                           <Link to="/managers" className="nav-link">Managers</Link>
                           </li> */}
                           {/* <li className="navbar-item">
                           <Link to="/myclaims" className="nav-link">My Claims</Link>
                           </li> */}

               </div>
               <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
                </div>
               {/* <Route path = "/managers" component = {ViewManagers} /> */}
               {/* <Route path = "/myclaims" component = {CustomerClaims} /> */}
               <Route path = "/ceo/customerbranchchart" component = {CustomerBranchchart} />
               <Route path = "/ceo/policychart" component = {PolicyTypechart} />
               <Route path = "/ceo/requestsperagentchart" component = {RequestsAgentchart} />
               <Route path = "/ceo/claimsperpolicychart" component = {ClaimsPolicychart} />
               <Route path = "/ceo/agentspermanagerchart" component = {AgentsManagerchart} />
               <Route path = "/ceo/claimsperbranchchart" component = {ClaimsBranchchart} />
               <Route path = "/ceo/claimspercustomerchart" component = {ClaimsCustomerchart} />
               <Route path = "/ceo/claimsperinvestigatorchart" component = {ClaimsInvestigatorchart} />
            </Router>

        );
    }
}
