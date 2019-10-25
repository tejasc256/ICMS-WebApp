import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import HomePage from "./components/home-page.component";
import OtherPage from "./components/other-page.component";
import CustomerLogin from "./components/customerLogin.component";
import ViewPolicies from "./components/viewPolicies.component"
import ViewPolicy from "./components/viewPolicy.component";
import CustomerDashboard from "./components/customerDashboard.component";

class App extends Component {
    render(){
        return (
            <Router>
                <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="https://codingthesmartway.com" target="_blank">
                </a>
                <Link to="/" className="navbar-brand">CCICC</Link>
                <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                <Link to="/" className="nav-link">Home Page</Link>
                </li>
                <li className="navbar-item">
                <Link to="/login" className="nav-link">Customer Login</Link>
                </li>
                <li className="navbar-item">
                <Link to="/other" className="nav-link">List Customers</Link>
                </li>
                <li className="navbar-item">
                <Link to="/policies" className="nav-link">View Policies</Link>
                </li>
                </ul>
                </div>
                </nav>
                <Route path = "/" exact component = {HomePage}/>
                <Route path = "/other" component = {OtherPage}/>
                <Route path = "/login" component = {CustomerLogin}/>
                <Route path = "/policies" component = {ViewPolicies}/>
                <Route path = "/viewpol/:pid" component = {ViewPolicy}/>
                <Route path = "/dashboard" component = {CustomerDashboard}/>
                    </div>

            </Router>
        );
    }
}

export default App;