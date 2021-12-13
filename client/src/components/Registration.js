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
      address: '',
      countrycode: '',
      telenumber1: '',
      telenumber2: '',
      telenumber3: '',
      passport:'' ,
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

  onChangeAddress = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.address = e.target.value
    emptyField = 'false'
    this.forceUpdate()
  };

  onChangeCountryCode = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.countrycode = e.target.value
    emptyField = 'false'
    this.forceUpdate()
  };

  onChangeTeleNumber1 = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.telenumber1 = e.target.value
    emptyField = 'false'
    this.forceUpdate()
  };

  onChangeTeleNumber2 = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.telenumber2 = e.target.value
    emptyField = 'false'
    this.forceUpdate()
  };

  onChangeTeleNumber3 = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.telenumber3 = e.target.value
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
      countrycode: this.state.countrycode,
      address: this.state.address,
      telenumber1: this.state.telenumber1,
      telenumber2: this.state.telenumber2,
      telenumber3: this.state.telenumber3,
      password: this.state.password,
      passport: this.state.passport,
    };

    if (this.state.username === '' || this.state.firstname === '' || this.state.lastname === '' || this.state.email === '' || this.state.address === '' || this.state.countrycode === '' || this.state.telenumber1 === ''|| this.state.passport === '' || this.state.password === ''){
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
          address: '',
      countrycode: '',
      telenumber1: '',
      telenumber2: '',
      telenumber3: '',
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
            <TextField onChange={this.onChangeAddress} style={{
              width: "400px",
            }} label="Home Address" id="outlined-size-normal" defaultValue="" />
            <br />
            <br />
            <TextField onChange={this.onChangeCountryCode} style={{
              width: "400px",
            }} label="Country Code" id="outlined-size-normal" defaultValue="" />
            <br />
            <br />
            <TextField onChange={this.onChangeTeleNumber1} style={{
              width: "400px",
            }} label="Telephone Number 1" id="outlined-size-normal" defaultValue="" />
            <br />
            <br />
            <TextField onChange={this.onChangeTeleNumber2} style={{
              width: "400px",
            }} label="Telephone Number 2 (optional)" id="outlined-size-normal" defaultValue="" />
            <br />
            <br />
            <TextField onChange={this.onChangeTeleNumber3} style={{
              width: "400px",
            }} label="Telephone Number 3 (optional)" id="outlined-size-normal" defaultValue="" />
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