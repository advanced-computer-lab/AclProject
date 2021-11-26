import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import jwt from 'jsonwebtoken';

const token = localStorage.getItem('token');
const user = jwt.decode(token);


class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      passport: ''
    };
  }

  componentDidMount() {
  
    axios
      .get('http://localhost:8082/api/users')
      .then(res => {
        var data = {};
        for (var i = 0; i < res.data.length; i++) {
          if(res.data[i].username == user.username){
            data = res.data[i];
            break;
        }
      }
        
        this.setState({
          id: data.id,
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

  onSubmit = e => {
    e.preventDefault();

    const data = {
      id: this.state.id,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      passport: this.state.passport
      
    };

    axios
      .put('http://localhost:8082/api/users', data)
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
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/Profile" className="btn btn-outline-warning float-left">
                  Profile
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Profile</h1>
              <p className="lead text-center">
                  Update Your Info
              </p>
            </div>
          </div>

          <div className="col-md-8 m-auto">
          <form noValidate onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label htmlFor="firstname">First Name</label>
              <input
                type='text'
                placeholder='First Name'
                name='firstname'
                className='form-control'
                value={this.state.firstname}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="lastname">Last Name</label>
              <input
                type='text'
                placeholder='Last Name'
                name='lastname'
                className='form-control'
                value={this.state.lastname}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="email">Email </label>
              <input
                type='text'
                placeholder='Email'
                name='email'
                className='form-control'
                value={this.state.email}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="passport">Passport Number</label>
              <input
                type='text'
                placeholder='Passport Number'
                name='passport'
                className='form-control'
                value={this.state.passport}
                onChange={this.onChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update</button>
            </form>
          </div>
		  <br />

        </div>
      </div>
    );
  }
}

export default EditProfile;