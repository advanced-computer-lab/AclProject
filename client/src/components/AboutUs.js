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

class AboutUs extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


  render() {
    return (
      <div className="Login">
        <br />
        <br />
        <div className="backgroundLabelLogin">
          <b>About Us</b>
        </div>
        <div className="backgroundBoxContactUs">
          <br />
          <br />
          <strong style={{color:"black", fontSize: "22px"}}>Founded in 2021 by GUC students, AclProject has become a leader in travel meta-search engines. Our mission at AclProject is to empower you to make confident decisions when purchasing flights. We provide you the best airfares derived from the analysis of recent and historical travel data.

Our team of travel experts curates the best deals on flights from around the world, focusing on getting you the best fare deal. You can sign up for fare alerts and be notified instantly when your itinerary price drops. You will also find the latest in travel news, advice and tips updated daily on our blog.</strong>

          <br />
          {/* <h1 style={{ textAlign: "center", margin: "auto", color: "gray", fontSize: "5px" }}>────────────────────────────────────────────────────────────────────────────────────────────────</h1> */}
          <br />
        </div>
        <br />
        <br />
      </div >
    );
  }
}

export default AboutUs;