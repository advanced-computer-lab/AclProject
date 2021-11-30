import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FlightSummary from './AdminFlightSummary';
import jwt from 'jsonwebtoken'

class ShowFlightList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: [],
      LoggedInUser: jwt.decode(localStorage.getItem('token'))
    };

    if (jwt.decode(localStorage.getItem('token')) === null){
      window.location.href = "http://localhost:3000/not-authorized";
    }
    else if (this.state.LoggedInUser.username !== "Administrator") {
      window.location.href = "http://localhost:3000/not-authorized";
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/flights')
      .then(res => {
        this.setState({
          flights: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowFlightList');
      })
  };


  render() {
    const flights = this.state.flights;
    console.log("PrintFlight: " + flights);
    let flightList;

    if(!flights) {
      flightList = "there is no flight record!";
    } else {
      flightList = flights.map((flight, k) =>
        <FlightSummary flight={flight} key={k} />
      );
    }

    return (
      <div className="ShowFlightList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="display-4 text-center">Flight List</h2>
            </div>

            <div className="col-md-11">
            
             
			  <Link to="/advanced-search" className="btn btn-outline-warning float-left">
                Advanced Search
              </Link>
              <br />
              <br />
              <Link to="/create-flight" className="btn btn-outline-warning float-left">
                + Add New Flight
              </Link>
              <button onClick={event =>  window.location.href='/'} type="button" class="btn btn-outline-warning float-right">Logout</button>

              <br />
              <br />
              <hr />
            </div>

          </div>

          <div className="list">
                {flightList}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowFlightList;