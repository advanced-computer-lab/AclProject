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
import l1 from '../l1.png';
import l2 from '../l2.jpg';
import l3 from '../l3.jpg';

var td = new Date();
var today = td.getFullYear() + '-' + (td.getMonth() + 1) + '-' + td.getDate();

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

    if (this.state.departure_airport === '' || this.state.arrival_airport === '' || this.state.return_date === '' || this.state.adults_number === '' || this.state.children_number === '' || this.state.cabin === '' || this.state.departure_airport === null || this.state.arrival_airport === null || this.state.return_date === null || this.state.adults_number === null || this.state.children_number === null || this.state.cabin === null) {
      emptyField = 'true';
      this.forceUpdate()
    }

    else {
      axios
        .get('http://localhost:8082/api/flights/', data)
        .then(res => {
          console.log(data.departure_airport + '/' + data.arrival_airport + '/' + data.departure_date + '/' + data.return_date + '/' + data.adults_number + '/' + data.children_number + '/' + data.cabin)
          window.location.assign('http://localhost:3000/select-flights/' + data.departure_airport + '/' + data.arrival_airport + '/' + data.departure_date + '/' + data.return_date + '/' + data.adults_number + '/' + data.children_number + '/' + data.cabin);
          //this.props.history.push('/select-flights/' + data.departure_airport + '/' + data.arrival_airport + '/' + data.departure_date + '/' + data.return_date + '/' + data.adults_number + '/' + data.children_number + '/' + data.cabin);
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
              }} severity="error">All fields must be filled</Alert>
            ) : (
              <br />
            )}
            <br />
            <div class="HomepageRow">
              <Autocomplete
                style={{
                  width: "330px",
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
                  width: "330px",
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

              <div className="together">
                <TextField
                  style={{
                    width: "165px",
                    margin: "auto",
                    backgroundColor: "white"
                  }}
                  id="filled-textarea"
                  label={"Depart Date"}
                  type="date"
                  InputProps={{ inputProps: { min: today } }}
                  onFocus={this._onFocus} onBlur={this._onBlur}
                  placeholder=""
                  variant="filled"
                  onChange={this.onChangeDepartureDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  style={{
                    width: "165px",
                    margin: "auto",
                    backgroundColor: "white"
                  }}
                  id="filled-textarea"
                  label="Return Date"
                  type="date"
                  InputProps={{ inputProps: { min: this.state.departure_date } }}
                  onFocus={this._onFocus} onBlur={this._onBlur}
                  placeholder=""
                  variant="filled"
                  onChange={this.onChangeReturnDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>

              <div className="together">
                <Autocomplete
                  style={{
                    width: "165px",
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
                    width: "165px",
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
            </div>

            <div className="HomepageRadioButtons">
              <RadioGroup row aria-label="Cabin" onChange={this.onChange2} name="row-radio-buttons-group">
                <FormControlLabel style={{ paddingLeft: '18px', paddingTop: '5px' }} value="Economy" control={<Radio />} label="Economy" />
                <FormControlLabel style={{ paddingTop: '5px' }} value="Business" control={<Radio />} label="Business" />
                <FormControlLabel style={{ paddingTop: '5px' }} value="First" control={<Radio />} label="First" />
              </RadioGroup>
            </div>

            <br />
            <Button type="submit" variant="contained" startIcon={<FlightIcon />}>
              Find Flights
            </Button>

          </form>
          <br />
          <br />
        </div>
        <br />
        <br />
        <br />
        <div class="image-container">
          <img src={l1} onClick={()=> window.open("show-flight-list", "_blank")} width="70%" height="275px" alt="fireSpot" />
        </div>
        <br />
        <br />
        <br />
        <h1 style={{ textAlign: "center", margin: "auto", color: "#1975d2", fontSize: "55px" }}>── Airline Flight Booking Tips ──</h1>
        <br />
        <br />
        <div style={{ borderTop: "2px solid #fff ", marginLeft: 20, marginRight: 20 }}></div>
        <br />
        <br />
        <div className="rectangleWrapper">
          <div className="togetheraa">
            <div className="rectangle1"> <img src={l2} height="250px" alt="fireSpot" /></div>
            <div className="rectangle11"> <b style={{ textAlign: "center", color: "#1975d2", fontSize: "25px"}}>How to Save</b> <br /><b style={{color: "black", fontSize: "18px" }}>We all want the cheapest flights possible! Learn how to find the cheapest days to fly and get the best deals on airfare.</b> <br /><Button target="_blank" href="https://www.cleartrip.com/collections/13-best-ways-save-flight-tickets/" style={{ marginLeft: "50%", textAlign: "center" }} variant="outlined">Learn more</Button></div>
          </div>
          <div className="togetheraa">
            <div className="rectangle2"> <img src={l3} height="250px" alt="fireSpot" /></div>
            <div className="rectangle22"> <b style={{ textAlign: "center", color: "#1975d2", fontSize: "25px"}}>Travel Tips & Advice</b> <br /><b style={{color: "black", fontSize: "18px" }}>Read the most up-to-date travel advice. Get tips from some of the most trusted experts in the industry.</b> <br /><br /><Button target="_blank" href="https://www.nomadicmatt.com/travel-blogs/61-travel-tips/" style={{ marginLeft: "50%", textAlign: "center" }} variant="outlined">Learn more</Button></div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default Homepage;