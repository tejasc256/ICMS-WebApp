import React, { Component } from 'react';
import { Carousel, Jumbotron, Button} from 'react-bootstrap';

import family1 from '../images/family1.jpg';
import family2 from '../images/family2.jpg';


export default class HomePage extends  Component {
    render(){
        return (
            <div>
                <Carousel fade="true" interval="1000" style={{height:"600px", width:"100%"}}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={family1}
                            alt="First slide"
                            style={{height:"600px", width:"100%"}}
                            />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={family2}
                            alt="Third slide"
                            style={{height:"600px", width:"100%"}}
                            />
                    </Carousel.Item>
                </Carousel>
                <Jumbotron style={{textAlign: "center", padding:"5%", margin: "0%"}} fluid>
                    <h2>Why chose CCICC</h2>
                    <br/>
                    <h5>
                        CCICC envisions to be the most admired life insurance company in India by securing the financial future of our customers.
                        <br/><br/>
                        We are an honest life insurance company, committed to doing what is right.
                        <br/>  <br/>
                        We serve our customers through Long-Term Savings, Protection and Retirement Solutions, delivered by our high-quality Agency and Multi-Channel Distribution Partners
                        <br/><br/>
                        We are a business with strong social relevance and contribute to society by supporting causes in health and well-being.
                    </h5>
                    <br/><br/>
                    <p>
                        <Button variant="primary">View Policies</Button>
                    </p>
                </Jumbotron>
                <Jumbotron className="bg-primary" style={{textAlign: "center", margin: "0%"}} fluid>
                    <h2 style={{color: "white"}}>Our Mission</h2>
                        <br/>
                        <h5 style={{color: "white"}}>
                            CCICC envisions to be the most admired life insurance company in India by securing the financial future of our customers.
                            <br/><br/>
                            We are an honest life insurance company, committed to doing what is right.
                            <br/>  <br/>
                            We serve our customers through Long-Term Savings, Protection and Retirement Solutions, delivered by our high-quality Agency and Multi-Channel Distribution Partners
                            <br/><br/>
                            We are a business with strong social relevance and contribute to society by supporting causes in health and well-being.
                        </h5>
                </Jumbotron>
            </div>
        );
    }
}
