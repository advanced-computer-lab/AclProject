import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import loginPic from '../login.png';
import Button from '@mui/material/Button';  
import jwt from 'jsonwebtoken';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: {},
      LoggedInUser: jwt.decode(localStorage.getItem('token'))
    };
  }

  componentDidMount() {
    
    axios
      .get('http://localhost:8082/api/users')
      .then(res => {
        var data = {};
        for (var i = 0; i < res.data.length; i++) {
          if(res.data[i].username === this.state.LoggedInUser.username){
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
    return (
      <div className="Profile">
      <br />
      <br />
      <div className="backgroundLabelProfile">
        <b >{this.state.userinfo.firstname + " " + this.state.userinfo.lastname}</b>
      </div>
      <div className="backgroundBoxProfile">
        <br />
        <img src={loginPic} width="160px" height="160px" alt="fireSpot" />
        <br />  
        
        <div className='profileInfo'>
            <label htmlFor="username">{this.state.userinfo.username}</label>
            <br />
            <label htmlFor="email">{this.state.userinfo.email}</label>
            <br />
            <label htmlFor="passport">{"Passport: " + this.state.userinfo.passport}</label>
             
            </div>
            
            <Button variant="contained" style={{
              width: "90px",
              height: "30px",
             
            }} href="./edit-profile">Edit</Button>
      </div>
      <br />
    </div>
    );
  }
}

export default Profile;