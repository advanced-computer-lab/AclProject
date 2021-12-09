import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { styled } from '@mui/material/styles';
import jwt from 'jsonwebtoken'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom'

var numberOfDepartureSeats
var numberOfReturnSeats;
const myArray3 = (window.location.pathname).split("/");

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const myArray5 = (window.location.pathname).split("/");
var pp;
var arr2 = "";
for (var ii = 0; ii < myArray5.length; ii++){
    if (ii < 20){
        arr2 = arr2 + "/" + myArray5[ii];
    }
}

var previousPage = (arr2).replace("/reservation-summary", "seats-selection-return");

var ppp;
var arr3 = "";
for (var ii = 0; ii < myArray5.length; ii++){
    if (ii < 9){
        arr3 = arr3 + "/" + myArray5[ii];
    }
}

var previousPage2 = (arr3).replace("/reservation-summary", "select-flights");

const steps = [
    <Link to={previousPage2}>Select departure and return flights</Link>,
  <Link to={previousPage}>Select plane seats</Link>,
  'Summary and confirmation',
];

class ReservationSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departureFlight: '',
      returnFlight: '',
      LoggedInUser: jwt.decode(localStorage.getItem('token')),
      numberOfDepartureSeats: (myArray3[19].split("-").length - 1) + 1,
    numberOfReturnSeats: (myArray3[20].split("-").length - 1) + 1
    };
  }

  componentDidMount() {

    const myArray = (window.location.pathname).split("/");

    const departureData = {
      departure_airport: myArray[2].replace(/%20/g, " "),
      arrival_airport: myArray[3].replace(/%20/g, " "),
      departure_date: myArray[4],
    };

    const returnData = {
      departure_airport: myArray[3].replace(/%20/g, " "),
      arrival_airport: myArray[2].replace(/%20/g, " "),
      departure_date: myArray[5],
    };


    axios
      .get('http://localhost:8082/api/flights/'+ myArray[9])
      .then(res => {
        this.setState({
          departureFlight: res.data
        })
      })
      .catch(err => {
        console.log('Error from ShowFlightList');
      })


    axios
    .get('http://localhost:8082/api/flights/'+ myArray[10])
      .then(res => {
        this.setState({
          returnFlight: res.data
        })
      })
      .catch(err => {
        console.log('Error from ShowFlightList');
      })
  };

  onSubmit = e => {
    
    if (jwt.decode(localStorage.getItem('token')) === null) {
      window.location.href = "http://localhost:3000/not-authorized";
    }

    const myArray = (window.location.pathname).split("/");
    const selectedCabin = myArray[8]
    e.preventDefault();

    const departureData = {
      username: this.state.LoggedInUser.username,
      flight_number: this.state.departureFlight.flight_number,
      flight_id: this.state.departureFlight._id,
      seats_booked: myArray[19]
    };

    const returnData = {
      username: this.state.LoggedInUser.username,
      flight_number: this.state.returnFlight.flight_number,
      flight_id: this.state.returnFlight._id,
      seats_booked: myArray[20]
    };

    var newBookedSeatsDeparture;
    var newBookedSeatsReturn;
    numberOfDepartureSeats = (myArray[19].split("-").length - 1) + 1
    numberOfReturnSeats = (myArray[20].split("-").length - 1) + 1
    var numberOfAvailableDEconomySeatsAfterBooking;
    var numberOfAvailableDBusinessSeatsAfterBooking;
    var numberOfAvailableDFirstSeatsAfterBooking;
    var numberOfAvailableREconomySeatsAfterBooking;
    var numberOfAvailableRBusinessSeatsAfterBooking;
    var numberOfAvailableRFirstSeatsAfterBooking;
    console.log(numberOfDepartureSeats)

    if (selectedCabin === "Economy") {
      numberOfAvailableDEconomySeatsAfterBooking = this.state.departureFlight.available_economy_seats - numberOfDepartureSeats;
      numberOfAvailableREconomySeatsAfterBooking = this.state.returnFlight.available_economy_seats - numberOfReturnSeats;
      numberOfAvailableDBusinessSeatsAfterBooking = this.state.departureFlight.available_business_seats
      numberOfAvailableRBusinessSeatsAfterBooking = this.state.returnFlight.available_business_seats
      numberOfAvailableDFirstSeatsAfterBooking = this.state.departureFlight.available_first_seats
      numberOfAvailableRFirstSeatsAfterBooking = this.state.returnFlight.available_first_seats
    }
    else if (selectedCabin === "Business") {
      numberOfAvailableDBusinessSeatsAfterBooking = this.state.departureFlight.available_business_seats - numberOfDepartureSeats;
      numberOfAvailableRBusinessSeatsAfterBooking = this.state.returnFlight.available_business_seats - numberOfReturnSeats;
      numberOfAvailableDEconomySeatsAfterBooking = this.state.departureFlight.available_economy_seats;
      numberOfAvailableREconomySeatsAfterBooking = this.state.returnFlight.available_economy_seats;
      numberOfAvailableDFirstSeatsAfterBooking = this.state.departureFlight.available_first_seats
      numberOfAvailableRFirstSeatsAfterBooking = this.state.returnFlight.available_first_seats
    }
    else if (selectedCabin === "First") {
      numberOfAvailableDBusinessSeatsAfterBooking = this.state.departureFlight.available_business_seats;
      numberOfAvailableRBusinessSeatsAfterBooking = this.state.returnFlight.available_business_seats;
      numberOfAvailableDEconomySeatsAfterBooking = this.state.departureFlight.available_economy_seats;
      numberOfAvailableREconomySeatsAfterBooking = this.state.returnFlight.available_economy_seats;
      numberOfAvailableDFirstSeatsAfterBooking = this.state.departureFlight.available_first_seats - numberOfDepartureSeats;
      numberOfAvailableRFirstSeatsAfterBooking = this.state.returnFlight.available_first_seats - numberOfReturnSeats;
    }


    if (myArray[17] !== "undefined") {
      newBookedSeatsDeparture = myArray[17] + "-" + departureData.seats_booked
    }
    else {
      newBookedSeatsDeparture = departureData.seats_booked
    }

    if (myArray[18] !== "undefined") {
      newBookedSeatsReturn = myArray[18] + "-" + returnData.seats_booked
    }
    else {
      newBookedSeatsReturn = returnData.seats_booked
    }

    confirmAlert({
      title: 'Confirmation',
      message: 'Are you sure that you want to reserve these flight tickets?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            axios
              .post('http://localhost:8082/api/userflights/reserve', departureData)
              .then(res => {
              })
              .catch(err => {
                console.log("Error in Login!");
              })

            axios
              .post('http://localhost:8082/api/userflights/reserve', returnData)
              .then(res => {
              })
              .catch(err => {
                console.log("Error in Login!");
              })

            axios
              .put('http://localhost:8082/api/flights/' + this.state.departureFlight._id, { booked_seats: newBookedSeatsDeparture, available_economy_seats: numberOfAvailableDEconomySeatsAfterBooking, available_business_seats: numberOfAvailableDBusinessSeatsAfterBooking, available_first_seats: numberOfAvailableDFirstSeatsAfterBooking })
              .then(res => {
              })
              .catch(err => {
                console.log("Error in UpdateFlightInfo!");
              })

            axios
              .put('http://localhost:8082/api/flights/' + this.state.returnFlight._id, { booked_seats: newBookedSeatsReturn, available_economy_seats: numberOfAvailableREconomySeatsAfterBooking, available_business_seats: numberOfAvailableRBusinessSeatsAfterBooking, available_first_seats: numberOfAvailableRFirstSeatsAfterBooking })
              .then(res => {
                this.props.history.push('/flight-reserved');
              })
              .catch(err => {
                console.log("Error in UpdateFlightInfo!");
              })
          }

        },
        {
          label: 'No',
        }
      ]
    });
  };




  render() {
    const myArray = (window.location.pathname).split("/");
    const selectedCabin = myArray[8]

    var selectedBaggageAllowanceDeparture;
    var selectedBaggageAllowanceReturn;
    var selectedPriceDeparture;
    var selectedPriceReturn;
    var depDate1;
    var arrDate1;
    var depDate2;
    var arrDate2;
    if (this.state.departureFlight.departure_date !== undefined) {
      depDate1 = this.state.departureFlight.departure_date.substring(0, 10)
    }
    if (this.state.departureFlight.arrival_date !== undefined) {
      arrDate1 = this.state.departureFlight.arrival_date.substring(0, 10)
    }
    if (this.state.returnFlight.departure_date !== undefined) {
      depDate2 = this.state.returnFlight.departure_date.substring(0, 10)
    }
    if (this.state.returnFlight.arrival_date !== undefined) {
      arrDate2 = this.state.returnFlight.arrival_date.substring(0, 10)
    }
    if (selectedCabin === 'Economy') {
      selectedBaggageAllowanceDeparture = this.state.departureFlight.baggage_allowance_economy
      selectedBaggageAllowanceReturn = this.state.returnFlight.baggage_allowance_economy
      selectedPriceDeparture = this.state.departureFlight.price_economy
      selectedPriceReturn = this.state.returnFlight.price_economy
    }
    else if (selectedCabin === 'Business') {
      selectedBaggageAllowanceDeparture = this.state.departureFlight.baggage_allowance_business
      selectedBaggageAllowanceReturn = this.state.returnFlight.baggage_allowance_business
      selectedPriceDeparture = this.state.departureFlight.price_business
      selectedPriceReturn = this.state.returnFlight.price_business
    }
    else if (selectedCabin === 'First') {
      selectedBaggageAllowanceDeparture = this.state.departureFlight.baggage_allowance_first
      selectedBaggageAllowanceReturn = this.state.returnFlight.baggage_allowance_first
      selectedPriceDeparture = this.state.departureFlight.price_first
      selectedPriceReturn = this.state.returnFlight.price_first
    }
    var totalPrice = (parseInt(selectedPriceDeparture) * this.state.numberOfDepartureSeats) + (parseInt(selectedPriceReturn) * this.state.numberOfReturnSeats)


    return (
      <div className="ReservationSummary">
        <br />
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={2} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <br />
        <br />
        <div className="backgroundLabelRS">
          <b>Departure Flight</b>
        </div>

        <TableContainer style={{ width: "1200px", margin: "auto" }} component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Flight Number</StyledTableCell>
                <StyledTableCell align="center">From</StyledTableCell>
                <StyledTableCell align="center">To</StyledTableCell>
                <StyledTableCell align="center">Departure Date/Time</StyledTableCell>
                <StyledTableCell align="center">Arrival Date/Time</StyledTableCell>
                <StyledTableCell align="center">Cabin</StyledTableCell>
                <StyledTableCell align="center">Seats</StyledTableCell>
                <StyledTableCell align="center">Baggage Allowance</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              <StyledTableRow key={this.state.departureFlight._id}>
                <StyledTableCell align="center" component="th" scope="row">{this.state.departureFlight.flight_number}</StyledTableCell>
                <StyledTableCell align="center">{this.state.departureFlight.departure_airport}</StyledTableCell>
                <StyledTableCell align="center">{this.state.departureFlight.arrival_airport}</StyledTableCell>
                <StyledTableCell align="center">{depDate1} | {this.state.departureFlight.departure_time}</StyledTableCell>
                <StyledTableCell align="center">{arrDate1} | {this.state.departureFlight.arrival_time}</StyledTableCell>
                <StyledTableCell align="center">{selectedCabin}</StyledTableCell>
                <StyledTableCell align="center">{myArray[19]}</StyledTableCell>
                <StyledTableCell align="center">{selectedBaggageAllowanceDeparture}</StyledTableCell>
                <StyledTableCell align="center">{selectedPriceDeparture}LE</StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <br />
        <br />

        <div className="backgroundLabelRS">
          <b>Return Flight</b>
        </div>

        <TableContainer style={{ width: "1200px", margin: "auto" }} component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Flight Number</StyledTableCell>
                <StyledTableCell align="center">From</StyledTableCell>
                <StyledTableCell align="center">To</StyledTableCell>
                <StyledTableCell align="center">Departure Date/Time</StyledTableCell>
                <StyledTableCell align="center">Arrival Date/Time</StyledTableCell>
                <StyledTableCell align="center">Cabin</StyledTableCell>
                <StyledTableCell align="center">Seats</StyledTableCell>
                <StyledTableCell align="center">Baggage Allowance</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              <StyledTableRow key={this.state.returnFlight._id}>
                <StyledTableCell align="center" component="th" scope="row">{this.state.returnFlight.flight_number}</StyledTableCell>
                <StyledTableCell align="center">{this.state.returnFlight.departure_airport}</StyledTableCell>
                <StyledTableCell align="center">{this.state.returnFlight.arrival_airport}</StyledTableCell>
                <StyledTableCell align="center">{depDate2} | {this.state.returnFlight.departure_time}</StyledTableCell>
                <StyledTableCell align="center">{arrDate2} | {this.state.returnFlight.arrival_time}</StyledTableCell>
                <StyledTableCell align="center">{selectedCabin}</StyledTableCell>
                <StyledTableCell align="center">{myArray[20]}</StyledTableCell>
                <StyledTableCell align="center">{selectedBaggageAllowanceReturn}</StyledTableCell>
                <StyledTableCell align="center">{selectedPriceReturn}LE</StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <br />
        <div className="backgroundLabelTotal">
          <b>Total Price = {totalPrice}LE</b>
        </div>
        <br />
        <form noValidate onSubmit={this.onSubmit}>
          <Button
            type="submit"
            style={{
              width: "200px",
              height: "60px",
            }} variant="contained">Book Tickets</Button>
          <br />
          <br />
        </form>
      </div>
    );
  }
}

export default ReservationSummary;