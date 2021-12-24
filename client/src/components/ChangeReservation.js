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
import jwt from 'jsonwebtoken';

var airports = window.location.pathname;
var pathlist = [];
var td = new Date();
var today = td.getFullYear() + '-' + (td.getMonth() + 1) + '-' + td.getDate();
var emptyField = 'false';
class ChangeReservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrival_airport: '',
      departure_airport: '',
      departure_date: '',
      adults_number: 1,
      children_number: 0,
      cabin: '',
      selectedFlight: '',
      LoggedInUser: jwt.decode(localStorage.getItem('token'))
    };
  }

  componentDidMount() {
    airports = (airports).replace("/change-reservation/", "")
    pathlist = airports.split('/');
    console.log(pathlist)
    this.setState({
      departure_airport: (pathlist[0]).replaceAll("%20", " "),
      arrival_airport: (pathlist[1]).replaceAll("%20", " "),
      adults_number: pathlist[2]
    });

    axios
      .put('http://localhost:8082/api/flights/search', { _id: ((window.location.pathname).split("/"))[7] })
      .then(res => {
        this.setState({
          selectedFlight: res.data[0]
        })
        console.log("aa " + this.state.selectedFlight.business_seats_number)
      })
      .catch(err => {
        console.log('Error from ShowFlightList');
      })

  };

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

  onSubmit = e => {
    e.preventDefault();
    const data = {
      departure_airport: this.state.departure_airport,
      arrival_airport: this.state.arrival_airport,
      departure_date: this.state.departure_date,
      adults_number: this.state.adults_number,
      children_number: this.state.children_number,
      cabin: this.state.cabin
    };

    if (this.state.cabin === '' || this.state.departure_airport === null || this.state.arrival_airport === null || this.state.adults_number === null || this.state.children_number === null || this.state.cabin === null) {
      emptyField = 'true';
      this.forceUpdate()
    }

    else {
      axios
        .get('http://localhost:8082/api/flights/', data)
        .then(res => {
          let result = (window.location.pathname).replace("change-reservation", "change-flight");
          window.location.assign(result + "/" + data.departure_date + '/' + data.cabin);
        })
        .catch(err => {
          console.log("Error in FindFlight!");
        })
    }
  };

  render() {

    return (

      <div className="changeReservation">
        <br />
        <br />
        <br />
        <div className="backgroundLabelChangeReservation">
          <b>Change Reservation</b>
        </div>
        <div className="backgroundBoxChangeReservation">
        <br />
          <b style={{
            fontSize: "35px",
            color: "black"
          }}>Search For Alternative Flight</b>
          <form noValidate onSubmit={this.onSubmit}>
            <br />
            {((emptyField === 'true')) ? (
              <Alert variant="filled" style={{
                width: "500px",
                height: "45px",
                margin: "auto",
                marginTop: "-23px",
                marginBottom: "8px"
              }} severity="error">All fields must be filled</Alert>
            ) : (
              <div />
            )}
            <div class="HomepageRow">
              <div className="together">
                <TextField
                  style={{
                    width: "330px",
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
              </div>
            </div>

            <div className="HomepageRadioButtons-2">
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
      </div>
    );
  }
}

export default ChangeReservation;