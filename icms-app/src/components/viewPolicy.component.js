import React, { Component } from 'react';
import axios from 'axios';

const Attribute = props => (
    <tr>
        <td>{props.attribute.aid}</td>
        <td>{props.attribute.name}</td>
        <td>{props.attribute.amount}</td>
    </tr>
)

export default class ViewPolicy extends Component {

    constructor(props) {
        super(props);

        // this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        // this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        // this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        // this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            pid: '',
            name: '',
            premium: '',
            duration: '',
            type: '',
            attributes: []
        }

    }

    componentDidMount() {
        axios.get('http://localhost:4000/policy/'+this.props.match.params.pid, {withCredentials: true})
            .then(response => {
                this.setState({
                    pid: response.data[0].pid,
                    name: response.data[0].name,
                    premium: response.data[0].premium,
                    duration: response.data[0].duration,
                    type: response.data[0].type
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        axios.get('http://localhost:4000/attribute/'+this.props.match.params.pid)
            .then(response => {
                this.setState({attributes: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onSubmit(e) {
        e.preventDefault();

        axios.post('http://localhost:4000/request', {pid: this.state.pid, type: this.state.type}, {withCredentials: true})
        .then(response => {
            this.props.history.push("/dashboard");
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    attributesList(){
        return this.state.attributes.map(function(curAtt, i){
            return (<Attribute attribute={curAtt} key={i} />);
            })
    }

    render() {
        return (
            <div>
                <h3 align="center">Buy Policy</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>PID: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.pid}
                                />
                    </div>
                    <div className="form-group">
                        <label>Name: </label>
                        <input
                                type="text"
                                className="form-control"
                                value={this.state.name}
                                />
                    </div>
                    <div className="form-group">
                        <label>Premium: </label>
                        <input
                                type="text"
                                className="form-control"
                                value={this.state.premium}
                                />
                    </div>
                    <div className="form-group">
                        <label>Duration: </label>
                        <input
                                type="text"
                                className="form-control"
                                value={this.state.duration}
                                />
                    </div>
                    <br />
                    <h3>Attributes List</h3>
                    <table className="table table-striped" style={{ marginTop: 20 }} >
                        <thead>
                            <tr>
                                <th>AID</th>
                                <th>Attribute Name</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.attributesList() }
                        </tbody>
                    </table>
                    <div className="form-group">
                        <input type="submit" value="Buy Policy" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}
