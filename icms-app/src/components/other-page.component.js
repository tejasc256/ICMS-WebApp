
import React, { Component } from 'react';
import axios from 'axios';

const Customer = props => (
    <tr>
        <td>{props.customer.cid}</td>
        <td>{props.customer.firstname}</td>
        <td>{props.customer.lastname}</td>
        <td>{props.customer.dob}</td>
        <td>{props.customer.branch}</td>
        <td>{props.customer.balance}</td>
    </tr>
)
export default class OtherPage extends  Component {
    constructor(props){
        super(props);
        this.state = {customers: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/customer/')
            .then(response => {
                this.setState({ customers: response.data });
            })
            .catch(function (error){
                console.log(error);
            }   )
    }

    todoList() {
        return this.state.customers.map(function(currentCust, i){
            return <Customer customer={currentCust} key={i} />;
            })
    }

    render(){
        return (
            <div>
                <h3>Customers List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>CID</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>DOB</th>
                            <th>Branch</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        );
    }
}
