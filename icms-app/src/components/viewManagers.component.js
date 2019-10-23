
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Manager = props => (
    <tr>
        <td>{props.manager.mgr_id}</td>
        <td>{props.manager.firstname}</td>
        <td>{props.manager.lastname}</td>
        <td>{props.manager.branch}</td>
    </tr>
)
export default class OtherPage extends  Component {
    constructor(props){
        super(props);
        this.state = {policies: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/ceo/managers')
            .then(response => {
                this.setState({ managers: response.data });
            })
            .catch(function (error){
                console.log(error);
            }   )
    }

    managerList() {
        return this.state.managers.map(function(currentManager, i){
            return (<Manager manager={currentManager} key={i} />);
            })
    }

    render(){
        return (
            <div>
                <h3>Managers List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>MGR ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Branch</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.managerList() }
                    </tbody>
                </table>
            </div>
        );
    }
}
