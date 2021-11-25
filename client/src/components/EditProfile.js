import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

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
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('http://localhost:8082/api/flights/'+this.props.match.params.id)
      .then(res => {
        // this.setState({...this.state, flight: res.data})
        this.setState({
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          email: res.data.email,
          passport: res.data.passport
        })
      })
      .catch(err => {
        console.log("Error from UpdateFlightInfo");
      })
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
      .put('http://localhost:8082/api/flights/'+this.props.match.params.id, data)
      .then(res => {
        this.props.history.push('/admin-show-flight/'+this.props.match.params.id);
      })
      .catch(err => {
        console.log("Error in UpdateFlightInfo!");
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