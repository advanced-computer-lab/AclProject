import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import jwt from 'jsonwebtoken'
import Button from '@mui/material/Button';
import loginPic from '../login.png';

var invalidUsername = 'false';
var wrongPassword = 'false';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeUsername = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.username = e.target.value
  };

  onChangePassword = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.password = e.target.value
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      username: this.state.username,
      password: this.state.password,
    };

    axios
      .post('http://localhost:8082/api/users/login', data)
      .then(res => {
        if (res.data === 'User not found') {
          console.log('User not found')
          invalidUsername = 'true';
          wrongPassword = 'false';
          this.forceUpdate()
        }
        else if (res.data === 'Wrong password') {
          console.log('Wrong password')
          wrongPassword = 'true';
          invalidUsername = 'false';
          this.forceUpdate()
        }
        else {
          localStorage.setItem('token', res.data)
          window.location.assign('http://localhost:3000/')
        }

      })
      .catch(err => {
        console.log("Error in Login!");
      })
  };


  render() {
    return (
      <div className="Login">
        <br />
        <br />
        <div className="backgroundLabelLogin">
          <b>Login</b>
        </div>
        <div className="backgroundBoxLogin">
          <br />
          <img src={loginPic} width="160px" height="160px" alt="fireSpot" />
          <br />
          <br />
          <form noValidate onSubmit={this.onSubmit}>


            {((invalidUsername === 'true')) ? (
              <TextField error
                onChange={this.onChangeUsername} style={{
                  width: "350px"
                }}
                label="Username" helperText="Invalid Username" id="outlined-size-normal" defaultValue="" />
            ) : (
              <TextField
                onChange={this.onChangeUsername} style={{
                  width: "350px"
                }}
                label="Username" id="outlined-size-normal" defaultValue="" />
            )}
            <br />
            <br />
            {((wrongPassword === 'true')) ? (
              <TextField
                onChange={this.onChangePassword}
                style={{
                  width: "350px"
                }}
                error
                helperText="Wrong Password"
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
            ) : (
              <TextField
                onChange={this.onChangePassword}
                style={{
                  width: "350px"
                }}
                id="outlined-password-input"
                type="password"
                label="Password"
                autoComplete="current-password"
              />
            )}
            <br />
            <br />
            <Button
              type="submit"
              style={{
                width: "180px",
                height: "50px",
              }} variant="contained">Log in</Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;