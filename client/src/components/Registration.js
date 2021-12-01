import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import loginPic from '../login.png';
import Alert from '@mui/material/Alert';

var emptyField = 'false'

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      passport: '',
      password: ''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeFirstName = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.firstname = e.target.value
    emptyField = 'false'
    this.forceUpdate()
  };

  onChangeLastName = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.lastname = e.target.value
    emptyField = 'false'
    this.forceUpdate()
  };

  onChangeUsername = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.username = e.target.value
    emptyField = 'false'
    this.forceUpdate()
  };

  onChangePassword = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.password = e.target.value
    emptyField = 'false'
    this.forceUpdate()
  };

  onChangePassportNumber = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.passport = e.target.value
    emptyField = 'false'
    this.forceUpdate()
  };

  onChangeEmail = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.email = e.target.value
    emptyField = 'false'
    this.forceUpdate()
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      username: this.state.username,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      passport: this.state.passport,
    };

    if (this.state.username === '' || this.state.firstname === '' || this.state.lastname === '' || this.state.email === '' || this.state.passport === '' || this.state.password === ''){
      emptyField = 'true';
      this.forceUpdate()
    }

    else {
    axios
      .post('http://localhost:8082/api/users/registration', data)
      .then(res => {
        this.setState({
          username: '',
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          passport: '',
        })
        this.props.history.push('/');
      })
      .catch(err => {
        console.log("Error in Registration!");
      })
    }
  };

  render() {
    return (
      <div className="Registration">
        <br />
        <br />
        <div className="backgroundLabelRegistration">
          <b >Registration</b>
        </div>
        <div className="backgroundBoxRegistration">
          <br />
          <img src={loginPic} width="160px" height="160px" alt="fireSpot" />
          <br />
          <form noValidate onSubmit={this.onSubmit}>
          {((emptyField === 'true')) ? (
          <Alert variant="filled" style={{
            width: "500px",
            margin: "auto",
            marginTop: "10px",
            marginBottom: "15px"
          }}severity="error">All fields must be filled</Alert>
        ) : (
          <br />
        )}
            <TextField
              onChange={this.onChangeFirstName} style={{
                width: "200px",
              }} label="First Name" id="outlined-size-normal" defaultValue="" />
            <TextField onChange={this.onChangeLastName} style={{
              width: "200px"
            }} label="Last Name" id="outlined-size-normal" defaultValue="" />
            <br />
            <br />
            <TextField
              onChange={this.onChangeUsername}
              style={{
                width: "400px",
              }}
              id="filled-helperText"
              label="Username"
              defaultValue=""
              helperText="You will use the username and password to login"
              variant="filled"
            />
            <br />
            <TextField
              onChange={this.onChangePassword}
              style={{
                width: "400px",
              }}
              id="filled-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="filled"
            />
            <br />
            <br />
            <TextField onChange={this.onChangeEmail} style={{
              width: "400px",
            }} label="Email" id="outlined-size-normal" defaultValue="" />
            <br />
            <br />
            <TextField onChange={this.onChangePassportNumber} style={{
              width: "400px",
            }} label="Passport Number" id="outlined-size-normal" defaultValue="" />
            <br />
            <br />
            <Button type="submit" style={{
              width: "180px",
              height: "50px",
            }} variant="contained">Register</Button>
          </form>
        </div>
        <br />
      </div>
    );
  }
}

export default Registration;