import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import jwt from 'jsonwebtoken'

var token = localStorage.getItem('token')
var user;

class showFlightDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flight: {}
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
        // console.log("Print-showFlightDetails-API-response: " + res.data);
        this.setState({
          flight: res.data
        })
      })
      .catch(err => {
        console.log("Error from ShowFlightDetails");
      })
  };
  
  submit = (id) => {
    confirmAlert({
      title: 'Confirmation',
      message: 'Are you sure that you want to delete this flight?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => 
		  
		  
		  axios
      .delete('http://localhost:8082/api/flights/'+id)
      .then(res => {
        this.props.history.push("/admin-show-flight-list");
      })
      .catch(err => {
        console.log("Error form ShowFlightDetails_deleteClick");
      })
		  
        },
        {
          label: 'No',
        }
      ]
    });
  };


  render() {

    const flight = this.state.flight;
	var a = "";
	if((flight.date) !== undefined){
		a = (flight.date).substring(0,10);
	}
    let FlightItem = <div>
      <table className="table table-hover table-dark">
        {/* <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead> */}
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Flight Number</td>
            <td>{ flight.flight_number }</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Departure Airport</td>
            <td>{ flight.departure_airport }</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Arrival Airport</td>
            <td>{ flight.arrival_airport }</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Departure Time</td>
            <td>{ flight.departure_time }</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Arrival Time</td>
            <td>{ flight.arrival_time }</td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>Date</td>
            <td>{ a }</td>
          </tr>
		  <tr>
            <th scope="row">7</th>
            <td>Economy Seats Number</td>
            <td>{ flight.economy_seats_number }</td>
          </tr>
		  <tr>
            <th scope="row">8</th>
            <td>Business Seats Number</td>
            <td>{ flight.business_seats_number }</td>
          </tr>
		  <tr>
            <th scope="row">9</th>
            <td>First Seats Number</td>
            <td>{ flight.first_seats_number }</td>
          </tr>
        </tbody>
      </table>
    </div>

    return (
      <div className="ShowFlightDetails">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br />
              <Link to="/admin-show-flight-list" className="btn btn-outline-warning float-left">
                  Flight List
              </Link>
            </div>
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Flight Details</h1>
              <p className="lead text-center">
                  
              </p>
              <hr /> <br />
            </div>
          </div>
          <div>
            { FlightItem }
          </div>

          <div className="row">
            <div className="col-md-6">
               <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.submit.bind(this,flight._id)}>Delete Flight</button><br />
            </div>

            <div className="col-md-6">
              <Link to={`/edit-flight/${flight._id}`} className="btn btn-outline-info btn-lg btn-block">
                    Edit Flight
              </Link>
              <br />
            </div>

          </div>
            {/* <br />
            <button type="button" class="btn btn-outline-info btn-lg btn-block">Edit Flight</button>
            <button type="button" class="btn btn-outline-danger btn-lg btn-block">Delete Flight</button> */}

        </div>
      </div>
    );
  }
}

export default showFlightDetails;