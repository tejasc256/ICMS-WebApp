import React, {Component} from "react";
import axios from 'axios';
// import "bootstrap/dist/css/bootstrap.min.css";
import "./bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Container, Row, Col} from 'react-bootstrap';

import HomePage from "./components/home-page.component";
import OtherPage from "./components/other-page.component";
import CustomerLogin from "./components/customerLogin.component";
import ViewPolicies from "./components/viewPolicies.component"
import ViewPolicy from "./components/viewPolicy.component";
import CustomerDashboard from "./components/customerDashboard.component";
import ViewClaims from "./components/viewClaims.component";
import ViewManagers from "./components/viewManagers.component";
import ViewAgents from "./components/viewAgents.component";
import PolicyChart from "./components/policyChart.component";
import Customerbranchchart from "./components/customerbranchchart.component";
import RequestperagentChart from "./components/requestsperagentchart.component";
import ClaimsPolicyChart from "./components/claimsperpolicychart.component";
import ClaimsInvestigatorChart from "./components/claimsperinvestigator.component";
import AgentManagerChart from "./components/agentspermanagerchart.component";
import ClaimsBranchChart from "./components/claimsperbranchchart.component";
import claimsCustomerChart from "./components/claimspercustomerchart.component";
import CeoDashboard from "./components/ceoDashboard.component";
import CustomerSignUp from "./components/customerSignUp.component";
import EditProfile from "./components/editProfile.component";
import AgentDashboard from "./components/agentDashboard.component";
import AgentLogin from "./components/agentsLogin.component";
import InvestigatorDashboard from "./components/investigatorDashboard.component";
import InvestigatorLogin from "./components/investigatorLogin.component";
import ManagerLogin from "./components/managerLogin.component";
import ManagerDashboard from "./components/managerDashboard.component";
import ViewAgent from "./components/viewAgent.component";
import CreateAgent from './components/createAgent.component';
import CreateInvestigator from './components/createInvestigator.component';
import CeoLogin from './components/ceoLogin.component';
import ViewPoliciesFancy from './components/viewPoliciesFancy.component';
import HomePolicies from './components/viewPoliciesHome.component';
import LifePolicies from './components/viewPoliciesLife.component';
import HealthPolicies from './components/viewPoliciesHealth.component';
import CreateManager from "./components/createManager.component";
import AutoPolicies from './components/viewPoliciesAuto.component';
import CyberPolicies from './components/viewPoliciesCyber.component';

class App extends Component {
    constructor(props){
        super(props);

        this.state ={
            showDash: false
        }
        this.checkButton = this.checkButton.bind(this);
    }

    checkButton(){
        axios.get('http://localhost:4000/login/testpage', {withCredentials: true})
        .then(response => {
            if(response.data === 'Customer'){
                this.setState({
                    showDash: true
                });
            }
            else if(response.data === 'AuthFail'){
                this.setState({
                    showDash: false
                })
            }
            else{
                this.setState({
                    showDash: false
                })
            }
        })
        .catch(function(err) {
            console.log(err);
        });
    }

    componentDidMount(){
        this.checkButton();
        this.timer = setInterval(() => this.checkButton(), 250);
    }

    render(){

        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                        <ul class="navbar-nav mr-auto" style={{marginLeft: "5%"}}>
                            <Link to="/" className="navbar-brand">CCICC</Link>
                        </ul>
                        <ul className="navbar-nav mx-auto"  >
                            <li className="navbar-item">
                                <Link to="/policies/life" className="nav-link">Life Insurance</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/policies/home" className="nav-link">Home Insurance</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/policies/health" className="nav-link">Health Insurance</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/policies/auto" className="nav-link">Auto Insurance</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/policies/cyber" className="nav-link">Cyber Insurance</Link>
                            </li>
                        </ul>
                        <ul class="navbar-nav ml-auto">
                            <li className="navbar-item">
                                {this.state.showDash && <Link to="/dashboard" className="nav-link">Go To Dashboard</Link>}
                            </li>
                            <li className="navbar-item">
                                <Link to="/login" className="nav-link">Customer Login</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/signup" className="nav-link">Sign Up</Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                    <Route path = "/" exact component = {HomePage}/>
                    <Route path = "/other" component = {OtherPage}/>
                    <Route path = "/login" component = {CustomerLogin}/>
                    <Route path = "/agent/login" component = {AgentLogin}/>
                    <Route path = "/manager/login" component = {ManagerLogin}/>
                    <Route path = "/investigator/login" component = {InvestigatorLogin}/>
                    <Route path = "/policies/home" component = {HomePolicies}/>
                    <Route path = "/policies/life" component = {LifePolicies}/>
                    <Route path = "/policies/health" component = {HealthPolicies}/>
                    <Route path = "/policies/auto" component = {AutoPolicies}/>
                    <Route path = "/policies/cyber" component = {CyberPolicies}/>
                    <Route path = "/policies/all" component = {ViewPoliciesFancy}/>
                    <Route path = "/viewpol/:pid" component = {ViewPolicy}/>
                    <Route path = "/dashboard" component = {CustomerDashboard}/>
                    <Route path = "/ceo/managers" component = {ViewManagers}/>
                    <Route path = "investigator/claims" component = {ViewClaims}/>
                    <Route path = "/signup" component = {CustomerSignUp}/>
                    <Route path = "/editprofile" component = {EditProfile}/>
                    <Route path = "/agent/dashboard" component = {AgentDashboard}/>
                    <Route path = "/investigator/dashboard" component = {InvestigatorDashboard}/>
                    <Route path = "/manager/dashboard" component = {ManagerDashboard}/>
                    <Route path = "/viewagent/:agent_id" component = {ViewAgent}/>
                    <Route path = "/create/agent" component = {CreateAgent} />
                    <Route path = "/create/investigator" component = {CreateInvestigator} />
                    <Route path = "/ceo/login" component = {CeoLogin} />
                     <Route path = "/ceo/dashboard" component = {CeoDashboard}/>
                <Route path = "/ceo/policychart" component = {PolicyChart}/>
                <Route path = "/ceo/customerbranchcountchart" component = {Customerbranchchart}/>
                <Route path = "/ceo/requestsperagent" component = {RequestperagentChart}/>
                <Route path = "/ceo/claimsperpolicychart" component = {ClaimsPolicyChart}/>
                <Route path = "/ceo/claimsperinvestigatorchart" component = {ClaimsInvestigatorChart}/>
                <Route path = "/ceo/agentspermanagerchart" component = {AgentManagerChart}/>
                <Route path = "/ceo/claimsperbranchchart" component = {ClaimsBranchChart}/>
                <Route path = "/ceo/claimspercustomerchart" component = {claimsCustomerChart}/>
                <Route path = "/ceo/profile" component = {CeoDashboard}/>
                <Route path = "/manager/create" component = {CreateManager}/>
                </Router>
            );
        }
    }

    export default App;
