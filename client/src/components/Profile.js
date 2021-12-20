import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import loginPic from '../login.png';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
        
        <div style={{ display: 'flex' }}>
        <Card elevation={0}
        style={{
         width:"550px",
          backgroundColor: "white",
        }}
      >
        <CardContent>
          <Typography
            style={{ fontSize: 18 }}
            color="textSecondary"
            gutterBottom
          >
            Username
          </Typography>
          <Typography variant="h5" component="h2">
          {this.state.userinfo.username}
          </Typography>
        </CardContent>
      </Card> 
      </div>
      <div style={{ display: 'flex' }}>
      <Card elevation={0}
        style={{
          width:"550px",
          backgroundColor: "white",
          
        }}
      >
        <CardContent>
          <Typography
            style={{ fontSize: 18 }}
            color="textSecondary"
            gutterBottom
          >
            Email
          </Typography>
          <Typography variant="h5" component="h2">
          {this.state.userinfo.email}
          </Typography>
        </CardContent>
      </Card> 
      </div>
      <div style={{ display: 'flex' }}>
      <Card elevation={0}
        style={{
          width:"275px",
          backgroundColor: "white",
        }}
      >
        <CardContent>
          <Typography
            style={{ fontSize: 18 }}
            color="textSecondary"
            gutterBottom
          >
            Home Address
          </Typography>
          <Typography variant="h5" component="h2">
          {this.state.userinfo.address}
          </Typography>
        </CardContent>
      </Card> 

      <Card elevation={0}
        style={{
          width:"275px",
          backgroundColor: "white",
        }}
      >
        <CardContent>
          <Typography
            style={{ fontSize: 18 }}
            color="textSecondary"
            gutterBottom
          >
            Passport Number
          </Typography>
          <Typography variant="h5" component="h2">
          {this.state.userinfo.passport}
          </Typography>
        </CardContent>
      </Card> 
      </div>
      <div style={{ display: 'flex' }}>
      <Card elevation={0}
        style={{
          width:"275px",
          backgroundColor: "white",
        }}
      >
        <CardContent>
          <Typography
            style={{ fontSize: 18 }}
            color="textSecondary"
            gutterBottom
          >
            Country Code
          </Typography>
          <Typography variant="h5" component="h2">
          {this.state.userinfo.countrycode}
          </Typography>
        </CardContent>
      </Card> 

      <Card elevation={0}
        style={{
          width:"275px",
          backgroundColor: "white",
        }}
      >
        <CardContent>
          <Typography
            style={{ fontSize: 18 }}
            color="textSecondary"
            gutterBottom
          >
            Telephone Numbers
          </Typography>
          
          <Typography variant="h5" component="h2">
            
          {this.state.userinfo.telenumber1}
          <br />
          {((this.state.userinfo.telenumber2 === '')) ?(<br />):(this.state.userinfo.telenumber2)
          }
           <br />
          {((this.state.userinfo.telenumber3 === '')) ?(<br />):(this.state.userinfo.telenumber3)
          }
          </Typography>
        </CardContent>
      </Card>
            </div>
            
            <Button variant="contained" style={{
              width: "180px",
              height: "50px",
             
            }} href="./edit-profile">Edit</Button>
      </div>
      <br />
    </div>
    );
  }
}

export default Profile;