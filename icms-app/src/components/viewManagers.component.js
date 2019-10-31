
import React, { Component } from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Manager extends Component {
    constructor(props){
        super(props);

        this.deleteManager = this.deleteManager.bind(this);
    }

    deleteManager(){
        axios.delete('http://localhost:4000/manager/'+this.props.manager.mgr_id, {withCredentials: true})
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
                <td>{this.props.manager.mgr_id}</td>
                <td>{this.props.manager.firstname}</td>
                <td>{this.props.manager.lastname}</td>
                <td>{this.props.manager.branch}</td>
                <td>
                    <Button variant="danger" onClick={this.deleteManager}>Delete Manager</Button>
                </td>
            </tr>
        );
    }
}

export default class OtherPage extends  Component {
    constructor(props){
        super(props);
        this.state = {managers: []};

        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(){
        axios.get('http://localhost:4000/ceo/managers')
            .then(response => {
                this.setState({ managers: response.data });
            })
            .catch(function (error){
                console.log(error);
            });
    }



    componentDidMount() {
        this.fetchData();
        this.timer = setInterval(() => this.fetchData(), 250);
    }

    managerList() {
        return this.state.managers.map(function(currentManager, i){
            return (<Manager manager={currentManager} key={i} />);
            })
    }

    render(){
        const MyStyle = {
            width: "70%", marginLeft: "auto", marginRight: "auto", marginTop: "2%"
        }
        return (
            <div style={MyStyle}>
                <h3>Managers List</h3>
                <Button variant="primary" href="/manager/create">Create Manager</Button><br/>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>MGR ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Branch</th>
                            <th>Remove Manager</th>
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
