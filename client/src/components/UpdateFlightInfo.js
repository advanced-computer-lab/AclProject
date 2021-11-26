import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import jwt from 'jsonwebtoken'

var token = localStorage.getItem('token')
var user;

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
	  first_seats_number: ''
    };

    var token2 = localStorage.getItem('token')
    user = jwt.decode(token2)
    if (token !== token2){ //token updated
      if (token2 == null){
        window.location.href = "http://localhost:3000/not-authorized";
      }
      else if (token2 !== null && user.username !== "Administrator"){
        window.location.href = "http://localhost:3000/not-authorized";
      }
    }

    else if (token2 === null && token2 === token){
      window.location.href = "http://localhost:3000/not-authorized";
    }

    else {
      if (user.username !== "Administrator"){
        window.location.href = "http://localhost:3000/not-authorized";
      }
    }
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('http://localhost:8082/api/flights/'+this.props.match.params.id)
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
		  first_seats_number: res.data.first_seats_number
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
	  first_seats_number: this.state.first_seats_number
    };

    axios
      .put('http://localhost:8082/api/flights/'+this.props.match.params.id, data)
      .then(res => {
        this.props.history.push('/admin-show-flight/'+this.props.match.params.id);
      })
      .catch(err => {
        console.log("Error in UpdateFlightInfo!");
      })
  };


  render() {
    return (
      <div className="UpdateFlightInfo">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/admin-show-flight-list" className="btn btn-outline-warning float-left">
                  Flight List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Flight</h1>
              <p className="lead text-center">
                  Update Flight's Info
              </p>
            </div>
          </div>

          <div className="col-md-8 m-auto">
          <form noValidate onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label htmlFor="flight_number">Flight Number</label>
              <input
                type='text'
                placeholder='Flight Number'
                name='flight_number'
                className='form-control'
                value={this.state.flight_number}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="departure_airport">Departure Airport</label>
              <input
                type='text'
                placeholder='Departure Airport'
                name='departure_airport'
                className='form-control'
                value={this.state.departure_airport}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="arrival_airport">Arrival Airport</label>
              <input
                type='text'
                placeholder='Arrival Airport'
                name='arrival_airport'
                className='form-control'
                value={this.state.arrival_airport}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="departure_time">Departure Time</label>
              <input
                type='text'
                placeholder='Departure Time'
                name='departure_time'
                className='form-control'
                value={this.state.departure_time}
                onChange={this.onChange}
              />
            </div>
			
			<div className='form-group'>
            <label htmlFor="arrival_time">Arrival Time</label>
              <input
                type='text'
                placeholder='Arrival Time'
                name='arrival_time'
                className='form-control'
                value={this.state.arrival_time}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="date">Date</label>
              <input
                type='date'
                placeholder='Date'
                name='date'
                className='form-control'
                value={this.state.date}
                onChange={this.onChange}
              />
            </div>
			
            <div className='form-group'>
            <label htmlFor="economy_seats_number">Economy Seats Number</label>
              <input
                type='text'
                placeholder='Economy Seats Number'
                name='economy_seats_number'
                className='form-control'
                value={this.state.economy_seats_number}
                onChange={this.onChange}
              />
            </div>
			
			<div className='form-group'>
            <label htmlFor="business_seats_number">Business Seats Number</label>
              <input
                type='text'
                placeholder='Business Seats Number'
                name='business_seats_number'
                className='form-control'
                value={this.state.business_seats_number}
                onChange={this.onChange}
              />
            </div>
			
			<div className='form-group'>
            <label htmlFor="first_seats_number">First Seats Number</label>
              <input
                type='text'
                placeholder='First Seats Number'
                name='first_seats_number'
                className='form-control'
                value={this.state.first_seats_number}
                onChange={this.onChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Flight</button>
            </form>
          </div>
		  <br />

        </div>
      </div>
    );
  }
}

export default UpdateFlightInfo;