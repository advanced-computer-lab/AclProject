import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import jwt from 'jsonwebtoken'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip'
import Alert from '@mui/material/Alert';

const airports = require('../airports.json');
var flightAlreadyExists = 'false';
var emptyField = 'false'

class CreateFlight extends Component {
  constructor() {
    super();
    this.state = {
      flight_number: '',
      departure_airport: '',
      arrival_airport: '',
      departure_time: '',
      arrival_time: '',
      departure_date: '',
      arrival_date: '',
      economy_seats_number: '',
      business_seats_number: '',
      first_seats_number: '',
      baggage_allowance_economy: '',
      price_economy: '',
      baggage_allowance_business: '',
      price_business: '',
      baggage_allowance_first: '',
      price_first: '',
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
    emptyField = 'false'
    this.forceUpdate()
  };

  onChangeDepartureDate = e => {
    this.state.departure_date = e.target.value
    emptyField = 'false'
    this.forceUpdate()
  };

  onChangeArrivalDate = e => {
    this.state.arrival_date = e.target.value
    emptyField = 'false'
    this.forceUpdate()
  };

  onChangeDepartureTime = e => {
    this.state.departure_time = e.target.value
    emptyField = 'false'
    this.forceUpdate()
  };

  onChangeArrivalTime = e => {
    this.state.arrival_time = e.target.value
    emptyField = 'false'
    this.forceUpdate()
  };

  onChangeEconomySeatsNumber = e => {
    this.state.economy_seats_number = e.target.value
    emptyField = 'false'
    this.forceUpdate()
  };

  onChangeEconomyBaggageAllowance = e => {
    this.state.baggage_allowance_economy = e.target.value
    emptyField = 'false'
    this.forceUpdate()
  };

  onChangeEconomyPrice = e => {
    this.state.price_economy = e.target.value
    emptyField = 'false'
    this.forceUpdate()
  };

  onChangeBusinessSeatsNumber = e => {
    this.state.business_seats_number = e.target.value
    emptyField = 'false'
    this.forceUpdate()
  };

  onChangeBusinessBaggageAllowance = e => {
    this.state.baggage_allowance_business = e.target.value
    emptyField = 'false'
    this.forceUpdate()
  };

  onChangeBusinessPrice = e => {
    this.state.price_business = e.target.value
    emptyField = 'false'
    this.forceUpdate()
  };

  onChangeFirstSeatsNumber = e => {
    this.state.first_seats_number = e.target.value
    emptyField = 'false'
    this.forceUpdate()
  };

  onChangeFirstBaggageAllowance = e => {
    this.state.baggage_allowance_first = e.target.value
    emptyField = 'false'
    this.forceUpdate()
  };

  onChangeFirstPrice = e => {
    this.state.price_first = e.target.value
    emptyField = 'false'
    this.forceUpdate()
  };

  onSubmit = e => {
    e.preventDefault();
    const data = {
      flight_number: this.state.flight_number,
      departure_airport: this.state.departure_airport,
      arrival_airport: this.state.arrival_airport,
      departure_time: this.state.departure_time,
      arrival_time: this.state.arrival_time,
      departure_date: this.state.departure_date,
      arrival_date: this.state.arrival_date,
      economy_seats_number: this.state.economy_seats_number,
      business_seats_number: this.state.business_seats_number,
      first_seats_number: this.state.first_seats_number,
      baggage_allowance_economy: this.state.baggage_allowance_economy,
      baggage_allowance_business: this.state.baggage_allowance_business,
      baggage_allowance_first: this.state.baggage_allowance_first,
      price_economy: this.state.price_economy,
      price_business: this.state.price_business,
      price_first: this.state.price_first,
      available_economy_seats: this.state.economy_seats_number,
      available_business_seats: this.state.business_seats_number,
      available_first_seats: this.state.first_seats_number,
      trip_duration: parseInt(((new Date(this.state.arrival_date + ' ' + this.state.arrival_time + ':00') - new Date(this.state.departure_date + ' ' + this.state.departure_time + ':00')) / (1000 * 60 * 60)) % 24) + 'hr:' + parseInt(((new Date(this.state.arrival_date + ' ' + this.state.arrival_time + ':00') - new Date(this.state.departure_date + ' ' + this.state.departure_time + ':00')) / (1000 * 60)) % 60) + 'min'
    };

    if (this.state.flight_number === '' || this.state.departure_airport === '' || this.state.arrival_airport === '' || this.state.departure_time === '' || this.state.arrival_time === '' || this.state.departure_date === '' || this.state.arrival_date === '' || this.state.economy_seats_number === '' || this.state.business_seats_number === '' || this.state.first_seats_number === '' || this.state.baggage_allowance_economy === '' || this.state.baggage_allowance_business === '' || this.state.baggage_allowance_first === '' || this.state.price_economy === '' || this.state.price_business === '' || this.state.price_first === '' || this.state.flight_number === null || this.state.departure_airport === null || this.state.arrival_airport === null || this.state.departure_time === null || this.state.arrival_time === null || this.state.departure_date === null || this.state.arrival_date === null || this.state.economy_seats_number === null || this.state.business_seats_number === null || this.state.first_seats_number === null || this.state.baggage_allowance_economy === null || this.state.baggage_allowance_business === null || this.state.baggage_allowance_first === null || this.state.price_economy === null || this.state.price_business === null || this.state.price_first === null) {
      emptyField = 'true';
      this.forceUpdate()
    }

    else {
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
    }
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
          <form noValidate onSubmit={this.onSubmit}>
            {((emptyField === 'true')) ? (
              <Alert variant="filled" style={{
                width: "500px",
                margin: "auto",
                marginTop: "-12px",
                marginBottom: "-12px"
              }} severity="error">All fields must be filled</Alert>
            ) : (
              <br />
            )}
            <br />
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
                emptyField = 'false';
                this.forceUpdate()
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
                emptyField = 'false';
                this.forceUpdate()
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
                width: "190px",
                margin: "auto",
                backgroundColor: "white",
              }}
              id="filled-textarea"
              label="Departure Date"
              type="date"
              onFocus={this._onFocus} onBlur={this._onBlur}
              placeholder=""
              variant="outlined"
              onChange={this.onChangeDepartureDate}
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
              label="Arrival Date"
              type="date"
              InputProps={{inputProps: {min: this.state.departure_date}}}
              onFocus={this._onFocus} onBlur={this._onBlur}
              placeholder=""
              variant="outlined"
              onChange={this.onChangeArrivalDate}
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
            <hr
              style={{
                color: "black",
                width: "450px"
              }}
            />
            <b style={{
              fontSize: "20px",
              color: "black"
            }}> Economy Cabin </b>
            <br />
            <br />
            <TextField
              style={{
                width: "125px",
                margin: "auto",
                backgroundColor: "white"
              }}
              id="filled-textarea"
              label="Seats Number"
              type="number"
              onFocus={this._onFocus} onBlur={this._onBlur}
              placeholder=""
              variant="outlined"
              onChange={this.onChangeEconomySeatsNumber}
              InputLabelProps={{
                shrink: true,
              }}
            />
            &nbsp;
            &nbsp;
            <TextField
              style={{
                width: "130px",
                margin: "auto",
                backgroundColor: "white",
              }}
              id="filled-textarea"
              label="Baggage Allowance"
              type="number"
              onFocus={this._onFocus} onBlur={this._onBlur}
              placeholder=""
              variant="outlined"
              onChange={this.onChangeEconomyBaggageAllowance}
              InputLabelProps={{
                shrink: true,
              }}
            />
            &nbsp;
            &nbsp;
            <TextField
              style={{
                width: "125px",
                margin: "auto",
                backgroundColor: "white",
              }}
              id="filled-textarea"
              label="Ticket Price"
              type="number"
              onFocus={this._onFocus} onBlur={this._onBlur}
              placeholder=""
              variant="outlined"
              onChange={this.onChangeEconomyPrice}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <hr
              style={{
                color: "black",
                width: "450px"
              }}
            />
            <b style={{
              fontSize: "20px",
              color: "black"
            }}> Business Cabin </b>
            <br />
            <br />
            <TextField
              style={{
                width: "125px",
                margin: "auto",
                backgroundColor: "white"
              }}
              id="filled-textarea"
              label="Seats Number"
              type="number"
              onFocus={this._onFocus} onBlur={this._onBlur}
              placeholder=""
              variant="outlined"
              onChange={this.onChangeBusinessSeatsNumber}
              InputLabelProps={{
                shrink: true,
              }}
            />
            &nbsp;
            &nbsp;
            <TextField
              style={{
                width: "130px",
                margin: "auto",
                backgroundColor: "white",
              }}
              id="filled-textarea"
              label="Baggage Allowance"
              type="number"
              onFocus={this._onFocus} onBlur={this._onBlur}
              placeholder=""
              variant="outlined"
              onChange={this.onChangeBusinessBaggageAllowance}
              InputLabelProps={{
                shrink: true,
              }}
            />
            &nbsp;
            &nbsp;
            <TextField
              style={{
                width: "125px",
                margin: "auto",
                backgroundColor: "white",
              }}
              id="filled-textarea"
              label="Ticket Price"
              type="number"
              onFocus={this._onFocus} onBlur={this._onBlur}
              placeholder=""
              variant="outlined"
              onChange={this.onChangeBusinessPrice}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <hr
              style={{
                color: "black",
                width: "450px"
              }}
            />
            <b style={{
              fontSize: "20px",
              color: "black"
            }}> First Cabin </b>
            <br />
            <br />
            <TextField
              style={{
                width: "125px",
                margin: "auto",
                backgroundColor: "white"
              }}
              id="filled-textarea"
              label="Seats Number"
              type="number"
              onFocus={this._onFocus} onBlur={this._onBlur}
              placeholder=""
              variant="outlined"
              onChange={this.onChangeFirstSeatsNumber}
              InputLabelProps={{
                shrink: true,
              }}
            />
            &nbsp;
            &nbsp;
            <TextField
              style={{
                width: "130px",
                margin: "auto",
                backgroundColor: "white",
              }}
              id="filled-textarea"
              label="Baggage Allowance"
              type="number"
              onFocus={this._onFocus} onBlur={this._onBlur}
              placeholder=""
              variant="outlined"
              onChange={this.onChangeFirstBaggageAllowance}
              InputLabelProps={{
                shrink: true,
              }}
            />
            &nbsp;
            &nbsp;
            <TextField
              style={{
                width: "125px",
                margin: "auto",
                backgroundColor: "white",
              }}
              id="filled-textarea"
              label="Ticket Price"
              type="number"
              onFocus={this._onFocus} onBlur={this._onBlur}
              placeholder=""
              variant="outlined"
              onChange={this.onChangeFirstPrice}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <hr
              style={{
                color: "black",
                width: "450px"
              }}
            />
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