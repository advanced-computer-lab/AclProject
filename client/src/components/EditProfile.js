import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import loginPic from '../login.png';
import jwt from 'jsonwebtoken';


class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      passport: '',
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
          id: data._id,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          passport: data.passport
        })
      })
      .catch(err => {
        console.log("Error from Edit Profile");
      })
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeFirstName = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.firstname = e.target.value
  };

  onChangeLastName = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.lastname = e.target.value
  };

  onChangePassportNumber = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.passport = e.target.value
  };

  onChangeEmail = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.email = e.target.value
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      passport: this.state.passport
      
    };

    axios
      .put('http://localhost:8082/api/users/'+this.state.id, data)
      .then(res => {
        this.props.history.push('/profile');
      })
      .catch(err => {
        console.log("Error in Edit Profile!");
      })
  };


  render() {
    return (
      <div className="EditProfile">
        <br />
        <br />
        <div className="backgroundLabelEditProfile">
          <b >Edit Profile Info</b>
        </div>
        <div className="backgroundBoxEditProfile">
          <br />
          <img src={loginPic} width="160px" height="160px" alt="fireSpot" />
          <br />
          <br />
          <form noValidate onSubmit={this.onSubmit}>
            <TextField
              onChange={this.onChangeFirstName} style={{
                width: "200px",
              }} label="First Name" id="outlined-size-normal" value={this.state.firstname} />
            <TextField onChange={this.onChangeLastName} style={{
              width: "200px"
            }} label="Last Name" id="outlined-size-normal" value={this.state.lastname} />
            <br />
            <br />
            <TextField onChange={this.onChangeEmail} style={{
              width: "400px",
            }} label="Email" id="outlined-size-normal" value={this.state.email}/>
            <br />
            <br />
            <TextField onChange={this.onChangePassportNumber} style={{
              width: "400px",
            }} label="Passport Number" id="outlined-size-normal" value={this.state.passport}/>
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

export default EditProfile;