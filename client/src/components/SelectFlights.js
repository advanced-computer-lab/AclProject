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

const columns = [
  { field: 'flight_number', headerName: 'Flight Number', width: 120 },
  { field: 'departure_time', headerName: 'Departure Time', width: 130 },
  { field: 'arrival_time', headerName: 'Arrival Time', width: 110 },
  {
    field: 'first_seats_number',
    headerName: 'Trip Duration',
    //type: 'number',
    width: 110,
  },
  {
    field: 'economy_seats_number',
    headerName: 'Price',
    //type: 'number',
    width: 60,
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
      date: myArray[4],
    };

    const returnData = {
      departure_airport: myArray[3].replace(/%20/g, " "),
      arrival_airport: myArray[2].replace(/%20/g, " "),
      date: myArray[5],
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
    const returnFlights = this.state.returnFlights;
    const selectedDepartureFlight = this.state.selectedDepartureFlight;
    const selectedReturnFlight = this.state.selectedReturnFlight;
    let result = (window.location.pathname).replace("select-flights", "seats-selection");
    const SeatsSelectionLink = result + "/" + this.state.departureFlightID + "/" + this.state.returnFlightID;

    return (
      <div className="SelectFlights2">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
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
              <header>
                <h1>Select Departure Flight</h1>
              </header>

              <div className="selectFlights">
                <div style={{ height: 400, width: '100%' }}>
                  <DataGrid
                    style={{
                      width: "535px",
                      height: "375px",
                      position: "absolute",
                      backgroundColor: "white"
                    }}
                    onSelectionModelChange={itm => this.onChange1(itm)}
                    rows={departureFlights}
                    getRowId={(row) => row._id}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                  />
                </div>
                {((this.state.departureFlightID === '')) ? (
                  <Button style={{
                    marginLeft: "160px",

                  }} variant="contained" disabled>
                    Show flight details
                  </Button>
                ) : (
                  <Button style={{
                    marginLeft: "160px",

                  }} onClick={this.onClickButton1} variant="contained">
                    Show flight details
                  </Button>
                )}
              </div>

              <div className="col-md-11">
                <br />
                <br />
                <hr />
              </div>
              <br />

              <header>
                <h1>Select Return Flight</h1>
              </header>

              <div className="selectFlights">
                <div style={{ height: 400, width: '100%' }}>
                  <DataGrid
                    style={{
                      width: "535px",
                      height: "375px",
                      position: "absolute",
                      backgroundColor: "white"
                    }}
                    onSelectionModelChange={itm => this.onChange2(itm)}
                    rows={returnFlights}
                    getRowId={(row) => row._id}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                  />
                </div>
                {((this.state.returnFlightID === '')) ? (
                  <Button style={{
                    marginLeft: "160px",

                  }} variant="contained" disabled>
                    Show flight details
                  </Button>
                ) : (
                  <Button style={{
                    marginLeft: "160px",

                  }} onClick={this.onClickButton2} variant="contained">
                    Show flight details
                  </Button>
                )}
              </div>
            </div>
            <div className="col-md-11">
              <br />
              <br />
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
                        <TableCell align="right">Departure Airport</TableCell>
                        <TableCell align="right">Arrival Airport</TableCell>
                        <TableCell align="right">Departure Time</TableCell>
                        <TableCell align="right">Arrival Time</TableCell>
                        <TableCell align="right">Trip Duration</TableCell>
                        <TableCell align="right">Cabin Class</TableCell>
                        <TableCell align="right">Baggage Allowance</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>

                      <TableRow
                      >
                        <TableCell component="th" scope="row">{selectedDepartureFlight.flight_number}</TableCell>
                        <TableCell align="right">{selectedDepartureFlight.departure_airport}</TableCell>
                        <TableCell align="right">{selectedDepartureFlight.arrival_airport}</TableCell>
                        <TableCell align="right">{selectedDepartureFlight.departure_time}</TableCell>
                        <TableCell align="right">{selectedDepartureFlight.arrival_time}</TableCell>
                        <TableCell align="right">{selectedDepartureFlight.arrival_time} - {selectedDepartureFlight.departure_time}</TableCell>
                        <TableCell align="right">{selectedDepartureFlight.flight_number}</TableCell>
                        <TableCell align="right">{selectedDepartureFlight.flight_number}</TableCell>
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
                        <TableCell align="right">Departure Airport</TableCell>
                        <TableCell align="right">Arivval Airport</TableCell>
                        <TableCell align="right">Departure Time</TableCell>
                        <TableCell align="right">Arrival Time</TableCell>
                        <TableCell align="right">Trip Duration</TableCell>
                        <TableCell align="right">Cabin Class</TableCell>
                        <TableCell align="right">Baggage Allowance</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>

                      <TableRow
                      >
                        <TableCell component="th" scope="row">{selectedReturnFlight.flight_number}</TableCell>
                        <TableCell align="right">{selectedReturnFlight.departure_airport}</TableCell>
                        <TableCell align="right">{selectedReturnFlight.arrival_airport}</TableCell>
                        <TableCell align="right">{selectedReturnFlight.departure_time}</TableCell>
                        <TableCell align="right">{selectedReturnFlight.arrival_time}</TableCell>
                        <TableCell align="right">{selectedReturnFlight.arrival_time} - {selectedReturnFlight.departure_time}</TableCell>
                        <TableCell align="right">{selectedReturnFlight.flight_number}</TableCell>
                        <TableCell align="right">{selectedReturnFlight.flight_number}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Modal>
            </div>

            {((this.state.returnFlightID === '' || this.state.departureFlightID === '')) ? (
              <Button style={{
                marginLeft: "405px",

              }} variant="contained" disabled>
                Confirm Flights and Select Seats
              </Button>
            ) : (
              <Button color="success" style={{
                marginLeft: "405px",

              }} href={SeatsSelectionLink} variant="contained">
                Confirm Flights and Select Seats
              </Button>
            )}
          </div>
          <br/>
        </div>
      </div>
    );
  }
}

export default selectFlights;