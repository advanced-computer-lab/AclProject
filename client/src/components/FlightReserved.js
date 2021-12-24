import React, { Component } from 'react';
import '../App.css';
import Button from '@mui/material/Button';
import axios from 'axios';
import jwt from 'jsonwebtoken';

var flightnums = []; //used to display flight info
var tabledata = []; //used to display booking in table
var tabledataR = []; //used to display booking in table
var tabledataD = []; //used to display booking in table

class NotAuthorized extends Component {
  constructor() {
    super();
    this.state = {
      flights: [],
      userflights: [],
      userflightsD: [],
      userflightsR: [],
      LoggedInUser: jwt.decode(localStorage.getItem('token'))
    };
  }

  componentDidMount() {

    axios
      .get('http://localhost:8082/api/userflights')
      .then(res => {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].username === this.state.LoggedInUser.username) {
            flightnums.push(res.data[i].flight_number);
            tabledata.push(res.data[i])



          }
        }

        for (var i = 0; i < tabledata.length; i++) {
          if (tabledata[i].booking_reference[((tabledata[i].booking_reference).length) - 1] === 'D')
            tabledataD.push(tabledata[i]);
          if (tabledata[i].booking_reference[((tabledata[i].booking_reference).length) - 1] === 'R')
            tabledataR.push(tabledata[i]);
        }

        this.setState({
          userflights: tabledata,
          userflightsD: tabledataD,
          userflightsR: tabledataR
        })

        axios.get('http://localhost:8082/api/flights').then(
          res => {
            var data = [];

            for (var i = 0; i < res.data.length; i++) {
              for (var j = 0; j < flightnums.length; j++) {
                if (res.data[i].flight_number === flightnums[j]) {
                  data.push(res.data[i]);

                }
              }
            }
            this.setState({
              flights: data
            })

          }

        ).catch(err => {
          console.log('Error from ReservedFlights2');
        })

      })
      .catch(err => {
        console.log('Error from ReservedFlights');
      })


  };

  onSubmit = e => {
    e.preventDefault();

    var text = 'You just booked a roundtrip ticket!' + '\n';
    text += 'Your Itinerary:-' + '\n';
    text += '\n';
    text += 'Departure Flights:' + '\n';
    text += '\n';
    for (var i = 0; i < this.state.userflightsD.length; i++) {
      text += 'Booking Reference: ' + this.state.userflightsD[i].booking_reference + '\n';
      text += 'Flight Number: ' + this.state.userflightsD[i].flight_number + '\n';
      text += 'Cabin: ' + this.state.userflightsD[i].cabin + '\n';
      text += 'Seats: ' + this.state.userflightsD[i].seats_booked + '\n';
      text += 'Price: ' + this.state.userflightsD[i].price + '\n';
      text += '\n';
    }
    text += 'Return Flights:' + '\n';
    text += '\n';
    for (var i = 0; i < this.state.userflightsR.length; i++) {
      text += 'Booking Reference: ' + this.state.userflightsR[i].booking_reference + '\n';
      text += 'Flight Number: ' + this.state.userflightsR[i].flight_number + '\n';
      text += 'Cabin: ' + this.state.userflightsR[i].cabin + '\n';
      text += 'Seats: ' + this.state.userflightsR[i].seats_booked + '\n';
      text += 'Price: ' + this.state.userflightsR[i].price + '\n';
      text += '\n';
    }
    const mailOptions = {
      from: 'aclprojectguc@gmail.com',
      to: jwt.decode(localStorage.getItem('token')).email,
      subject: 'Flight booked',
      text: text
    };

    axios
      .post('http://localhost:8082/api/userflights/sendemail', mailOptions)
      .then(res => {
        console.log('here')
        window.location.assign('http://localhost:3000/reserved-flights')
      })
      .catch(err => {
        console.log("Error form ReservedShowFlightDetails_deleteClick");
      })
  };

  render() {
    return (
      <div className="NotAuthorized">
        <br />
        <br />
        <div className="backgroundLabelNA">
          <b>Flight Reserved</b>
        </div>
        <div className="backgroundBoxNA">
        <br />
          <h1 style={{ color: 'black', fontWeight: 'bold', fontSize: '40px'}} className="display-4 text-center">Congratulations! You have reserved your tickets successfully. You will be emailed your itinerary shortly.</h1>
          <form noValidate onSubmit={this.onSubmit}>
          <Button
            type="submit"
            style={{
              width: "190px",
              height: "50px",
            }} variant="contained">Back to itinerary</Button>
          <br />
          <br />
        </form>
          <p className="lead text-center">
          </p>
          <br />
        </div>
      </div>
    );
  }
}

export default NotAuthorized;