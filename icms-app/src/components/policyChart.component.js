import React, {Component} from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import axios from 'axios';

class ChartsPage extends React.Component {
  state = {
    dataBar: {
      labels: ["Life", "Auto", "Cyber", "Health", "Home"],
      datasets: [
        {
          label: "Policies per Type",
          data: [12, 19, 3, 5, 2],
          backgroundColor: [
            "rgba(255, 134,159,0.4)",
            "rgba(98,  182, 239,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(113, 205, 205,0.4)",
            "rgba(170, 128, 252,0.4)"
          ],
          borderWidth: 2,
          borderColor: [
            "rgba(255, 134, 159, 1)",
            "rgba(98,  182, 239, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(113, 205, 205, 1)",
            "rgba(170, 128, 252, 1)"
          ]
        }
      ]
    },
    barChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            barPercentage: 1,
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)"
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)"
            },
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/ceo/policychart')
        .then(response => {
            this.setState({ data1 : response.data.map(function(current_count,i){
              return (Object.values(current_count)[0])
            })});
            this.state.dataBar.datasets[0].data = this.state.data1;
            console.log(this.state.data1);
          }
        )
        .catch(function (error){
            console.log(error);
        }   )
}


  render() {
    return (
      <MDBContainer>
        <h3 className="mt-5">Policies by Type</h3>
        <Bar data={this.state.dataBar} options={this.state.barChartOptions} />
      </MDBContainer>
    );
  }
}

export default ChartsPage;