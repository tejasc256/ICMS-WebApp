import React, { Component } from 'react';
import axios from 'axios';

export default class customerDashboard extends  Component {
    constructor(props){
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            branch: '',
            balance: ''
        }
    }

    componentDidMount(){
        axios.get('http://localhost:4000/customer/profile', {withCredentials: true})
        .then(response => {
            console.log(response.data);
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

    render(){
        return (
            <div style={{marginTop: 10}}>
               <h3>Welcome {this.state.firstname} {this.state.lastname}</h3>
           </div>
        );
    }
}
