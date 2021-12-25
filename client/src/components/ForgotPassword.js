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

var invalidEmail = 'false';
var emailSent = 'false';
var resetId = Math.floor(Math.pow(10, 9) + Math.random() * 9 * Math.pow(10, 9));

class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      id: ''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeEmail = e => {
    this.setState({ [e.target.name]: e.target.value });
    invalidEmail = "false"
    this.state.email = e.target.value
    this.forceUpdate();
  };

  onSubmit = e => {
    e.preventDefault();

    var text = 'Reset your password' + '\n';
    text += '\n';
    text += 'please click on this link to reset your password \n';
    text += 'http://localhost:3000/forgot-password2/' + this.state.email + "/" + resetId;

    const mailOptions = {
      from: 'aclprojectguc@gmail.com',
      to: this.state.email,
      subject: 'Reset Password',
      text: text
    };

    const data = {
      email: this.state.email,
      mailOptions: mailOptions
    };

    axios
      .post('http://localhost:8082/api/users/forgotpassword', data)
      .then(res => {
        if (res.data === 'User not found') {
          console.log('User not found')
          invalidEmail = 'true';
          this.forceUpdate()
        }
        else if (res.data === 'sss') {
          emailSent = 'true';
          axios
            .get('http://localhost:8082/api/users')
            .then(res => {
              var data = {};
              for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].email === this.state.email) {
                  data = res.data[i];
                  break;
                }
              }
              this.setState({
                id: data._id
              })
              console.log(this.state.id)
              axios
                .put('http://localhost:8082/api/users/' + this.state.id, { passwordresetid: resetId })
                .then(res => {
                })
                .catch(err => {
                  console.log("Error in Edit Profile!");
                })
            })
            .catch(err => {
              console.log("Error from Edit Profile");
            })
          this.forceUpdate()
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
          <b>Forgot Password</b>
        </div>
        <div className="backgroundBoxForgotPassword">
          <br />
          <img src={loginPic} width="160px" height="160px" alt="fireSpot" />
          <br />
          <br />
          <form noValidate onSubmit={this.onSubmit}>

            {((emailSent === 'true')) ? (
              <Alert variant="filled" style={{
                width: "500px",
                margin: "auto",
                marginTop: "0px",
                marginBottom: "10px"
              }} severity="success">Email sent successfully, check your email to reset your password</Alert>
            ) : (
              <br />
            )}

            {((invalidEmail === 'true')) ? (
              <TextField error
                onChange={this.onChangeEmail} style={{
                  width: "350px"
                }}
                label="Email" placeholder="Please enter your account's email" helperText="Email not associated with any account" id="outlined-size-normal" defaultValue="" />
            ) : (
              <TextField
                onChange={this.onChangeEmail} style={{
                  width: "350px"
                }}
                label="Email" placeholder="Please enter your account's email" id="outlined-size-normal" defaultValue="" />
            )}
            <br />
            <br />
            <Button
              type="submit"
              style={{
                width: "350px",
                height: "50px",
                fontSize: "20px"
              }} variant="contained">Forgot Password</Button>
          </form>

        </div>
      </div>
    );
  }
}

export default ForgotPassword;