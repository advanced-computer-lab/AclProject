import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import jwt from 'jsonwebtoken'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip'

const airports = require('../airports.json');
var flightAlreadyExists = 'false';

class CreateFlight extends Component {
  constructor() {
    super();
    this.state = {
      flight_number: '',
      departure_airport: '',
      arrival_airport: '',
      departure_time: '',
      arrival_time: '',
      date: '',
      economy_seats_number: '',
      business_seats_number: '',
      first_seats_number: '',
      baggage_allowance: '',
      price: '',
      LoggedInUser: jwt.decode(localStorage.getItem('token'))
    };

    if (jwt.decode(localStorage.getItem('token')) === null) {
      window.location.href = "http://localhost:3000/not-authorized";
    }
    else if (this.state.LoggedInUser.username !== "Administrator") {
      window.location.href = "http://localhost:3000/not-authorized";
    }
  }

  onChangeFlightNumber = e => {
    this.state.flight_number = e.target.value
  };

  onChangeDate = e => {
    this.state.date = e.target.value
  };

  onChangeDepartureTime = e => {
    this.state.departure_time = e.target.value
  };

  onChangeArrivalTime = e => {
    this.state.arrival_time = e.target.value
  };

  onChangeEconomySeatsNumber = e => {
    this.state.economy_seats_number = e.target.value
  };

  onChangeBusinessSeatsNumber = e => {
    this.state.business_seats_number = e.target.value
  };

  onChangeFirstSeatsNumber = e => {
    this.state.first_seats_number = e.target.value
  };

  onChangeBaggageAllowance = e => {
    this.state.baggage_allowance = e.target.value
  };

  onChangePrice = e => {
    this.state.price = e.target.value
  };

  onSubmit = e => {
    e.preventDefault();
    const data = {
      flight_number: this.state.flight_number,
      departure_airport: this.state.departure_airport,
      arrival_airport: this.state.arrival_airport,
      departure_time: this.state.departure_time,
      arrival_time: this.state.arrival_time,
      date: this.state.date,
      economy_seats_number: this.state.economy_seats_number,
      business_seats_number: this.state.business_seats_number,
      first_seats_number: this.state.first_seats_number,
      baggage_allowance: this.state.baggage_allowance,
      price: this.state.price
    };

    axios
      .post('http://localhost:8082/api/flights', data)
      .then(res => {
        if (res.data === 'A flight with the same flight number already exists') {
          console.log('A flight with the same flight number already exists')
          flightAlreadyExists = 'true';
          this.forceUpdate()
        }
        else {
          this.props.history.push('/admin-show-flight-list');
        }
      })
      .catch(err => {
        console.log("Error in CreateFlight!");
      })
  };

  render() {
    return (
      <div className="CreateFlight">
        <br />
        <br />
        <div className="backgroundLabelCreateFlight">
          <b >Create Flight</b>
        </div>
        <div className="backgroundBoxCreateFlight">
          <br />
          <br />
          <form noValidate onSubmit={this.onSubmit}>
            {((flightAlreadyExists === 'true')) ? (
              <TextField error style={{
                width: "400px",
              }}
                onChange={this.onChangeFlightNumber}
                label="Flight Number" helperText="A flight with the same flight number already exists" id="outlined-size-normal" defaultValue="" />
            ) : (
              <TextField style={{
                width: "400px",
              }}
                onChange={this.onChangeFlightNumber}
                label="Flight Number" id="outlined-size-normal" defaultValue="" />
            )}
            <br />
            <br />
            <Autocomplete
              style={{
                width: "400px",
                margin: "auto",
                backgroundColor: "white"
              }}
              id="size-large-filled"
              size="large"
              options={airports}
              getOptionLabel={(option) => option}
              onChange={(ev, value) => {
                this.state.departure_airport = value
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={value}
                    size="large"
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Depart from"
                  placeholder="Airport"
                />
              )}
            />
            <br />
            <Autocomplete
              style={{
                width: "400px",
                margin: "auto",
                backgroundColor: "white"
              }}
              id="size-large-filled"
              size="large"
              options={airports}
              getOptionLabel={(option) => option}
              onChange={(ev, value) => {
                this.state.arrival_airport = value
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={value}
                    size="large"
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Destination"
                  placeholder="Airport"
                />
              )}
            />
            <br />
            <TextField
              style={{
                width: "400px",
                margin: "auto",
                backgroundColor: "white",
              }}
              id="filled-textarea"
              label="Date"
              type="date"
              onFocus={this._onFocus} onBlur={this._onBlur}
              placeholder=""
              variant="outlined"
              onChange={this.onChangeDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br />
            <br />
            <TextField
              style={{
                width: "190px",
                margin: "auto",
                backgroundColor: "white",
              }}
              id="filled-textarea"
              label="Departure Time"
              type="time"
              onFocus={this._onFocus} onBlur={this._onBlur}
              placeholder=""
              variant="outlined"
              onChange={this.onChangeDepartureTime}
              InputLabelProps={{
                shrink: true,
              }}
            />
            &nbsp;
            &nbsp;
            &nbsp;
            <TextField
              style={{
                width: "190px",
                margin: "auto",
                backgroundColor: "white",
              }}
              id="filled-textarea"
              label="Arrival Time"
              type="time"
              onFocus={this._onFocus} onBlur={this._onBlur}
              placeholder=""
              variant="outlined"
              onChange={this.onChangeArrivalTime}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br />
            <br />
            <TextField
              style={{
                width: "400px",
                margin: "auto",
                backgroundColor: "white",
              }}
              id="filled-textarea"
              label="Economy Seats Number"
              type="number"
              onFocus={this._onFocus} onBlur={this._onBlur}
              placeholder=""
              variant="outlined"
              onChange={this.onChangeEconomySeatsNumber}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br />
            <br />
            <TextField
              style={{
                width: "400px",
                margin: "auto",
                backgroundColor: "white",
              }}
              id="filled-textarea"
              label="Business Seats Number"
              type="number"
              onFocus={this._onFocus} onBlur={this._onBlur}
              placeholder=""
              variant="outlined"
              onChange={this.onChangeBusinessSeatsNumber}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br />
            <br />
            <TextField
              style={{
                width: "400px",
                margin: "auto",
                backgroundColor: "white",
              }}
              id="filled-textarea"
              label="First Seats Number"
              type="number"
              onFocus={this._onFocus} onBlur={this._onBlur}
              placeholder=""
              variant="outlined"
              onChange={this.onChangeFirstSeatsNumber}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br />
            <br />
            <TextField
              style={{
                width: "400px",
                margin: "auto",
                backgroundColor: "white",
              }}
              id="filled-textarea"
              label="Baggage Allowance"
              type="number"
              onFocus={this._onFocus} onBlur={this._onBlur}
              placeholder=""
              variant="outlined"
              onChange={this.onChangeBaggageAllowance}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br />
            <br />
            <TextField
              style={{
                width: "400px",
                margin: "auto",
                backgroundColor: "white",
              }}
              id="filled-textarea"
              label="Price"
              helperText="Economy = Price || Business = Price*125% || First = Price*150% || Childreen = Price*70%"
              type="number"
              onFocus={this._onFocus} onBlur={this._onBlur}
              placeholder=""
              variant="outlined"
              onChange={this.onChangePrice}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <br />
            <br />
            <Button type="submit" style={{
              width: "180px",
              height: "50px",
            }} variant="contained">Create Flight</Button>
          </form>
        </div>
        <br />
      </div>
    );
  }
}

export default CreateFlight;