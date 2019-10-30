import React from "react";
import { Doughnut } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import axios from 'axios';

//var dynamic_labels = [];



class ChartsPage extends React.Component {
    

state = {
  dataDoughnut: {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
        hoverBackgroundColor: [
          "#FF5A5E",
          "#5AD3D1",
          "#FFC870",
          "#A8B3C5",
          "#616774"
        ]
      }
    ]
  }
}

componentDidMount() {
    axios.get('http://localhost:4000/ceo/claimsperbranch')
        .then(response => {
            this.setState({
                dataDoughnut : {
                    labels : response.data.map(function(current_count,i){
                        return (Object.values(current_count)[0])
                      }),
                      datasets : [{
                        data: response.data.map(function(current_count,i){
                            return (Object.values(current_count)[1])}),
                        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
                        hoverBackgroundColor: [
                          "#FF5A5E",
                          "#5AD3D1",
                          "#FFC870",
                          "#A8B3C5",
                          "#616774"
                        ]
                          
                            
                      }]
                }
            });
          }
        )
        .catch(function (error){
            console.log(error);
        }   )
}

render() {
    return (
    <MDBContainer>
      <h3 className="mt-5">Claims per branch</h3>
      <Doughnut data={this.state.dataDoughnut} options={{ responsive: true }} />
    </MDBContainer>
    );
  }
}

export default ChartsPage;