import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Button } from 'react-bootstrap';

class Investigator extends Component {
    constructor(props){
        super(props);

        this.deleteInvestigator = this.deleteInvestigator.bind(this);
    }

    deleteInvestigator(){
        axios.delete('http://localhost:4000/investigator/'+this.props.investigator.inv_id, {withCredentials: true})
        .then(response => {
            console.log(response);
            //Display Toast
        })
        .catch(err => {
            console.log(err);
        });
    }

    render(){
        return(
            <tr>
                <td>{this.props.investigator.inv_id}</td>
                <td>{this.props.investigator.firstname}</td>
                <td>{this.props.investigator.lastname}</td>
                <td>
                    <Button variant="danger" onClick={this.deleteInvestigator}>Delete Investigator</Button>
                </td>
            </tr>
        );
    }
}

export default class OtherPage extends  Component {
    constructor(props){
        super(props);
        this.state = {investigators: []};

        this.fetchData = this.fetchData.bind(this);
        this.investigatorList = this.investigatorList.bind(this);
    }


    fetchData(){
        axios.get('http://localhost:4000/investigator/all', {withCredentials: true})
            .then(response => {
                this.setState({ investigators: response.data });
            })
            .catch(function (error){
                console.log(error);
            });
    }

    componentDidMount() {
        this.fetchData();
        this.timer = setInterval(() => this.fetchData(), 250);
    }

    investigatorList() {
        return this.state.investigators.map(function(currentAgent, i){
            return (<Investigator investigator={currentAgent} key={i} />);
            })
    }

    render(){
        const MyStyle = {
            width: "70%", marginLeft: "auto", marginRight: "auto", marginTop: "2%"
        }
        return (
            <div style={MyStyle}>
                <h3>Investigators List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Investigator ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Delete Investigator</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.investigatorList() }
                    </tbody>
                </table>
            </div>
        );
    }
}
