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
import Alert from '@mui/material/Alert';

const airports = require('../airports.json');

const numberOfAdults = [1, 2, 3, 4, 5];
const numberOfChildreen = [0, 1, 2, 3, 4, 5];
var emptyField = 'false';

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
    emptyField = 'false'
    this.forceUpdate()
  };

  onChangeDepartureDate = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.departure_date = e.target.value
    emptyField = 'false'
    this.forceUpdate()
  };

  onChangeReturnDate = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.state.return_date = e.target.value
    emptyField = 'false'
    this.forceUpdate()
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

    if (this.state.departure_airport === '' || this.state.arrival_airport === '' || this.state.return_date === '' || this.state.adults_number === '' || this.state.children_number === '' || this.state.cabin === '' || this.state.departure_airport === null || this.state.arrival_airport === null || this.state.return_date === null || this.state.adults_number === null || this.state.children_number === null || this.state.cabin === null){
      emptyField = 'true';
      this.forceUpdate()
    }

    else {
    axios
      .get('http://localhost:8082/api/flights/', data)
      .then(res => {
        console.log(data.departure_airport + '/' + data.arrival_airport + '/' + data.departure_date + '/' + data.return_date + '/' + data.adults_number + '/' + data.children_number + '/' + data.cabin)
        this.props.history.push('/select-flights/' + data.departure_airport + '/' + data.arrival_airport + '/' + data.departure_date + '/' + data.return_date + '/' + data.adults_number + '/' + data.children_number + '/' + data.cabin);
      })
      .catch(err => {
        console.log("Error in CreateFlight!");
      })
    }
  };


  render() {
    return (

      <div className="Homepage">
        <div className="container-fluid">
          <br />
          <br />
          <b style={{
            fontSize: "50px"
          }}>Search, Compare & Reserve Your Tickets</b>
          <br />
          <form noValidate onSubmit={this.onSubmit}>
          <br />
          {((emptyField === 'true')) ? (
          <Alert variant="filled" style={{
            width: "500px",
            margin: "auto",
            marginTop: "-12px",
            marginBottom: "-12px"
          }}severity="error">All fields must be filled</Alert>
        ) : (
          <br />
        )}
                <br />
            <div class="HomepageRow">
              <Autocomplete
                style={{
                  width: "280px",
                  margin: "auto",
                  backgroundColor: "white"
                }}
                id="size-large-filled"
                size="large"
                options={airports}
                getOptionLabel={(option) => option}
                onChange={(ev, value) => {
                  this.state.departure_airport = value;
                  emptyField = 'false';
                  this.forceUpdate()
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
              <Autocomplete
                style={{
                  width: "280px",
                  margin: "auto",
                  backgroundColor: "white"
                }}
                id="size-large-filled"
                size="large"
                options={airports}
                getOptionLabel={(option) => option}
                onChange={(ev, value) => {
                  this.state.arrival_airport = value;
                  emptyField = 'false';
                  this.forceUpdate()
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

              <TextField
                style={{
                  width: "200px",
                  margin: "auto",
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
                  margin: "auto",
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

              <Autocomplete
                style={{
                  top: "267px",
                  width: "120px",
                  margin: "auto",
                  backgroundColor: "white"
                }}
                id="size-large-filled"
                size="large"
                options={numberOfAdults}
                getOptionLabel={(option) => option}
                defaultValue="1"
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

              <Autocomplete
                style={{
                  top: "267px",
                  width: "120px",
                  margin: "auto",
                  backgroundColor: "white"
                }}
                id="size-large-filled"
                size="large"
                options={numberOfChildreen}
                defaultValue="0"
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

            <div className="HomepageRadioButtons1">
              <div className="HomepageRadioButtons2">
                <RadioGroup row aria-label="Cabin" onChange={this.onChange2} name="row-radio-buttons-group">
                  <FormControlLabel value="Economy" control={<Radio />} label="Economy" />
                  <FormControlLabel value="Business" control={<Radio />} label="Business" />
                  <FormControlLabel value="First" control={<Radio />} label="First" />
                </RadioGroup>
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