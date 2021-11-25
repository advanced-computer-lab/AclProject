import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flight: {}
    };
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

  onDeleteClick (id) {
    axios
      .delete('http://localhost:8082/api/flights/'+id)
      .then(res => {
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("Error form ShowFlightDetails_deleteClick");
      })
  };


  render() {

    const flight = this.state.flight;
	var a = "";
	if((flight.date) !== undefined){
		a = (flight.date).substring(0,10);
	}
    let UserItem = <div>
      <table className="table table-hover table-dark">
        
        <tbody>
          <tr>
            <th scope="row"></th>
            <td>First Name</td>
            <td>{/* data here */}</td>
          </tr>
          <tr>
            <th scope="row"></th>
            <td>Last Name</td>
            <td>{/* data here */}</td>
          </tr>
          <tr>
            <th scope="row"></th>
            <td>Username</td>
            <td>{/* data here */}</td>
          </tr>
          <tr>
            <th scope="row"></th>
            <td>Email</td>
            <td>{/* data here */}</td>
          </tr>
          <tr>
            <th scope="row"></th>
            <td>Passport Number</td>
            <td>{/* data here */}</td>
          </tr>
        </tbody>
      </table>
    </div>

    return (
      <div className="Profile">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br />
              <Link to="/show-flight-list" className="btn btn-outline-warning float-left">
                  Flight List
              </Link>
              <Link to="/edit-profile" className="btn btn-outline-warning float-right">
                Edit Profile
              </Link>
            </div>
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Profile Information</h1>
              <p className="lead text-center">
                  
              </p>
              <hr /> <br />
            </div>
          </div>
          <div>
            { UserItem }
          </div>

          <div className="row">
            <div className="col-md-6">
            </div>

            <div className="col-md-6">
              <br />
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Profile;