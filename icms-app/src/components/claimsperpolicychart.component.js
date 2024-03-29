import React from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import axios from 'axios';

class ChartsPage extends React.Component {
  state = {
    dataLine: {
      labels: [],
      datasets: [
        {
          label: "Label",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(225, 204,230, .3)",
          borderColor: "rgb(205, 130, 158)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(205, 130,1 58)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: []
        }
      ]
    }
  };

  componentDidMount() {
    axios.get('http://localhost:4000/ceo/claimsperpolicychart')
        .then(response => {
            console.log(response.data);
            this.setState({
                dataLine : {
                    labels : response.data.map(function(current_count,i){
                        return (Object.values(current_count)[0])
                      }),
                      datasets : [
                        {
                            label: "Claims per Policy",
                            fill: true,
                            lineTension: 0.3,
                            backgroundColor: "rgba(225, 204,230, .3)",
                            borderColor: "rgb(205, 130, 158)",
                            borderCapStyle: "butt",
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: "miter",
                            pointBorderColor: "rgb(205, 130,1 58)",
                            pointBackgroundColor: "rgb(255, 255, 255)",
                            pointBorderWidth: 10,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgb(0, 0, 0)",
                            pointHoverBorderColor: "rgba(220, 220, 220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: response.data.map(function(current_count,i){
                                return (Object.values(current_count)[1])})
                          }
                      ]
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
        <h3 className="mt-5">Claims per Policy</h3>
        <Line data={this.state.dataLine} options={{ responsive: true }} />
      </MDBContainer>
    );
  }
}

export default ChartsPage;