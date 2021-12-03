import React, { Component } from 'react';
import '../App.css';
import Button from '@mui/material/Button';

class NotAuthorized extends Component {
  constructor() {
    super();
    this.state = {
    };
  }


  render() {
    return (
      <div className="NotAuthorized">
        <br/>
        <br/>
        <div className="backgroundLabelNA">
                  <b>Flight Reserved</b>
                </div>
              <div className="backgroundBoxNA">
              
                <h1 style={{ color: 'black', fontWeight: 'bold' }} className="display-4 text-center">Congratulations! You have reserved your tickets successfully</h1>
                <Button href="/" variant="contained">Back to homepage</Button>
                <p className="lead text-center">
                </p>
          <br />
          </div>
      </div>
    );
  }
}

export default NotAuthorized;