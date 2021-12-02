import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


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
      openModal2: false
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
    this.setState({ openModal1: true })
  }

  onCloseModal1 = () => {
    this.setState({ openModal1: false })
  }

  onClickButton2 = e => {
    e.preventDefault()
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

        if (departureFlights[i].economy_seats_number < numberOfPassengers) {
          departureFlights.splice(departureFlights.indexOf(departureFlights[i]), 1);
        }
      }
      else if (selectedCabin === 'Business') {
        if (departureFlights[i].business_seats_number < numberOfPassengers) {
          departureFlights.splice(departureFlights.indexOf(departureFlights[i]), 1);
        }
      }
      else if (selectedCabin === 'First') {
        if (departureFlights[i].first_seats_number < numberOfPassengers) {
          departureFlights.splice(departureFlights.indexOf(departureFlights[i]), 1);
        }
      }
    }

    const returnFlights = this.state.returnFlights;
    const selectedDepartureFlight = this.state.selectedDepartureFlight;
    var selectedBaggageAllowanceDeparture;
    var selectedBaggageAllowanceReturn;
    const selectedReturnFlight = this.state.selectedReturnFlight;
    if (selectedCabin === 'Economy') {
      selectedBaggageAllowanceDeparture = selectedDepartureFlight.baggage_allowance_economy
      selectedBaggageAllowanceReturn = selectedReturnFlight.baggage_allowance_economy
    }
    else if (selectedCabin === 'Business') {
      selectedBaggageAllowanceDeparture = selectedDepartureFlight.baggage_allowance_business
      selectedBaggageAllowanceReturn = selectedReturnFlight.baggage_allowance_business
    }
    else if (selectedCabin === 'First') {
      selectedBaggageAllowanceDeparture = selectedDepartureFlight.baggage_allowance_first
      selectedBaggageAllowanceReturn = selectedReturnFlight.baggage_allowance_first
    }
    let result = (window.location.pathname).replace("select-flights", "seats-selection");
    const SeatsSelectionLink = result + "/" + this.state.departureFlightID + "/" + this.state.returnFlightID;

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
          <Modal open={this.state.openModal1} onClose={this.onCloseModal1}>
            <br />
            <br />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Flight Number</TableCell>
                    <TableCell align="center">Departure Airport</TableCell>
                    <TableCell align="center">Arrival Airport</TableCell>
                    <TableCell align="center">Departure Time</TableCell>
                    <TableCell align="center">Arrival Time</TableCell>
                    <TableCell align="center">Trip Duration</TableCell>
                    <TableCell align="center">Cabin Class</TableCell>
                    <TableCell align="center">Baggage Allowance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  <TableRow
                  >
                    <TableCell component="th" scope="row">{selectedDepartureFlight.flight_number}</TableCell>
                    <TableCell align="center">{selectedDepartureFlight.departure_airport}</TableCell>
                    <TableCell align="center">{selectedDepartureFlight.arrival_airport}</TableCell>
                    <TableCell align="center">{selectedDepartureFlight.departure_time}</TableCell>
                    <TableCell align="center">{selectedDepartureFlight.arrival_time}</TableCell>
                    <TableCell align="center">{selectedDepartureFlight.trip_duration}</TableCell>
                    <TableCell align="center">{selectedCabin}</TableCell>
                    <TableCell align="center">{selectedBaggageAllowanceDeparture}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Modal>
        </div>

        <div>
          <Modal open={this.state.openModal2} onClose={this.onCloseModal2}>
            <br />
            <br />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Flight Number</TableCell>
                    <TableCell align="center">Departure Airport</TableCell>
                    <TableCell align="center">Arivval Airport</TableCell>
                    <TableCell align="center">Departure Time</TableCell>
                    <TableCell align="center">Arrival Time</TableCell>
                    <TableCell align="center">Trip Duration</TableCell>
                    <TableCell align="center">Cabin Class</TableCell>
                    <TableCell align="center">Baggage Allowance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  <TableRow
                  >
                    <TableCell component="th" scope="row">{selectedReturnFlight.flight_number}</TableCell>
                    <TableCell align="center">{selectedReturnFlight.departure_airport}</TableCell>
                    <TableCell align="center">{selectedReturnFlight.arrival_airport}</TableCell>
                    <TableCell align="center">{selectedReturnFlight.departure_time}</TableCell>
                    <TableCell align="center">{selectedReturnFlight.arrival_time}</TableCell>
                    <TableCell align="center">{selectedReturnFlight.trip_duration}</TableCell>
                    <TableCell align="center">{selectedCabin}</TableCell>
                    <TableCell align="center">{selectedBaggageAllowanceReturn}</TableCell>
                  </TableRow>
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