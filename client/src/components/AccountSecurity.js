import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import jwt from 'jsonwebtoken';

var match = 'false';
var wrongpassword = 'false';
var confirmpassword = 'false';

class AccountSecurity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldpassword: '',
      newpassword: '',
      confirmpassword: '',
      id: '',
      match: 'false',
      LoggedInUser: jwt.decode(localStorage.getItem('token'))
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/users')
      .then(res => {
        var data = {};
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].username === this.state.LoggedInUser.username) {
            data = res.data[i];
            break;
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

  onChangeOldPassword = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.oldpassword = e.target.value
    this.forceUpdate()
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

    wrongpassword = 'false';
    confirmpassword = 'false';
    this.setState({
      match: 'false'
    });
    e.preventDefault();
    const data = {
      password: this.state.newpassword,
      oldpassword: this.state.oldpassword
    };

    axios
      .post('http://localhost:8082/api/users/' + this.state.id, data)
      .then(res => {
        if (res.data === 'Match' && confirmpassword == 'false' ) {
          wrongpassword = 'false';
          confirmpassword = 'false';
          this.setState({
            match: 'true'
          });
          axios
          .put('http://localhost:8082/api/users/password/' + this.state.id, data)
          .then(res => {
            console.log('Updated');
            window.location.reload(false);
            this.forceUpdate()
          })
          .catch(err => {
            console.log("Error in Edit Profile!");
          })
          console.log(res.data)
        }
      })
      .catch(err => { console.log("Error in Old password!"); })

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

  };


  render() {
    return (
      <div className="EditProfile">
        <br />
        <br />
        <div className="backgroundLabelEditProfile">
          <b >Account Security</b>
        </div>
        <div className="backgroundBoxAccountSecurity">
          <br />
          <div className="labels">  <label > Change Password </label></div>
          <br />
          <form noValidate onSubmit={this.onSubmit}>

            {((wrongpassword === 'false')) ? (
              <TextField onChange={this.onChangeOldPassword} style={{
                width: "400px",
              }} label="Old Password" id="outlined-password-input"
              type="password" />
            ) : (

              <TextField error onChange={this.onChangeOldPassword} style={{
                width: "400px",
              }} label="Old Password" helperText="Wrong Password" id="outlined-password-input"
              type="password" />
            )}

            <br />
            <br />
            <TextField onChange={this.onChangeNewPassword} style={{
              width: "400px",
            }} label="New Password"id="outlined-password-input"
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

export default AccountSecurity;