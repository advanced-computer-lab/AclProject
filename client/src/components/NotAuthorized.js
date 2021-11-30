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
      <div className="Login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <br />
            </div>
            <div className="col-md-8 m-auto">
              <div className="backgroundLabel3">
                <div className="Label1">
                  <b style={{
                    position: "absolute",
                    fontSize: "40px",
                    marginTop: "-15px",
                    marginLeft: "-141px"
                  }}>Not Authorized</b>
                </div>
              </div>
              <div className="backgroundBox3">
                <h1 style={{ color: 'red', fontWeight: 'bold'}} className="display-4 text-center">You are not authorized to access this page. Please Log in</h1>
                <Button href="/login" variant="contained">Click here to login</Button>
                <p className="lead text-center">
                </p>
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
    );
  }
}

export default NotAuthorized;