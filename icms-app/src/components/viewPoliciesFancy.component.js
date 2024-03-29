
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, CardDeck, Card, Jumbotron} from 'react-bootstrap';
import ViewPolicy from "./viewPolicy.component";

import lifepic from "../images/life-small.jpg";
import homepic from "../images/home-small.jpg";
import healthpic from "../images/health-small.jpg";
import autopic from "../images/auto-small.jpg";
import cyberpic from "../images/cyber-small.jpg";

import cardStyle from "./cardStyle.module.css";

class Policy extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Card className="border-primary mx-auto" style={{marginBottom: "3%", width: "60%"}}>
                <Card.Body>
                    <Card.Title as="h5"><b>{this.props.policy.name}</b></Card.Title>
                    <Card.Title as= "h6">Description</Card.Title>
                    <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
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
    }

    render(){
        return (
            <Jumbotron>
                <div style={{marginTop: "5%", marginLeft: "3%", marginRight: "3%"}}>
                    <CardDeck className={cardStyle.cardhover}>
                            <Card>
                                <Card.Img variant="top" src={lifepic} style={{height: "13vw"}}/>
                                    <Card.Body>
                                        <Card.Title>Life Insurance</Card.Title>
                                            <Card.Text>
            In case of an untimely death of the insured individual, the total benefit is paid to the nominee which can be claimed as a lumpsum or over a duration of time.
                                            </Card.Text>
                                        <div className={cardStyle.reveal} style={{textAlign: "center"}}>
                                                <Button href="/policies/life">Learn More</Button>
                                        </div>
                                    </Card.Body>
                            </Card>
                        <Card>
                            <Card.Img variant="top" src={homepic} style={{height: "13vw"}}/>
                            <Card.Body>
                                <Card.Title>Home Insurance</Card.Title>
                                        <Card.Text>
                        In case of natural or man made calamities affecting the home of the insured individual, coverage will be provided.
                                        </Card.Text>
                        <br/>
                                    <div className={cardStyle.reveal} style={{textAlign: "center"}}>
                                            <Button href="/policies/home">Learn More</Button>
                                    </div>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Img variant="top" src={healthpic} style={{height: "13vw"}}/>
                            <Card.Body>
                                <Card.Title>Health Insurance</Card.Title>
                                        <Card.Text>
            In case of medical emergencies, coverage will be provided for the cost of treatment.
                                        </Card.Text>
            <br/>
            <br/>
                                    <div className={cardStyle.reveal} style={{textAlign: "center"}}>
                                            <Button href="/policies/health">Learn More</Button>
                                    </div>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Img variant="top" src={autopic} style={{height: "13vw"}}/>
                            <Card.Body>
                                <Card.Title>Auto Insurance</Card.Title>
                                    <Card.Text>
            In case of financial loss, theft or accident of the automobile, the insurance will cover the damage inficted.
                                        </Card.Text>
            <br/>
                                    <div className={cardStyle.reveal} style={{textAlign: "center"}}>
                                            <Button href="/policies/auto">Learn More</Button>
                                    </div>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Img variant="top" src={cyberpic} style={{height: "13vw"}}/>
                            <Card.Body>
                                <Card.Title>Cyber Insurance</Card.Title>
                                    <Card.Text>
            In case of a cyber crime such as malware, DoS or ransomeware against the insured individual or their organisation, the damage shall be covered.
                                    </Card.Text>
                                    <div className={cardStyle.reveal} style={{textAlign: "center"}}>
                                            <Button href="/policies/cyber">Learn More</Button>
                                    </div>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                </div>
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
        );
    }
}
