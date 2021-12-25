import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import TextField from '@mui/material/TextField';

class AdvancedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flight_number: '',
      departure_airport: '',
      arrival_airport: '',
      departure_time: '',
      arrival_time: '',
      departure_date: '',
      economy_seats_number: '',
      business_seats_number: '',
      first_seats_number: ''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeDepartureTime = e => {
    this.state.departure_time = e.target.value
    this.forceUpdate()
  };

  onChangeArrivalTime = e => {
    this.state.arrival_time = e.target.value
    this.forceUpdate()
  };

  onChangeDepartureDate = e => {
    this.state.departure_date = e.target.value
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
      economy_seats_number: this.state.economy_seats_number,
      business_seats_number: this.state.business_seats_number,
      first_seats_number: this.state.first_seats_number
    };

    axios
      .get('http://localhost:8082/api/flights/', data)
      .then(res => {
        this.props.history.push('/advanced-search-results/' + data.flight_number + '/' + data.departure_airport + '/' + data.arrival_airport + '/' + data.departure_time + '/' + data.arrival_time + '/' + data.departure_date + '/' + data.economy_seats_number + '/' + data.business_seats_number + '/' + data.first_seats_number);
      })
      .catch(err => {
        console.log("Error in CreateFlight!");
      })
  };



  render() {
    return (
      <div className="AdvancedSearch">
        <br />
        <br />
        <br />
        <div className="backgroundLabelAS">
          <b>Flight Search</b>
        </div>
        <div className="backgroundBoxAS">
          <br />
          <br />

          <form noValidate onSubmit={this.onSubmit}>
            <div className='form-group'>
              <input
                style={{ margin: "auto", width: "350px" }}
                type='text'
                placeholder='Flight Number'
                name='flight_number'
                className='form-control'
                value={this.state.flight_number}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
              <input
                type='text'
                style={{ margin: "auto", width: "350px" }}
                placeholder='Departure Airport'
                name='departure_airport'
                className='form-control'
                value={this.state.departure_airport}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
              <input
                type='text'
                style={{ margin: "auto", width: "350px" }}
                placeholder='Arrival Airport'
                name='arrival_airport'
                className='form-control'
                value={this.state.arrival_airport}
                onChange={this.onChange}
              />
            </div>
            <br />
            <TextField
              style={{
                width: "175px",
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
            {/* &nbsp;
            &nbsp;
            &nbsp; */}
            <TextField
              style={{
                width: "175px",
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
                width: "350px",
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
<br />
<br />
            <div className='form-group'>
              <input
                type='text'
                style={{ margin: "auto", width: "350px" }}
                placeholder='Economy Seats Number'
                name='economy_seats_number'
                className='form-control'
                value={this.state.economy_seats_number}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
              <input
                type='text'
                style={{ margin: "auto", width: "350px" }}
                placeholder='Business Seats Number'
                name='business_seats_number'
                className='form-control'
                value={this.state.business_seats_number}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
              <input
                type='text'
                style={{ margin: "auto", width: "350px" }}
                placeholder='First Seats Number'
                name='first_seats_number'
                className='form-control'
                value={this.state.first_seats_number}
                onChange={this.onChange}
              />
            </div>

            <button style={{ margin: "auto", width: "350px" }} type="submit" className="btn btn-outline-info btn-lg btn-block">Search For Flight</button>
          </form>
          <br />

        </div>
        <br />
        <br />
      </div>
    );
  }
}

export default AdvancedSearch;