import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip'
import FlightIcon from '@mui/icons-material/Flight';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const airports = require('../airports.json');

const numberOfAdults = [1, 2, 3, 4, 5];
const numberOfChildreen = [0, 1, 2, 3, 4, 5];

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departure_airport: '',
      arrival_airport: '',
      departure_date: '',
      return_date: '',
      adults_number: 1,
      children_number: 0,
      cabin: ''
    };
  }

  onChange2 = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.cabin = e.target.value
  };

  onChangeDepartureDate = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.departure_date = e.target.value
  };

  onChangeReturnDate = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.return_date = e.target.value
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      departure_airport: this.state.departure_airport,
      arrival_airport: this.state.arrival_airport,
      departure_date: this.state.departure_date,
      return_date: this.state.return_date,
      adults_number: this.state.adults_number,
      children_number: this.state.children_number,
      cabin: this.state.cabin
    };



    axios
      .get('http://localhost:8082/api/flights/', data)
      .then(res => {
        console.log(data.departure_airport + '/' + data.arrival_airport + '/' + data.departure_date + '/' + data.return_date + '/' + data.adults_number + '/' + data.children_number + '/' + data.cabin)
        this.props.history.push('/select-flights/' + data.departure_airport + '/' + data.arrival_airport + '/' + data.departure_date + '/' + data.return_date + '/' + data.adults_number + '/' + data.children_number + '/' + data.cabin);
      })
      .catch(err => {
        console.log("Error in CreateFlight!");
      })
  };


  render() {
    return (

      <div className="Homepage">
        <div className="container-fluid">
          <br />
          <br />
          <br />
          <h1 className="display-4 text-center" >Search, Compare & Reserve Your Tickets</h1>
          <br />
          <p className="lead text-center">
          </p>
          <form noValidate onSubmit={this.onSubmit}>
          <div className="homepageItems">
            <div className="A1">

              <Autocomplete
                style={{
                  position: "absolute",
                  width: "280px",
                  backgroundColor: "white"
                }}
                id="size-large-filled"
                size="large"
                options={airports}
                getOptionLabel={(option) => option}
                onChange={(ev, value) => {
                  this.state.departure_airport = value
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={value}
                      size="large"
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    label="Depart from"
                    placeholder="Airport"
                  />
                )}
              />
            </div>
            <div className="A2">
              <Autocomplete
                style={{
                  position: "absolute",
                  width: "280px",
                  backgroundColor: "white"
                }}
                id="size-large-filled"
                size="large"
                options={airports}
                getOptionLabel={(option) => option}
                onChange={(ev, value) => {
                  this.state.arrival_airport = value
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      size="large"
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    label="Destination"
                    placeholder="Airport"
                  />
                )}
              />
            </div>

            <div className="A3">
              <TextField
                style={{
                  width: "200px",
                  backgroundColor: "white",
                }}
                id="filled-textarea"
                label="Depart Date"
                type="date"
                onFocus={this._onFocus} onBlur={this._onBlur}
                placeholder=""
                variant="filled"
                //value={this.state.departure_date}
                onChange={this.onChangeDepartureDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                style={{
                  width: "200px",
                  backgroundColor: "white"
                }}
                id="filled-textarea"
                label="Return Date"
                type="date"
                onFocus={this._onFocus} onBlur={this._onBlur}
                placeholder=""
                variant="filled"
                onChange={this.onChangeReturnDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>


            <div className="A6">

              <Autocomplete
                style={{
                  top: "267px",
                  position: "absolute",
                  width: "120px",
                  backgroundColor: "white"
                }}
                id="size-large-filled"
                size="large"
                options={numberOfAdults}
                getOptionLabel={(option) => option}
                defaultValue= "1"
                onChange={(ev, value) => {
                  this.state.adults_number = value
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={value}
                      size="large"
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    label="# of Adults"
                    placeholder=""
                  />
                )}
              />
            </div>


            <div className="A7">

              <Autocomplete
                style={{
                  top: "267px",
                  position: "absolute",
                  width: "120px",
                  backgroundColor: "white"
                }}
                id="size-large-filled"
                size="large"
                options={numberOfChildreen}
                defaultValue= "0"
                getOptionLabel={(option) => option}
                onChange={(ev, value) => {
                  this.state.children_number = value
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={value}
                      size="large"
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    label="# of Children"
                    placeholder=""
                  />
                )}
              />
            </div>

            <div className="A4">
              <div className="A5">
                <RadioGroup row aria-label="Cabin" onChange={this.onChange2} name="row-radio-buttons-group">
                  <FormControlLabel  value="Economy" control={<Radio />} label="Economy" />
                  <FormControlLabel value="Business" control={<Radio />} label="Business" />
                  <FormControlLabel value="First" control={<Radio />} label="First" />
                </RadioGroup>
              </div>
            </div>
            </div>
            <br />
            <Button type="submit" variant="contained" startIcon={<FlightIcon />}>
              Find Flights
            </Button>
            
          </form>
          <br />
          <br />
        </div>
        </div>
    );
  }
}

export default Homepage;