import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
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
import Button from '@mui/material/Button';
import StepLabel from '@mui/material/StepLabel';
import { styled } from '@mui/material/styles';
import jwt from 'jsonwebtoken'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Link } from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout';

var numberOfDepartureSeats
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
for (var ii = 0; ii < myArray5.length; ii++) {
  if (ii < 20) {
    arr2 = arr2 + "/" + myArray5[ii];
  }
}

var previousPage = (arr2).replace("/reservation-summary", "seats-selection-return");

var ppp;
var arr3 = "";
for (var ii = 0; ii < myArray5.length; ii++) {
  if (ii < 9) {
    arr3 = arr3 + "/" + myArray5[ii];
  }
}

var previousPage2 = (arr3).replace("/reservation-summary", "select-flights");

const steps = [
  <Link to={previousPage2}>Select departure and return flights</Link>,
  <Link to={previousPage}>Select plane seats</Link>,
  'Summary and confirmation',
];

class ChangeFlightSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departureFlight: '',
      LoggedInUser: jwt.decode(localStorage.getItem('token')),
      numberOfDepartureSeats: myArray3[4],
      priceDeparture: 0
    };
  }

  componentDidMount() {

    const myArray = (window.location.pathname).split("/");

    // const departureData = {
    //   departure_airport: myArray[2].replace(/%20/g, " "),
    //   arrival_airport: myArray[3].replace(/%20/g, " "),
    //   departure_date: myArray[4],
    // };


    axios
      .get('http://localhost:8082/api/flights/' + myArray[14])
      .then(res => {
        this.setState({
          departureFlight: res.data
        })
      })
      .catch(err => {
        console.log('Error from ShowFlightList');
      })
  };

  onToken = e => {

    const booking_r = Math.floor(Math.pow(10, 9) + Math.random() * 9 * Math.pow(10, 9));

    if (jwt.decode(localStorage.getItem('token')) === null) {
      window.location.href = "http://localhost:3000/not-authorized";
    }

    const myArray = (window.location.pathname).split("/");
    const selectedCabin = myArray[13]

    const departureData = {
      username: this.state.LoggedInUser.username,
      flight_number: this.state.departureFlight.flight_number,
      flight_id: this.state.departureFlight._id,
      seats_booked: myArray[20],
      cabin: selectedCabin,
      price: this.state.priceDeparture,
      booking_reference: booking_r + myArray[11]
    };

    var newBookedSeatsDeparture;
    numberOfDepartureSeats = (myArray[20].split("-").length - 1) + 1
    var numberOfAvailableDEconomySeatsAfterBooking;
    var numberOfAvailableDBusinessSeatsAfterBooking;
    var numberOfAvailableDFirstSeatsAfterBooking;
    var numberOfAvailableREconomySeatsAfterBooking;
    var numberOfAvailableRBusinessSeatsAfterBooking;
    var numberOfAvailableRFirstSeatsAfterBooking;
    console.log(numberOfDepartureSeats)

    if (selectedCabin === "Economy") {
      numberOfAvailableDEconomySeatsAfterBooking = this.state.departureFlight.available_economy_seats - numberOfDepartureSeats;
      numberOfAvailableDBusinessSeatsAfterBooking = this.state.departureFlight.available_business_seats
      numberOfAvailableDFirstSeatsAfterBooking = this.state.departureFlight.available_first_seats
    }
    else if (selectedCabin === "Business") {
      numberOfAvailableDBusinessSeatsAfterBooking = this.state.departureFlight.available_business_seats - numberOfDepartureSeats;
      numberOfAvailableDEconomySeatsAfterBooking = this.state.departureFlight.available_economy_seats;
      numberOfAvailableDFirstSeatsAfterBooking = this.state.departureFlight.available_first_seats
    }
    else if (selectedCabin === "First") {
      numberOfAvailableDBusinessSeatsAfterBooking = this.state.departureFlight.available_business_seats;
      numberOfAvailableDEconomySeatsAfterBooking = this.state.departureFlight.available_economy_seats;
      numberOfAvailableDFirstSeatsAfterBooking = this.state.departureFlight.available_first_seats - numberOfDepartureSeats;
    }


    if (myArray[18] !== "undefined") {
      if (myArray[6] === this.state.departureFlight._id){
        newBookedSeatsDeparture = myArray[9] + "-" + departureData.seats_booked
      }
      else {
        newBookedSeatsDeparture = myArray[18] + "-" + departureData.seats_booked
      }
    }
    else {
      newBookedSeatsDeparture = departureData.seats_booked
    }

    axios
      .delete('http://localhost:8082/api/userflights/' + myArray[5])
      .then(res => {
      })
      .catch(err => {
        console.log("Error form ShowFlightDetails_deleteClick");
      });

    axios
      .post('http://localhost:8082/api/userflights/reserve', departureData)
      .then(res => {
      })
      .catch(err => {
        console.log("Error in Login!");
      })

    axios
      .put('http://localhost:8082/api/flights/' + myArray[6], { booked_seats: myArray[9] })
      .then(res => {
      })
      .catch(err => {
        console.log("Error in UpdateFlightInfo!");
      })

    axios
      .put('http://localhost:8082/api/flights/' + this.state.departureFlight._id, { booked_seats: newBookedSeatsDeparture, available_economy_seats: numberOfAvailableDEconomySeatsAfterBooking, available_business_seats: numberOfAvailableDBusinessSeatsAfterBooking, available_first_seats: numberOfAvailableDFirstSeatsAfterBooking })
      .then(res => {
        this.props.history.push('/flight-reserved');
      })
      .catch(err => {
        console.log("Error in UpdateFlightInfo!");
      })
  };


  render() {
    const myArray = (window.location.pathname).split("/");
    const selectedCabin = myArray[13]

    var selectedBaggageAllowanceDeparture;
    var selectedPriceDeparture;
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
    if (selectedCabin === 'Economy') {
      selectedBaggageAllowanceDeparture = this.state.departureFlight.baggage_allowance_economy
      selectedPriceDeparture = this.state.departureFlight.price_economy
    }
    else if (selectedCabin === 'Business') {
      selectedBaggageAllowanceDeparture = this.state.departureFlight.baggage_allowance_business
      selectedPriceDeparture = this.state.departureFlight.price_business
    }
    else if (selectedCabin === 'First') {
      selectedBaggageAllowanceDeparture = this.state.departureFlight.baggage_allowance_first
      selectedPriceDeparture = this.state.departureFlight.price_first
    }
    var totalPrice = (parseInt(((window.location.pathname).split("/"))[19]) * this.state.numberOfDepartureSeats)
    this.state.priceDeparture = (parseInt(selectedPriceDeparture) * this.state.numberOfDepartureSeats);


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
        <br />
        <br />
        <div className="backgroundLabelRS">
          <b>Changed Flight</b>
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
                <StyledTableCell align="center">Price Difference</StyledTableCell>
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
                <StyledTableCell align="center">{myArray[20]}</StyledTableCell>
                <StyledTableCell align="center">{selectedBaggageAllowanceDeparture}</StyledTableCell>
                <StyledTableCell align="center">{myArray[19]}LE</StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <br />
        <br />
        {((myArray[19].charAt(0) === '-')) ? (
          <div className="backgroundLabelTotal">
            <b>You will be refunded = {String(totalPrice).substring(1)}LE</b>
          </div>
        ) : (
          <div className="backgroundLabelTotal">
            <b>Total Price Difference = {totalPrice}LE</b>
          </div>
        )}
        <br />
        <br />
        {((myArray[19].charAt(0) === '-')) ? (
          <Button color="success" onClick={this.onToken} variant="contained">
            Confirm
          </Button>
        ) : (
          <StripeCheckout
            amount={parseInt(totalPrice) * 100}
            currency="EGP"
            description="Roundtrip ticket"
            image={require('../logo.svg').default}
            locale="auto"
            name="AclProject"
            email={this.state.LoggedInUser.email}
            token={this.onToken}
            stripeKey="pk_test_51K6u4OGxGwnu0rJwX9bgwFSvMrTcivqO65wFVtfyNCX55gq0Idy4mq15RjSdRv9KTRhBx1DuYdq9mKuFQyATyrkB003DSAH9Yk"
            billingAddress={false}
            shippingAddress={false}>
            <Button style={{height:"60px", width:"200px", fontSize:"23px", fontWeight:"bold"}}variant="contained">Pay By Card</Button>
          </StripeCheckout>
        )}

        <br />
        <br />
      </div>
    );
  }
}

export default ChangeFlightSummary;