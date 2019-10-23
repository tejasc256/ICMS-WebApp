
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Agent = props => (
    <tr>
        <td>{props.agent.agent_id}</td>
        <td>{props.agent.firstname}</td>
        <td>{props.agent.lastname}</td>
        <td>{props.agent.branch}</td>
        <td>{props.agent.commission}</td>
        <td>
            <Link to={"/viewagent/"+props.agent.agent_id}>Change Branch</Link>
        </td>
    </tr>
)
export default class OtherPage extends  Component {
    constructor(props){
        super(props);
        this.state = {agents: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/manager')
            .then(response => {
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
