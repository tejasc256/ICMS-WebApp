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
        axios.get('http://localhost:4000/investigator/profile', {withCredentials: true})
        .then(response => {
            console.log(response);
            if(response.data === 'AuthFail'){
                this.props.history.push("/");
            }
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
                        CCICC Investigator Dashboard
                    </h3><br/>
                <h5>Welcome {this.state.firstname} {this.state.lastname}</h5><br/>
                       <Button variant="secondary" onClick={this.userSignOut}>Sign Out</Button><br/>
               </div>
               <div>
                   <PendingClaims />
               </div>
            </Router>
        );
    }
}
