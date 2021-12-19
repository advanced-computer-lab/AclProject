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

var flightnums = [];
var buttonflag = 'false';
var stringseats = '';

class ReservedFlights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: [],
      userflights: [],
      selectedflight: {},
      selecteduserflight: {},
      openModal1: false,
      LoggedInUser: jwt.decode(localStorage.getItem('token'))
    };
  }

  componentDidMount() {

    axios
      .get('http://localhost:8082/api/userflights')
      .then(res => {
        this.setState({
          userflights: res.data
        })
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].username === this.state.LoggedInUser.username) {
            flightnums.push(res.data[i].flight_number);


          }
        }

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
              selectedflight: this.state.flights[i],
              selecteduserflight: res.data,
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
              for(var j = 0;j < new_booked_seats.length; j++)
              {
                stringseats += new_booked_seats[j];
                if((j+1) < new_booked_seats.length)
                stringseats += '-';
              }
          
          
              if(this.state.selecteduserflight.cabin === 'Business')
              { const data = {
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

            if(this.state.selecteduserflight.cabin === 'Economy')
              { const data = {
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

            if(this.state.selecteduserflight.cabin === 'First')
              { const data = {
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
    const columns = [
      { field: 'booking_reference', align: 'center', headerName: 'Booking Reference', flex: 1 },
      { field: 'flight_number', align: 'center', headerName: 'Flight Number', flex: 1 },
      { field: 'cabin', align: 'center', headerName: 'Cabin', flex: 1 },
      { field: 'seats_booked', align: 'center', headerName: 'Seats', flex: 1 },
      { field: 'price', align: 'center', headerName: 'Price (EGP)', flex: 1 },


    ];

    flightnums = [];

    return (
      <div className="ShowFlightList">
        <div className="FlightsTable">
          <br />
          <br />
          <br />
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
                      <StyledTableCell align="center">{this.state.selectedflight.departure_date}</StyledTableCell>
                      <StyledTableCell align="center">{this.state.selectedflight.departure_time}</StyledTableCell>
                      <StyledTableCell align="center">{this.state.selectedflight.arrival_airport}</StyledTableCell>
                      <StyledTableCell align="center">{this.state.selectedflight.arrival_date}</StyledTableCell>
                      <StyledTableCell align="center">{this.state.selectedflight.arrival_time}</StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Modal>
          </div>
          <DataGrid
            style={{
              height: "550px",
              margin: "auto",
              backgroundColor: "white"
            }}
            onSelectionModelChange={itm => this.onChange2(itm)}
            rows={flights}

            getRowId={(row) => row._id}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
          <br />
          {((buttonflag == 'false')) ? (
            <Button style={{
              margin: "auto"
            }} variant="contained" disabled>
              Select a Reservation
            </Button>
          ) : (
            <Button style={{
              margin: "auto"
            }} onClick={this.onClickButton2} variant="contained">
              Cancel Reservation
            </Button>
          )}
          &nbsp
          &nbsp
          {((buttonflag == 'false')) ? (
            <Button style={{
              margin: "auto"
            }} variant="contained" disabled>
              Select a Reservation
            </Button>
          ) : (
            <Button style={{
              margin: "auto"
            }} onClick={this.onClickButton1} variant="contained">
              More Details
            </Button>
          )}
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default ReservedFlights;