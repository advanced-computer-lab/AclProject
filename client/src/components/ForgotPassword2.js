import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import jwt from 'jsonwebtoken';
import Alert from '@mui/material/Alert';

var match = 'false';
var wrongpassword = 'false';
var confirmpassword = 'false';
var passwordUpadted = 'false';
var hacker = "false"

class ForgotPassword2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newpassword: '',
      confirmpassword: '',
      id: '',
      match: 'false'
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/users')
      .then(res => {
        var data = {};
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].email === String(((window.location.pathname).split("/"))[2])) {
            if (res.data[i].passwordresetid === String(((window.location.pathname).split("/"))[3])) {
              data = res.data[i];
              break;
            }
            else {
              hacker = "true"
            }
          }
        }

        this.setState({
          id: data._id
        })
      })
      .catch(err => {
        console.log("Error from Edit Profile");
      })
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeNewPassword = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.newpassword = e.target.value
    this.forceUpdate()
  };

  onChangeConfirmPassword = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.confirmpassword = e.target.value
    this.forceUpdate()
  };

  onSubmit = e => {

    e.preventDefault();
    const data = {
      password: this.state.newpassword
    };

    if (this.state.match === 'false') {

      wrongpassword = 'true';
      confirmpassword = 'false';
      console.log('No Match');
      this.forceUpdate()

    }
    if (this.state.newpassword !== this.state.confirmpassword) {
      confirmpassword = 'true';
      wrongpassword = 'false';
      console.log('Confrim Password Error');
      this.forceUpdate()
    }
    else {
      axios
        .put('http://localhost:8082/api/users/password/' + this.state.id, data)
        .then(res => {
          console.log('Updated');
          passwordUpadted = "true";
          this.forceUpdate()
        })
        .catch(err => {
          console.log("Error in Edit Profile!");
        })
    }
  };


  render() {
    return (
      <div className="EditProfile">
        <br />
        <br />
        <div className="backgroundLabelEditProfile">
          <b >Account Security</b>
        </div>
        <div className="backgroundBoxAccountSecurity2">
          <br />
          <div className="labels">  <label> Reset Password </label></div>
          <form noValidate onSubmit={this.onSubmit}>
            {((passwordUpadted === 'true')) ? (
              <Alert variant="filled" style={{
                width: "500px",
                margin: "auto",
                marginTop: "-10px",
                marginBottom: "-18px"
              }} severity="success">Password updated successfully</Alert>
            ) : (
              <div></div>
            )}

            {((hacker === 'true')) ? (
              <Alert variant="filled" style={{
                width: "500px",
                margin: "auto",
                marginTop: "-10px",
                marginBottom: "-18px"
              }} severity="error">The token doesn't match!!</Alert>
            ) : (
              <div></div>
            )}
            <br />
            <TextField onChange={this.onChangeNewPassword} style={{
              width: "400px",
            }} label="New Password" id="outlined-password-input"
              type="password" />
            <br />
            <br />
            {((confirmpassword === 'false')) ? (
              <TextField onChange={this.onChangeConfirmPassword} style={{
                width: "400px",
              }} label="Confirm New Password" id="outlined-password-input"
                type="password" />
            ) : (

              <TextField error onChange={this.onChangeConfirmPassword} style={{
                width: "400px",
              }} label="Confirm New Password" helperText="Password Doesn't Match" id="outlined-password-input"
                type="password" />
            )}
            <br />
            <br />
            <Button type="submit" style={{
              width: "180px",
              height: "50px",
            }} variant="contained">Update</Button>
          </form>
        </div>
        <br />
      </div>
    );
  }
}

export default ForgotPassword2;