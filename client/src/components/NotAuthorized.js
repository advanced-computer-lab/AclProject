import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import jwt from 'jsonwebtoken'
import axios from 'axios';
const token = localStorage.getItem('token')

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
              
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">You are not authorized to access this page. Please Log in</h1>
              <Link to={`/`}>
                         Click here to login
                    </Link>
              <p className="lead text-center">
              </p>
          </div>
          </div>
        </div>
		<br />
      </div>
    );
  }
}

export default NotAuthorized;