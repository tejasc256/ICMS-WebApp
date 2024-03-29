import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, CardDeck, Card, Jumbotron} from 'react-bootstrap';
import ViewPolicy from "./viewPolicy.component";

class Policy extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Card className="mx-auto shadow p-3" style={{marginBottom: "3%", width: "60%"}}>
            <Card.Body>
            <Card.Title as="h5"><b>{this.props.policy.name}</b></Card.Title>
            <Card.Title as= "h6">Description</Card.Title>
            <Card.Text>
            In case of medical emergencies, coverage will be provided for the cost of treatment.
            </Card.Text>
            <Card.Title as="h6">Details</Card.Title>
            <Card.Text>
            Duration: {this.props.policy.duration}  years <br/>
            Premium: {this.props.policy.premium}  per month
            </Card.Text>
            <ViewPolicy pid={this.props.policy.pid}/>
            </Card.Body>
            <Card.Footer className="text-right">
            <small className="text-muted">*Terms and Conditions Apply</small>
            </Card.Footer>
            </Card>
        );
    }
}

export default class OtherPage extends  Component {
    constructor(props){
        super(props);
        this.state = {policies: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/policy/', {withCredentials: true})
        .then(response => {
            this.setState({ policies: response.data });
        })
        .catch(function (error){
            console.log(error);
        }   )
    }

    policyList() {
        return this.state.policies.map(function(currentPolicy, i){
            if(currentPolicy.type === 3){
                return (<Policy policy={currentPolicy} key={i} />);
            }
        })
    }

    render(){
        return (
            <div>
                <Jumbotron style={{background: "url('/images/health.jpg')", backgroundSize: "cover", alignItems: "center", margin: "0%"}} fluid>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </Jumbotron>
                <Jumbotron fluid>
                    {this.policyList()}
                </Jumbotron>
            </div>
        );
    }
}
