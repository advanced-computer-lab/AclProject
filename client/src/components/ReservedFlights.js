import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import jwt from 'jsonwebtoken';
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
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
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

var numberOfp = ''; //number of passengers for selected userflight
var flightnums = []; //used to display flight info
var tabledata = []; //used to display booking in table
var tabledataR = []; //used to display booking in table
var tabledataD = []; //used to display booking in table
var buttonflag = 'false';
var stringseats = '';

class ReservedFlights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: [],
      userflights: [],
      userflightsD: [],
      userflightsR: [],
      selectedflight: {},
      selecteduserflight: {},
      openModal1: false,
      selectedCabin: '',
      availableNewSeats: '',
      numberOfSeats: '',
      LoggedInUser: jwt.decode(localStorage.getItem('token'))
    };
  }

  componentDidMount() {

    axios
      .get('http://localhost:8082/api/userflights')
      .then(res => {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].username === this.state.LoggedInUser.username) {
            flightnums.push(res.data[i].flight_number);
            tabledata.push(res.data[i])



          }
        }

        for (var i = 0; i < tabledata.length; i++) {
          if (tabledata[i].booking_reference[((tabledata[i].booking_reference).length) - 1] === 'D')
            tabledataD.push(tabledata[i]);
          if (tabledata[i].booking_reference[((tabledata[i].booking_reference).length) - 1] === 'R')
            tabledataR.push(tabledata[i]);
        }

        this.setState({
          userflights: tabledata,
          userflightsD: tabledataD,
          userflightsR: tabledataR
        })

        axios.get('http://localhost:8082/api/flights').then(
          res => {
            var data = [];

            for (var i = 0; i < res.data.length; i++) {
              for (var j = 0; j < flightnums.length; j++) {
                if (res.data[i].flight_number === flightnums[j]) {
                  data.push(res.data[i]);

                }
              }
            }
            this.setState({
              flights: data
            })

          }

        ).catch(err => {
          console.log('Error from ReservedFlights2');
        })

      })
      .catch(err => {
        console.log('Error from ReservedFlights');
      })


  };

  onChange2(x) {

    axios
      .get('http://localhost:8082/api/userflights/' + x)
      .then(res => {
        for (var i = 0; i < this.state.flights.length; i++) {
          if (res.data.flight_number === this.state.flights[i].flight_number) {
            this.setState({
              availableNewSeats: '',
              selectedflight: this.state.flights[i],
              selecteduserflight: res.data,
              selectedCabin: this.state.selecteduserflight.cabin
            })
          }

        }
      })
      .catch(err => {
        console.log('Error from ShowFlightList');
      })

    buttonflag = 'true'
    this.forceUpdate()
  };

  onClickButton1 = e => {
    e.preventDefault()
    this.setState({ openModal1: true })
  };


  onClickButton2 = e => {
    e.preventDefault()
    confirmAlert({
      title: 'Confirmation',
      message: 'Are you sure that you want to cancel this reservation?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {

            axios
              .post('http://localhost:8082/api/userflights/sendemail', { email: jwt.decode(localStorage.getItem('token')).email })
              .then(res => {
                console.log('here')
                window.location.reload(false);
              })
              .catch(err => {
                console.log("Error form ReservedShowFlightDetails_deleteClick");
              })

            axios
              .delete('http://localhost:8082/api/userflights/' + this.state.selecteduserflight._id)
              .then(res => {
                window.location.reload(false);
              })
              .catch(err => {
                console.log("Error form ReservedShowFlightDetails_deleteClick");
              })

            const booked_seats = (this.state.selectedflight.booked_seats).split("-");
            const seats_booked = (this.state.selecteduserflight.seats_booked).split("-")
            const new_booked_seats = []
            const increment = seats_booked.length

            for (var i = 0; i < booked_seats.length; i++) {
              if (booked_seats[i] === seats_booked[0]) {
                i = i + (seats_booked.length - 1)
              }
              else {
                new_booked_seats.push(booked_seats[i])
              }

            }
            for (var j = 0; j < new_booked_seats.length; j++) {
              stringseats += new_booked_seats[j];
              if ((j + 1) < new_booked_seats.length)
                stringseats += '-';
            }


            if (this.state.selecteduserflight.cabin === 'Business') {
              const data = {
                booked_seats: stringseats,
                available_business_seats: (parseInt(this.state.selectedflight.available_business_seats) + increment).toString()
              }

              axios
                .put('http://localhost:8082/api/flights/' + this.state.selectedflight._id, data)
                .then(res => {

                })
                .catch(err => {
                  console.log("Error in UpdateFlightInfo!");
                })

            }

            if (this.state.selecteduserflight.cabin === 'Economy') {
              const data = {
                booked_seats: stringseats,
                available_economy_seats: (parseInt(this.state.selectedflight.available_economy_seats) + increment).toString()
              }

              axios
                .put('http://localhost:8082/api/flights/' + this.state.selectedflight._id, data)
                .then(res => {

                })
                .catch(err => {
                  console.log("Error in UpdateFlightInfo!");
                })

            }

            if (this.state.selecteduserflight.cabin === 'First') {
              const data = {
                booked_seats: stringseats,
                available_first_seats: (parseInt(this.state.selectedflight.available_first_seats) + increment).toString()
              }

              axios
                .put('http://localhost:8082/api/flights/' + this.state.selectedflight._id, data)
                .then(res => {

                })
                .catch(err => {
                  console.log("Error in UpdateFlightInfo!");
                })

            }

          }

        },
        {
          label: 'No',
        }
      ]

    });
  }

  onCloseModal1 = () => {
    this.setState({ openModal1: false })
  }

  render() {
    const flights = this.state.userflights;
    const flightsD = this.state.userflightsD;
    const flightsR = this.state.userflightsR;
    var chars;
    var chars2;
    if (this.state.selectedflight.booked_seats !== undefined && this.state.selecteduserflight.seats_booked !== undefined){
      chars = this.state.selectedflight.booked_seats.split('-');
      chars2 = this.state.selecteduserflight.seats_booked.split('-');
      numberOfp = chars2.length;
      var removeSeat = false;
      this.state.numberOfSeats = chars2.length;
    for (var i = 0; i < chars.length; i++){
      removeSeat = false;
      for (var ii = 0; ii < chars2.length; ii++){
       if (chars[i] === chars2[ii]){
          removeSeat = true;
       }
      }
      if (removeSeat === false){
        this.state.availableNewSeats = this.state.availableNewSeats + "-" + chars[i] + "-";
      }
    }
    }
    const changeReservationLink = '/change-reservation'+ '/'+(this.state.selectedflight.departure_airport)+'/'+(this.state.selectedflight.arrival_airport)+'/'+ numberOfp + '/'+(this.state.selecteduserflight._id);
    const changeSeatsLink = '/change-seats/'+ this.state.selectedflight._id + "/" + this.state.selectedflight.economy_seats_number + "/" + this.state.selectedflight.business_seats_number + "/" + this.state.selectedflight.first_seats_number + "/" + this.state.availableNewSeats + "/" + this.state.selectedCabin + "/" + this.state.numberOfSeats;
    const columns = [
      { field: 'booking_reference', align: 'center', headerName: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0Booking Reference', flex: 1 },
      { field: 'flight_number', align: 'center', headerName: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0Flight Number', flex: 1 },
      { field: 'cabin', align: 'center', headerName: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0Cabin', flex: 1 },
      { field: 'seats_booked', align: 'center', headerName: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0Seats', flex: 1 },
      { field: 'price', align: 'center', headerName: '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0Price (LE)', flex: 1 },


    ];


    const selectedflight = this.state.selectedflight;
    var depDate1;
    var arrDate1;
    if (selectedflight.departure_date !== undefined) {
      depDate1 = selectedflight.departure_date.substring(0, 10)
    }
    if (selectedflight.arrival_date !== undefined) {
      arrDate1 = selectedflight.arrival_date.substring(0, 10)
    }
    return (
      <div className="ShowFlightList">
        <div className="FlightsTable">


          <div>
            <Modal styles={{ modal: { width: "100%", overflowX: "hidden" } }} open={this.state.openModal1} onClose={this.onCloseModal1}>
              <br />
              <br />
              <TableContainer style={{ width: "100%", overflowX: "hidden" }} component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">Departure Airport</StyledTableCell>
                      <StyledTableCell align="center">Departure Date</StyledTableCell>
                      <StyledTableCell align="center">Departure Time</StyledTableCell>
                      <StyledTableCell align="center">Arrival Airport</StyledTableCell>
                      <StyledTableCell align="center">Arrival Date</StyledTableCell>
                      <StyledTableCell align="center">Arrival Time</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell align="center">{this.state.selectedflight.departure_airport}</StyledTableCell>
                      <StyledTableCell align="center">{depDate1}</StyledTableCell>
                      <StyledTableCell align="center">{this.state.selectedflight.departure_time}</StyledTableCell>
                      <StyledTableCell align="center">{this.state.selectedflight.arrival_airport}</StyledTableCell>
                      <StyledTableCell align="center">{arrDate1}</StyledTableCell>
                      <StyledTableCell align="center">{this.state.selectedflight.arrival_time}</StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Modal>
          </div>
          <br />
          <div style={{
            margin: "auto"
          }} className="HeaderReservations">
            <h1>Departure Flights</h1>
          </div>
          <br />
          <DataGrid
            style={{
              height: "300px",
              margin: "auto",
              backgroundColor: "white"
            }}
            onSelectionModelChange={itm => this.onChange2(itm)}
            rows={flightsD}

            getRowId={(row) => row._id}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
          <br />
          <div style={{
            margin: "auto"
          }} className="HeaderReservations">
            <h1>Return Flights</h1>
          </div>
          <br />
          <DataGrid
            style={{
              height: "300px",
              margin: "auto",
              backgroundColor: "white"
            }}
            onSelectionModelChange={itm => this.onChange2(itm)}
            rows={flightsR}

            getRowId={(row) => row._id}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />

          <div style={{

          }}>

            {((buttonflag == 'false')) ? (
              <Button style={{

                margin: "35px"
              }} variant="contained" disabled>
                Cancel Reservation
              </Button>
            ) : (
              <Button style={{
                margin: "35px"
              }} onClick={this.onClickButton2} variant="contained">
                Cancel Reservation
              </Button>
            )}

            {((buttonflag == 'false')) ? (
              <Button style={{
                margin: "35px"
              }} variant="contained" disabled>
                Change Reservation
              </Button>
            ) : (
              <Button href={changeReservationLink} style={{
                margin: "35px"
              }} variant="contained">
                Change Reservation
              </Button>
            )}

            {((buttonflag == 'false')) ? (
              <Button style={{
                margin: "35px"
              }} variant="contained" disabled>
                Change Seats
              </Button>
            ) : (
              <Button style={{
                margin: "35px"
              }} href={changeSeatsLink} variant="contained">
                Change Seats
              </Button>
            )}

            {((buttonflag == 'false')) ? (
              <Button style={{
                margin: "35px"
              }} variant="contained" disabled>
                More Details
              </Button>
            ) : (
              <Button style={{
                margin: "35px"
              }} onClick={this.onClickButton1} variant="contained">
                More Details
              </Button>
            )}
          </div>



        </div>
      </div>
    );
  }
}

export default ReservedFlights;