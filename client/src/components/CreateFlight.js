import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';


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
	  first_seats_number: ''
    };
  }

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
      .post('http://localhost:8082/api/flights', data)
      .then(res => {
        this.setState({
          flight_number: '',
	      departure_airport: '',
          arrival_airport: '',
          departure_time: '',
          arrival_time: '',
          date: '',
	      economy_seats_number: '',
	      business_seats_number: ''
        })
        this.props.history.push('/admin-show-flight-list');
      })
      .catch(err => {
        console.log("Error in CreateFlight!");
      })
  };

  render() {
    return (
      <div className="CreateFlight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/admin-show-flight-list" className="btn btn-outline-warning float-left">
                  Flight List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Flight</h1>
              <p className="lead text-center">
                  Create new flight
              </p>

              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
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
                  <input
                    type='text'
                    placeholder='First Seats Number'
                    name='first_seats_number'
                    className='form-control'
                    value={this.state.first_seats_number}
                    onChange={this.onChange}
                  />
                </div>

                <input
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-4"
                />
              </form>
          </div>
          </div>
        </div>
		<br />
      </div>
    );
  }
}

export default CreateFlight;