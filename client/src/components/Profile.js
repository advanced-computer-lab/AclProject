import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const token = localStorage.getItem('token');
const user = jwt.decode(token);

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: {}
    };
  }

  componentDidMount() {
    
    axios
      .get('http://localhost:8082/api/users')
      .then(res => {
        var data = {};
        for (var i = 0; i < res.data.length; i++) {
          if(res.data[i].username == user.username){
            data = res.data[i];
            break;
        }
      }

      this.setState({
        userinfo: data
      })

      })
      .catch(err => {
        console.log("Error from ShowFlightDetails");
      })
      
  };

  render() {

    const userinfo = this.state.userinfo;

    let UserItem = <div>
      <table className="table table-hover table-dark">
        
        <tbody>
          <tr>
            <th scope="row"></th>
            <td>First Name</td>
            <td>{userinfo.firstname}</td>
          </tr>
          <tr>
            <th scope="row"></th>
            <td>Last Name</td>
            <td>{userinfo.lastname}</td>
          </tr>
          <tr>
            <th scope="row"></th>
            <td>Username</td>
            <td>{userinfo.username}</td>
          </tr>
          <tr>
            <th scope="row"></th>
            <td>Email</td>
            <td>{userinfo.email}</td>
          </tr>
          <tr>
            <th scope="row"></th>
            <td>Passport Number</td>
            <td>{userinfo.passport}</td>
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