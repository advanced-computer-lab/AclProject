import React, { Component } from 'react';
import '../App.css';
import Button from '@mui/material/Button';

class NotAuthorized extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }


  render() {
    return (
      <div className="NotAuthorized">
        <br/>
        <br/>
        <div className="backgroundLabelNA">
                  <b>Not Authorized</b>
                </div>
              <div className="backgroundBoxNA">
              
                <h1 style={{ color: 'red', fontWeight: 'bold' }} className="display-4 text-center">You are not authorized to access this page. Please Log in</h1>
                <Button href="/login" variant="contained">Click here to login</Button>
                <p className="lead text-center">
                </p>
          <br />
          </div>
      </div>
    );
  }
}

export default NotAuthorized;