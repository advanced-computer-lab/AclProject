import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import '../App.css';
import jwt from 'jsonwebtoken'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip'

const airports = require('../airports.json');

class UpdateFlightInfo extends Component {
  constructor(props) {
    super(props);
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
    this.forceUpdate()
  };

  onChangeDate = e => {
    this.state.date = e.target.value
    this.forceUpdate()
  };

  onChangeDepartureTime = e => {
    this.state.departure_time = e.target.value
    this.forceUpdate()
  };

  onChangeArrivalTime = e => {
    this.state.arrival_time = e.target.value
    this.forceUpdate()
  };

  onChangeEconomySeatsNumber = e => {
    this.state.economy_seats_number = e.target.value
    this.forceUpdate()
  };

  onChangeBusinessSeatsNumber = e => {
    this.state.business_seats_number = e.target.value
    this.forceUpdate()
  };

  onChangeFirstSeatsNumber = e => {
    this.state.first_seats_number = e.target.value
    this.forceUpdate()
  };

  onChangeBaggageAllowance = e => {
    this.state.baggage_allowance = e.target.value
    this.forceUpdate()
  };

  onChangePrice = e => {
    this.state.price = e.target.value
    this.forceUpdate()
  };

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('http://localhost:8082/api/flights/' + this.props.match.params.id)
      .then(res => {
        // this.setState({...this.state, flight: res.data})
        this.setState({
          flight_number: res.data.flight_number,
          departure_airport: res.data.departure_airport,
          arrival_airport: res.data.arrival_airport,
          departure_time: res.data.departure_time,
          arrival_time: res.data.arrival_time,
          date: res.data.date,
          economy_seats_number: res.data.economy_seats_number,
          business_seats_number: res.data.business_seats_number,
          first_seats_number: res.data.first_seats_number,
          baggage_allowance: res.data.baggage_allowance,
          price: res.data.price
        })
      })
      .catch(err => {
        console.log("Error from UpdateFlightInfo");
      })
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
      .put('http://localhost:8082/api/flights/' + this.props.match.params.id, data)
      .then(res => {
        this.props.history.push('/admin-show-flight-list/');
      })
      .catch(err => {
        console.log("Error in UpdateFlightInfo!");
      })
  };


  render() {
    return (
      <div className="UpdateFlight">
        <br />
        <br />
        <div className="backgroundLabelUpdateFlight">
          <b>Edit Flight</b>
        </div>
        <div className="backgroundBoxUpdateFlight">
          <br />
          <br />
          <form noValidate onSubmit={this.onSubmit}>
            <TextField style={{
              width: "400px",
            }}
              value={this.state.flight_number}
              onChange={this.onChangeFlightNumber}
              label="Flight Number" id="outlined-size-normal" defaultValue="" />
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
              value={this.state.departure_airport}
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
              value={this.state.arrival_airport}
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
              value={this.state.date}
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
              value={this.state.departure_time}
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
              value={this.state.arrival_time}
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
              value={this.state.economy_seats_number}
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
              value={this.state.business_seats_number}
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
              value={this.state.first_seats_number}
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
              helperText="Economy = Baggage Allowance || Business = Baggage Allowance + 1 || First = Baggage Allowance + 2"
              type="number"
              onFocus={this._onFocus} onBlur={this._onBlur}
              placeholder=""
              variant="outlined"
              value={this.state.baggage_allowance}
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
              helperText="Economy = Price || Business = Price*125% || First = Price*150% || Child = Price*70%"
              type="number"
              onFocus={this._onFocus} onBlur={this._onBlur}
              placeholder=""
              variant="outlined"
              value={this.state.price}
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
            }} variant="contained">Edit Flight</Button>
          </form>
        </div>
        <br />
      </div>
    );
  }
}

export default UpdateFlightInfo;