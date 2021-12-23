import React, { Component } from 'react';
import '../App.css';
import Button from '@mui/material/Button';
import axios from 'axios';

var flightID = String(((window.location.pathname).split("/"))[2]);
var newBookedSeats = String(((window.location.pathname).split("/"))[3]);
var newBookedSeatsUser = String(((window.location.pathname).split("/"))[4]);
var booking_reference = String(((window.location.pathname).split("/"))[5]);

class ChangeSeats2 extends Component {
  constructor() {
    super();
    this.state = {
      userflights: [],
      selectedFlightUserflightId: ''
    };
  }

  componentDidMount() {

      axios
      .get('http://localhost:8082/api/userflights')
      .then(res => {
        this.setState({
          userflights: res.data
        })
        console.log("Length " + this.state.userflights.length);
      if (this.state.userflights.length !== 0){
      for (var a = 0; a < this.state.userflights.length; a++){
        if (this.state.userflights[a].booking_reference === booking_reference){
          this.state.selectedFlightUserflightId = this.state.userflights[a]._id;
        }}
      }
      console.log(this.state.selectedFlightUserflightId);
      })
      .catch(err => {
        console.log('Error from ShowFlightList');
      })
  }

  onSubmit = e => {
    e.preventDefault();

    if (newBookedSeats.charAt(0) === '-'){
      newBookedSeats = newBookedSeats.substring(1);
    }

    const data = {
      booked_seats: newBookedSeats,
    };

    axios
    .put('http://localhost:8082/api/flights/' + flightID, data)
    .then(res => {
    })
    .catch(err => {
      console.log("Error in UpdateFlightInfo!");
    })

    axios
      .put('http://localhost:8082/api/userflights/' + this.state.selectedFlightUserflightId, {seats_booked: newBookedSeatsUser})
      .then(res => {
      })
      .catch(err => {
        console.log("Error form ShowFlightDetails_deleteClick");
      })

      window.location.assign('http://localhost:3000/reserved-flights')
  };


  render() {
    return (
      <div className="ChangeSeats2">
        <br />
        <br />
        <div className="backgroundLabelChangeSeats2">
          <b style={{ fontSize: "50px" }}>Change Flight Seats</b>
        </div>
        <div className="backgroundBoxChangeSeats2">
          <h1 style={{ color: 'red', fontWeight: 'bold', fontSize: "40px" }} className="display-4 text-center">Please confirm that you want to change your seats</h1>
          <br />
          <p style={{ color: 'black', fontWeight: 'bold', fontSize: "40px" }}>Old Seats: {String(((window.location.pathname).split("/"))[6])}</p>
          <p style={{ color: 'black', fontWeight: 'bold', fontSize: "40px" }}>New Seats: {String(((window.location.pathname).split("/"))[4])}</p>
          <form noValidate onSubmit={this.onSubmit}>
          <Button type="submit" variant="contained">Confirm</Button>
          </form>
          <p className="lead text-center">
          </p>
          <br />
        </div>
      </div>
    );
  }
}

export default ChangeSeats2;