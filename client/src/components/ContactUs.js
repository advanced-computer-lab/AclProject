import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import jwt from 'jsonwebtoken'
import Button from '@mui/material/Button';
import loginPic from '../login.png';
import { Link } from 'react-router-dom';
import { getFormGroupUtilityClass } from '@mui/material';
import Alert from '@mui/material/Alert';

var messageSent = 'false';
var emptyField = 'false'

class ContactUs extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      message: ''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeName = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.name = e.target.value
    emptyField = 'false'
  };

  onChangeEmail = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.email = e.target.value
    emptyField = 'false'
  };

  onChangeMessage = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.message = e.target.value
    emptyField = 'false'
  };

  onSubmit = e => {
    e.preventDefault();

    var text = 'Message From:' + this.state.name + '\n';
    text += 'Email: ' + this.state.email + '\n';
    text += 'Message:- ' + '\n';
    text += this.state.message + '\n';

    const mailOptions = {
      from: 'aclprojectguc@gmail.com',
      to: 'aclprojectguc@gmail.com',
      subject: 'Message from ' + this.state.name,
      text: text
    };

    if (this.state.name === '' || this.state.email === '' || this.state.message === '') {
      emptyField = 'true';
      this.forceUpdate()
    }

    else {
      axios
        .post('http://localhost:8082/api/userflights/sendemail', mailOptions)
        .then(res => {
          messageSent = "true";
          this.forceUpdate()
        })
        .catch(err => {
          console.log("Error form ReservedShowFlightDetails_deleteClick");
        })
    }
  };


  render() {
    return (
      <div className="Login">
        <br />
        <br />
        <div className="backgroundLabelLogin">
          <b>Contact Us</b>
        </div>
        <div className="backgroundBoxContactUs">
          <br />
          <br />
          {((messageSent === 'true')) ? (
            <Alert variant="filled" style={{
              width: "500px",
              margin: "auto",
              marginTop: "-20px",
              marginBottom: "-12px"
            }} severity="success">Message sent successfully</Alert>
          ) : (
            <div></div>
          )}

          {((emptyField === 'true')) ? (
            <Alert variant="filled" style={{
              width: "500px",
              margin: "auto",
              marginTop: "-20px",
              marginBottom: "-12px"
            }} severity="error">Please fill all the fields!</Alert>
          ) : (
            <div></div>
          )}
          <br />
          <form noValidate onSubmit={this.onSubmit}>
            <TextField
              onChange={this.onChangeName} style={{
                width: "350px"
              }}
              label="Name" id="outlined-size-normal" defaultValue="" />
            <br />
            <br />
            <TextField
              onChange={this.onChangeEmail} style={{
                width: "350px"
              }}
              label="Email" id="outlined-size-normal" defaultValue="" />
            <br />
            <br />
            <TextField
              multiline
              rows={5}
              onChange={this.onChangeMessage} style={{
                width: "350px"
              }}
              label="Message" id="outlined-size-normal" defaultValue="" />
            <br />
            <br />
            <Button
              type="submit"
              style={{
                width: "350px",
                height: "50px",
                fontSize: "20px"
              }} variant="contained">Send</Button>
          </form>
          <br />
          {/* <h1 style={{ textAlign: "center", margin: "auto", color: "gray", fontSize: "5px" }}>────────────────────────────────────────────────────────────────────────────────────────────────</h1> */}
          <br />
        </div>
        <br />
        <br />
      </div>
    );
  }
}

export default ContactUs;