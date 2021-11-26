import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import jwt from 'jsonwebtoken'

localStorage.removeItem('token');

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      username: this.state.username,
      password: this.state.password,
    };
	

    axios
      .post('http://localhost:8082/api/users/login', data)
      .then(res => {
        localStorage.setItem('token', res.data)
        const user = jwt.decode(localStorage.getItem('token'))
        if(user.username === 'Administrator'){
          this.props.history.push('/admin-show-flight-list/');
        }
        else {
          this.props.history.push('/show-flight-list/');
        }
		})
      .catch(err => {
        console.log("Error in Login!");
      })
	};
	

  render() {
    return (
      <div className="Login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              
            </div>
            <div className="col-md-8 m-auto">
            
              <h1 className="display-4 text-center">Login</h1>
              <p className="lead text-center">
              
              </p>

              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Username'
                    name='username'
                    className='form-control'
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Password'
                    name='password'
                    className='form-control'
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>

                <button type="submit" class="btn btn-primary btn-lg btn-block">Login</button>
                
                <button onClick={event =>  window.location.href='/show-flight-list-guest'} type="button" class="btn btn-secondary btn-lg btn-block">Continue As A Guest</button>
                <br />
                <br />
                <button onClick={event =>  window.location.href='/registration'} type="button" class="btn btn-secondary btn-lg btn-block">Register</button>
              </form>
          </div>
          </div>
        </div>
		<br />
      </div>
    );
  }
}

export default Login;