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
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

var theSame = false;
var type;
var oldPrice = parseInt(((window.location.pathname).split("/"))[10]);

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

const steps = [
  'Select flight',
  'Select plane seats',
  'Summary and confirmation',
];

var selectedCabin = ((window.location.pathname).split("/"))[13]
var userflightID = ((window.location.pathname).split("/"))[8]
var selectedField;
var numberOfPassengers = parseInt(((window.location.pathname).split("/"))[4])

if (selectedCabin === 'Economy') {
  selectedField = 'price_economy'
}

else if (selectedCabin === 'Business') {
  selectedField = 'price_business'
}

else {
  selectedField = 'price_first'
}

const columns = [
  { field: 'flight_number', align: 'center', headerName: 'Flight Number', width: 120 },
  { field: 'departure_time', align: 'center', headerName: 'Departure Time', width: 130 },
  { field: 'arrival_time', align: 'center', headerName: 'Arrival Time', width: 110 },
  {
    field: 'trip_duration',
    headerName: 'Trip Duration',
    align: 'center',
    //type: 'number',
    width: 110,
  },
  {
    field: selectedField,
    headerName: 'Price (LE)',
    align: 'center',
    //type: 'number',
    width: 160,
  },
];

class ChangeFlight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departureFlights: [],
      departureFlights2: [],
      departureFlightID: '',
      selectedDepartureFlight: '',
      openModal1: false,
      openModal2: false,
      selectedPriceDeparture: '',
      priceD: '',
      priceDdisplayed: '',
      selectedBaggageAllowanceDeparture: '',
      selectedCabin: ''
    };
  }

  onChange1(x) {
    axios
      .put('http://localhost:8082/api/flights/search', { _id: x })
      .then(res => {
        this.setState({
          selectedDepartureFlight: res.data[0]
        })

        if (parseInt(this.state.selectedPriceDeparture) - parseInt(oldPrice) > 0) {
          type = "To pay per ticket";
        }
        else if (parseInt(this.state.selectedPriceDeparture) - parseInt(oldPrice) < 0) {
          type = "To be refunded per ticket";
        }
        else {
          type = "No price difference";
        }

      })
      .catch(err => {
        console.log('Error from ShowFlightList');
      })
    this.state.departureFlightID = x;
    this.forceUpdate()
  };


  onClickButton1 = e => {
    e.preventDefault()
    this.forceUpdate()
    this.setState({ openModal1: true })
  }

  onClickButton2 = e => {
    e.preventDefault()
    this.forceUpdate()
    this.setState({ openModal2: true })

  }

  onCloseModal1 = () => {
    this.setState({ openModal1: false })
  }

  onCloseModal2 = () => {
    this.setState({ openModal2: false })
  }

  componentDidMount() {

    const myArray = (window.location.pathname).split("/");
    const data = {
      flight_number: myArray[2],
      departure_airport: myArray[3].replace(/%20/g, " "),
      arrival_airport: myArray[4].replace(/%20/g, " "),
      departure_time: myArray[5],
      arrival_time: myArray[6],
      date: myArray[7],
      economy_seats_number: myArray[8],
      business_seats_number: myArray[9],
      first_seats_number: myArray[10],
      departureFlightID: this.state.departureFlightID
    };

    if (myArray[7] === myArray[13] && myArray[8] === myArray[12]) {
      console.log("THE SAME FLIGHT")
      theSame = true;
    }

    const departureData = {
      departure_airport: myArray[2].replace(/%20/g, " "),
      arrival_airport: myArray[3].replace(/%20/g, " "),
      departure_date: myArray[12],
    };

    axios
      .put('http://localhost:8082/api/flights/search', departureData)
      .then(res => {
        this.setState({
          departureFlights: res.data
        })

        if (theSame === true && this.state.departureFlights.length > 0) {
          for (var z = 0; z < this.state.departureFlights.length; z++) {
            if (this.state.departureFlights[z]._id === myArray[6]) {
              console.log("true")
            }
            else {
              this.state.departureFlights2[z] = this.state.departureFlights[z]
            }
          }
        }
        else {
          for (var z = 0; z < this.state.departureFlights.length; z++) {
            this.state.departureFlights2[z] = this.state.departureFlights[z]
          }
        }
        this.state.departureFlights = this.state.departureFlights2;

        console.log("A")
        console.log(this.state.departureFlights)

        for(var c = 0; c < this.state.departureFlights.length; c++){
          if(this.state.departureFlights[c] === undefined){
            this.state.departureFlights.splice(c, 1);
          }
        }
        this.forceUpdate();

      })
      .catch(err => {
        console.log('Error from ShowFlightList');
      })

    axios
      .get('http://localhost:8082/api/userflights/' + userflightID)
      .then(res => {
        let flightID = res.data.flight_id;
        let cabin = res.data.cabin;
        console.log(cabin)
      })
      .catch(err => {
        console.log('Error from ShowFlightList');
      })
  };




  render() {
    var departureFlights = this.state.departureFlights;

    for (var i = 0; i < departureFlights.length; i++) {
      if (selectedCabin === 'Economy') {
        if (departureFlights[i].available_economy_seats < numberOfPassengers) {
          departureFlights.splice(departureFlights.indexOf(departureFlights[i]), 1);
        }
      }
      else if (selectedCabin === 'Business') {
        if (departureFlights[i].available_business_seats < numberOfPassengers) {
          departureFlights.splice(departureFlights.indexOf(departureFlights[i]), 1);
        }
      }
      else if (selectedCabin === 'First') {
        if (departureFlights[i].available_first_seats < numberOfPassengers) {
          departureFlights.splice(departureFlights.indexOf(departureFlights[i]), 1);
        }
      }
    }


    const selectedDepartureFlight = this.state.selectedDepartureFlight;
    var selectedBaggageAllowanceDeparture;
    var selectedPriceDeparture;
    var depDate1;
    var arrDate1;

    if (selectedDepartureFlight.departure_date !== undefined) {
      depDate1 = selectedDepartureFlight.departure_date.substring(0, 10)
    }
    if (selectedDepartureFlight.arrival_date !== undefined) {
      arrDate1 = selectedDepartureFlight.arrival_date.substring(0, 10)
    }

    if (selectedCabin === 'Economy') {
      this.state.selectedBaggageAllowanceDeparture = selectedDepartureFlight.baggage_allowance_economy
      this.state.selectedPriceDeparture = selectedDepartureFlight.price_economy

    }
    else if (selectedCabin === 'Business') {
      this.state.selectedBaggageAllowanceDeparture = selectedDepartureFlight.baggage_allowance_business
      this.state.selectedPriceDeparture = selectedDepartureFlight.price_business
    }
    else if (selectedCabin === 'First') {
      this.state.selectedBaggageAllowanceDeparture = selectedDepartureFlight.baggage_allowance_first
      this.state.selectedPriceDeparture = selectedDepartureFlight.price_first
    }
    this.state.selectedCabin = selectedCabin;

    this.state.priceD = oldPrice - this.state.selectedPriceDeparture;
    if (String(this.state.priceD).charAt(0) === '-') {
      this.state.priceDdisplayed = String(oldPrice - this.state.selectedPriceDeparture).substring(1);
    }
    else {
      this.state.priceDdisplayed = oldPrice - this.state.selectedPriceDeparture;
    }
    console.log("old price " + oldPrice)
    console.log(("new price " + this.state.selectedPriceDeparture));

    let result = (window.location.pathname).replace("change-flight", "seats-selection-when-changing-flight");
    this.state.priceD = this.state.priceD * -1;
    const SeatsSelectionLink = result + "/" + this.state.selectedDepartureFlight._id + "/" + this.state.selectedDepartureFlight.economy_seats_number + "/" + this.state.selectedDepartureFlight.business_seats_number + "/" + this.state.selectedDepartureFlight.first_seats_number + "/" + this.state.selectedDepartureFlight.booked_seats + "/" + this.state.priceD;

    return (
      <div className="SelectFlights">
        <br />
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={0} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <br />
        <br />

        <div className="row">
          <div className="block">
            <div style={{
              margin: "auto", width: "600px"
            }} className="HeaderSelectFlight">
              <h1>Select Flight</h1>
            </div>

            <DataGrid
              style={{

                height: "375px",
                margin: "auto",
                backgroundColor: "white"
              }}
              onSelectionModelChange={itm => this.onChange1(itm)}
              rows={departureFlights}
              getRowId={(row) => row._id}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
            <br />
            {((this.state.departureFlightID === '')) ? (
              <Button style={{
                margin: "15px"
              }} variant="contained" disabled>
                Show flight details
              </Button>
            ) : (
              <Button style={{
                margin: "15 px"
              }} onClick={this.onClickButton1} variant="contained">
                Show flight details
              </Button>
            )}

            {((this.state.departureFlightID === '')) ? (
              <Button style={{
                margin: "15 px"
              }} variant="contained" disabled>
                Calculate Price Difference
              </Button>
            ) : (
              <Button style={{
                margin: "15 px"
              }} onClick={this.onClickButton2} variant="contained">
                Calculate Price Difference
              </Button>
            )}
            <br />
          </div>
        </div>

        <div className="col-md-11">
          <hr />
        </div>

        <div>
          <Modal styles={{ modal: { width: "100%", overflowX: "hidden" } }} open={this.state.openModal1} onClose={this.onCloseModal1}>
            <br />
            <br />
            <TableContainer style={{ width: "100%", overflowX: "hidden" }} component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Flight Number</StyledTableCell>
                    <StyledTableCell align="center">From</StyledTableCell>
                    <StyledTableCell align="center">To</StyledTableCell>
                    <StyledTableCell align="center">Departure Date/Time</StyledTableCell>
                    <StyledTableCell align="center">Arrival Date/Time</StyledTableCell>
                    <StyledTableCell align="center">Trip Duration</StyledTableCell>
                    <StyledTableCell align="center">Cabin</StyledTableCell>
                    <StyledTableCell align="center">Baggage Allowance</StyledTableCell>
                    {/* <StyledTableCell align="center">Price</StyledTableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>

                  <StyledTableRow key={selectedDepartureFlight._id}>
                    <StyledTableCell align="center" component="th" scope="row">{selectedDepartureFlight.flight_number}</StyledTableCell>
                    <StyledTableCell align="center">{selectedDepartureFlight.departure_airport}</StyledTableCell>
                    <StyledTableCell align="center">{selectedDepartureFlight.arrival_airport}</StyledTableCell>
                    <StyledTableCell align="center">{depDate1} | {selectedDepartureFlight.departure_time}</StyledTableCell>
                    <StyledTableCell align="center">{arrDate1} | {selectedDepartureFlight.arrival_time}</StyledTableCell>
                    <StyledTableCell align="center">{selectedDepartureFlight.trip_duration}</StyledTableCell>
                    <StyledTableCell align="center">{this.state.selectedCabin}</StyledTableCell>
                    <StyledTableCell align="center">{this.state.selectedBaggageAllowanceDeparture}</StyledTableCell>
                    {/* <StyledTableCell align="center">{this.state.selectedPriceDeparture}LE</StyledTableCell> */}
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Modal>
        </div>

        <div>
          <Modal styles={{ modal: { width: "100%", overflowX: "hidden" } }} open={this.state.openModal2} onClose={this.onCloseModal2}>
            <br />
            <br />
            <TableContainer style={{ width: "100%", overflowX: "hidden" }} component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Price Difference</StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                    {/* <StyledTableCell align="center">Price</StyledTableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>

                  <StyledTableRow key={selectedDepartureFlight._id}>
                    <StyledTableCell align="center" component="th" scope="row">{this.state.priceDdisplayed}</StyledTableCell>
                    <StyledTableCell align="center" component="th" scope="row">{type}</StyledTableCell>
                    {/* <StyledTableCell align="center">{this.state.selectedPriceDeparture}LE</StyledTableCell> */}
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Modal>
        </div>
        {((this.state.departureFlightID === '')) ? (
          <Button variant="contained" disabled>
            Confirm Flights and Select Seats
          </Button>
        ) : (
          <Button color="success" href={SeatsSelectionLink} variant="contained">
            Confirm Flight and Select Seats
          </Button>
        )}
        <br />
        <br />
      </div>
    );
  }
}

export default ChangeFlight;