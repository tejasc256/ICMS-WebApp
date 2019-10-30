import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Button } from 'react-bootstrap';

class Agent extends Component {
    constructor(props){
        super(props);

        this.deleteAgent = this.deleteAgent.bind(this);
    }

    deleteAgent(){
        axios.delete('http://localhost:4000/agent/'+this.props.agent.agent_id)
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
                <td>{this.props.agent.agent_id}</td>
                <td>{this.props.agent.firstname}</td>
                <td>{this.props.agent.lastname}</td>
                <td>{this.props.agent.branch}</td>
                <td>{this.props.agent.commission}</td>
                <td>
                    <Button variant="danger" onClick={this.deleteAgent}>Delete Agent</Button>
                </td>
            </tr>
        );
    }
}

export default class OtherPage extends  Component {
    constructor(props){
        super(props);
        this.state = {agents: []};

        this.fetchData = this.fetchData.bind(this);
        this.agentList = this.agentList.bind(this);
    }


    fetchData(){
        axios.get('http://localhost:4000/manager', {withCredentials: true})
            .then(response => {
                console.log(response);
                this.setState({ agents: response.data });
            })
            .catch(function (error){
                console.log(error);
            });
    }

    componentDidMount() {
        this.fetchData();
        this.timer = setInterval(() => this.fetchData(), 250);
    }

    agentList() {
        return this.state.agents.map(function(currentAgent, i){
            return (<Agent agent={currentAgent} key={i} />);
            })
    }

    render(){
        const MyStyle = {
            width: "70%", marginLeft: "auto", marginRight: "auto", marginTop: "2%"
        }
        return (
            <div style={MyStyle}>
                <h3>Agent List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Agent ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Branch</th>
                            <th>Commission</th>
                            <th>Delete Agent</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.agentList() }
                    </tbody>
                </table>
            </div>
        );
    }
}
