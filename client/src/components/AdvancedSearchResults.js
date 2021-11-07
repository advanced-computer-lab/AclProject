import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FlightSummary from './FlightSummary';

class AdvancedSearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: []
	};
  }
		
    componentDidMount() {
		
		const myArray = (window.location.pathname).split("/");
		const data = {
		flight_number: myArray[2],
		departure_airport: myArray[3],
        arrival_airport: myArray[4],
        departure_time: myArray[5],
        arrival_time: myArray[6],
        date: myArray[7],
        economy_seats_number: myArray[8],
	    business_seats_number: myArray[9],
	    first_seats_number: myArray[10]
		};
		
		var emptyDataRemoved = {};
		for (var i in data) {
			if (data[i] !== '') {
			emptyDataRemoved[i] = data[i];
			}
		}
		
    axios
      .put('http://localhost:8082/api/flights/search', emptyDataRemoved)
      .then(res => {
        this.setState({
          flights: res.data
        })
		this.props.history.push('/advanced-search-results/');
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
      <div className="AdvancedSearchResults">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
			<br/>
			<Link to="/admin-show-flight-list" className="btn btn-outline-warning float-left">
                  Flight List
              </Link>
              <h2 className="display-4 text-center">Search Results</h2>
            </div>

            <div className="col-md-11">
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

export default AdvancedSearchResults;