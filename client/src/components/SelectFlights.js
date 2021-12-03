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
  'Select departure and return flights',
  'Select plane seats',
  'Summary and confirmation',
];

var selectedCabin = ((window.location.pathname).split("/"))[8]
var selectedField;
var numberOfPassengers = parseInt(((window.location.pathname).split("/"))[6]) + parseInt(((window.location.pathname).split("/"))[7])

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
    width: 90,
  },
];

class selectFlights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departureFlights: [],
      returnFlights: [],
      departureFlightID: '',
      returnFlightID: '',
      selectedDepartureFlight: '',
      selectedReturnFlight: '',
      openModal1: false,
      openModal2: false,
      selectedPriceDeparture: '',
      selectedBaggageAllowanceDeparture: '',
      selectedPriceReturn: '',
      selectedBaggageAllowanceReturn: '',
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
      })
      .catch(err => {
        console.log('Error from ShowFlightList');
      })
    this.state.departureFlightID = x;
    this.forceUpdate()
  };

  onChange2(x) {
    axios
      .put('http://localhost:8082/api/flights/search', { _id: x })
      .then(res => {
        this.setState({
          selectedReturnFlight: res.data[0]
        })
      })
      .catch(err => {
        console.log('Error from ShowFlightList');
      })
    this.state.returnFlightID = x;
    this.forceUpdate()
  };

  onClickButton1 = e => {
    e.preventDefault()
    this.forceUpdate()
    this.setState({ openModal1: true })
  }

  onCloseModal1 = () => {
    this.setState({ openModal1: false })
  }

  onClickButton2 = e => {
    e.preventDefault()
    this.forceUpdate()
    this.setState({ openModal2: true })
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
      departureFlightID: this.state.departureFlightID,
      returnFlightID: this.state.returnFlightID
    };

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
      .put('http://localhost:8082/api/flights/search', departureData)
      .then(res => {
        this.setState({
          departureFlights: res.data
        })
      })
      .catch(err => {
        console.log('Error from ShowFlightList');
      })


    axios
      .put('http://localhost:8082/api/flights/search', returnData)
      .then(res => {
        this.setState({
          returnFlights: res.data
        })
      })
      .catch(err => {
        console.log('Error from ShowFlightList');
      })
  };




  render() {
    const departureFlights = this.state.departureFlights;
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

    const returnFlights = this.state.returnFlights;

    for (var j = 0; j < returnFlights.length; j++) {
      if (selectedCabin === 'Economy') {

        if (returnFlights[j].available_economy_seats < numberOfPassengers) {
          returnFlights.splice(returnFlights.indexOf(returnFlights[j]), 1);
        }
      }
      else if (selectedCabin === 'Business') {
        if (returnFlights[j].available_business_seats < numberOfPassengers) {
          returnFlights.splice(returnFlights.indexOf(returnFlights[j]), 1);
        }
      }
      else if (selectedCabin === 'First') {
        if (returnFlights[j].available_first_seats < numberOfPassengers) {
          returnFlights.splice(returnFlights.indexOf(returnFlights[j]), 1);
        }
      }
    }

    const selectedDepartureFlight = this.state.selectedDepartureFlight;
    var selectedBaggageAllowanceDeparture;
    var selectedBaggageAllowanceReturn;
    var selectedPriceDeparture;
    var selectedPriceReturn;
    var depDate1;
    var arrDate1;
    var depDate2;
    var arrDate2;
    const selectedReturnFlight = this.state.selectedReturnFlight;
    if (selectedDepartureFlight.departure_date !== undefined){
      depDate1 = selectedDepartureFlight.departure_date.substring(0, 10)
    }
    if(selectedDepartureFlight.arrival_date !== undefined){
      arrDate1 = selectedDepartureFlight.arrival_date.substring(0, 10)
    }
    if (selectedReturnFlight.departure_date !== undefined){
      depDate2 = selectedReturnFlight.departure_date.substring(0, 10)
    }
    if(selectedReturnFlight.arrival_date !== undefined){
      arrDate2 = selectedReturnFlight.arrival_date.substring(0, 10)
    }
    if (selectedCabin === 'Economy') {
      this.state.selectedBaggageAllowanceDeparture = selectedDepartureFlight.baggage_allowance_economy
      this.state.selectedBaggageAllowanceReturn = selectedReturnFlight.baggage_allowance_economy
      this.state.selectedPriceDeparture = selectedDepartureFlight.price_economy
      this.state.selectedPriceReturn = selectedReturnFlight.price_economy
    }
    else if (selectedCabin === 'Business') {
      this.state.selectedBaggageAllowanceDeparture = selectedDepartureFlight.baggage_allowance_business
      this.state.selectedBaggageAllowanceReturn = selectedReturnFlight.baggage_allowance_business
      this.state.selectedPriceDeparture = selectedDepartureFlight.price_business
      this.state.selectedPriceReturn = selectedReturnFlight.price_business
    }
    else if (selectedCabin === 'First') {
      this.state.selectedBaggageAllowanceDeparture = selectedDepartureFlight.baggage_allowance_first
      this.state.selectedBaggageAllowanceReturn = selectedReturnFlight.baggage_allowance_first
      this.state.selectedPriceDeparture = selectedDepartureFlight.price_first
      this.state.selectedPriceReturn = selectedReturnFlight.price_first
    }
    this.state.selectedCabin = selectedCabin;
    
    let result = (window.location.pathname).replace("select-flights", "seats-selection-departure");
    const SeatsSelectionLink = result + "/" + this.state.departureFlightID + "/" + this.state.returnFlightID + "/" + selectedDepartureFlight.economy_seats_number + "/" + selectedDepartureFlight.business_seats_number + "/" + selectedDepartureFlight.first_seats_number + "/" + selectedReturnFlight.economy_seats_number + "/" + selectedReturnFlight.business_seats_number + "/" + selectedReturnFlight.first_seats_number + "/" + selectedDepartureFlight.booked_seats +"/"+ selectedReturnFlight.booked_seats;

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
            <div style={{margin: "auto"
            }} className="HeaderSelectFlight">
              <h1>Select Departure Flight</h1>
            </div>

            <DataGrid
              style={{
                width: "562px",
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
                margin: "auto"
              }} variant="contained" disabled>
                Show flight details
              </Button>
            ) : (
              <Button style={{
                margin: "auto"
              }} onClick={this.onClickButton1} variant="contained">
                Show flight details
              </Button>
            )}
            <br />
          </div>

          <div className="block">
            <div style={{
              margin: "auto"
            }} className="HeaderSelectFlight">
              <h1>Select Return Flight</h1>
            </div>

            <DataGrid
              style={{
                width: "562px",
                height: "375px",
                margin: "auto",
                backgroundColor: "white"
              }}
              onSelectionModelChange={itm => this.onChange2(itm)}
              rows={returnFlights}
              getRowId={(row) => row._id}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
            <br />
            {((this.state.returnFlightID === '')) ? (
              <Button style={{
                margin: "auto"
              }} variant="contained" disabled>
                Show flight details
              </Button>
            ) : (
              <Button style={{
                margin: "auto"
              }} onClick={this.onClickButton2} variant="contained">
                Show flight details
              </Button>
            )}
          </div>
        </div>

        <div className="col-md-11">
          <hr />
        </div>

        <div>
        <Modal styles={{modal: {width: "100%", overflowX: "hidden"}}} open={this.state.openModal1} onClose={this.onCloseModal1}>
            <br />
            <br />
            <TableContainer style={{width: "100%", overflowX: "hidden"}} component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Flight Number</StyledTableCell>
                    <StyledTableCell align="center">From</StyledTableCell>
                    <StyledTableCell align="center">To</StyledTableCell>
                    <StyledTableCell align="center">Departure Date/Time</StyledTableCell>
                    <StyledTableCell align="center">Arrival Date/Time</StyledTableCell>
                    <StyledTableCell align="center">Cabin</StyledTableCell>
                    <StyledTableCell align="center">Baggage Allowance</StyledTableCell>
                    <StyledTableCell align="center">Price</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  <StyledTableRow key={selectedDepartureFlight._id}>
                    <StyledTableCell align="center" component="th" scope="row">{selectedDepartureFlight.flight_number}</StyledTableCell>
                    <StyledTableCell align="center">{selectedDepartureFlight.departure_airport}</StyledTableCell>
                    <StyledTableCell align="center">{selectedDepartureFlight.arrival_airport}</StyledTableCell>
                    <StyledTableCell align="center">{depDate1} | {selectedDepartureFlight.departure_time}</StyledTableCell>
                    <StyledTableCell align="center">{arrDate1} | {selectedDepartureFlight.arrival_time}</StyledTableCell>
                    <StyledTableCell align="center">{this.state.selectedCabin}</StyledTableCell>
                    <StyledTableCell align="center">{this.state.selectedBaggageAllowanceDeparture}</StyledTableCell>
                    <StyledTableCell align="center">{this.state.selectedPriceDeparture}LE</StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Modal>

          <Modal open={this.state.openModal2} onClose={this.onCloseModal2}>
            <br />
            <br />
            <TableContainer style={{width: "100%", overflowX: "hidden"}} component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Flight Number</StyledTableCell>
                    <StyledTableCell align="center">From</StyledTableCell>
                    <StyledTableCell align="center">To</StyledTableCell>
                    <StyledTableCell align="center">Departure Date/Time</StyledTableCell>
                    <StyledTableCell align="center">Arrival Date/Time</StyledTableCell>
                    <StyledTableCell align="center">Cabin</StyledTableCell>
                    <StyledTableCell align="center">Baggage Allowance</StyledTableCell>
                    <StyledTableCell align="center">Price</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  <StyledTableRow key={selectedReturnFlight._id}>
                    <StyledTableCell align="center" component="th" scope="row">{selectedReturnFlight.flight_number}</StyledTableCell>
                    <StyledTableCell align="center">{selectedReturnFlight.departure_airport}</StyledTableCell>
                    <StyledTableCell align="center">{selectedReturnFlight.arrival_airport}</StyledTableCell>
                    <StyledTableCell align="center">{depDate2} | {selectedReturnFlight.departure_time}</StyledTableCell>
                    <StyledTableCell align="center">{arrDate2} | {selectedReturnFlight.arrival_time}</StyledTableCell>
                    <StyledTableCell align="center">{this.state.selectedCabin}</StyledTableCell>
                    <StyledTableCell align="center">{this.state.selectedBaggageAllowanceReturn}</StyledTableCell>
                    <StyledTableCell align="center">{this.state.selectedPriceReturn}LE</StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Modal>
        </div>

        {((this.state.returnFlightID === '' || this.state.departureFlightID === '')) ? (
          <Button variant="contained" disabled>
            Confirm Flights and Select Seats
          </Button>
        ) : (
          <Button color="success" href={SeatsSelectionLink} variant="contained">
            Confirm Flights and Select Seats
          </Button>
        )}
        <br />
        <br />
      </div>
    );
  }
}

export default selectFlights;