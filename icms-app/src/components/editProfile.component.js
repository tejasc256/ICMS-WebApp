import React, { Component } from 'react';
import axios from 'axios';

export default class editProfile extends  Component {
    constructor(props){
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            dob: '',
            branch: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeCustEmail = this.onChangeCustEmail.bind(this);
        this.onChangeCustPassword = this.onChangeCustPassword.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onChangeCustEmail(e){
        this.setState({
            cust_email: e.target.value
        });
    }

    onChangeCustEmail(e){
        this.setState({
            cust_email: e.target.value
        });
    }

    onChangeCustPassword(e){
        this.setState({
            cust_password: e.target.value
        });
    }


    onSubmit(e){
        e.preventDefault();
        axios.post('http://localhost:4000/customer', {firstname: this.state.firstname, lastname: this.state.lastname, dob: this.state.dob, branch: this.state.branch}, {withCredentials: true}).then(response => {
            this.props.history.push("/dashboard");
        }).catch(function(err) {
            console.log(err);
        });
    }
    render(){
        return (
            <div>
                <h3>Edit Profile</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>First Name: </label>
                        <input name="firstname" type="text"
                            className="form-control"
                            value={this.state.firstname}
                            onChange={this.handleChange}
                            />
                    </div>
                    <div className="form-group">
                        <label>Last Name: </label>
                        <input name="lastname" type="text"
                            className="form-control"
                            value={this.state.lastname}
                            onChange={this.handleChange}
                            />
                    </div>
                    <div className="form-group">
                        <label>Date of Birth: </label>
                        <input name="dob" type="text"
                            className="form-control"
                            value={this.state.dob}
                            onChange={this.handleChange}
                            />
                    </div>
                    <div className="form-group">
                        <label>Branch</label>
                        <input name ="branch" type="text"
                            className="form-control"
                            value={this.state.branch}
                            onChange={this.handleChange}
                            />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}
