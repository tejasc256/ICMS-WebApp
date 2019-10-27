import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Button } from 'react-bootstrap';

class Agent extends Component {
    constructor(props){
        super(props);

        this.changeBranch = this.changeBranch.bind(this);
    }

    changeBranch(){
        axios.post('http://localhost:4000/manager/changebranch', {agent_id: this.props.agent_id, branch: this.props.branch}, {withCredentials: true})
        .then(response => {
            console.log(response);
        })
        .catch(function(err) {
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
                    <Button variant="success" onClick={this.changeBranch}>Change Branch</Button>
                </td>
            </tr>
        );
    }
}

export default class OtherPage extends  Component {
    constructor(props){
        super(props);
        this.state = {agents: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/manager', {withCredentials: true})
            .then(response => {
                console.log(response);
                this.setState({ agents: response.data });
            })
            .catch(function (error){
                console.log(error);
            }   )
    }

    agentList() {
        return this.state.agents.map(function(currentAgent, i){
            return (<Agent agent={currentAgent} key={i} />);
            })
    }

    render(){
        return (
            <div>
                <h3>Agent List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Agent ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Branch</th>
                            <th>Commission</th>
                            <th>Change Branch</th>
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
