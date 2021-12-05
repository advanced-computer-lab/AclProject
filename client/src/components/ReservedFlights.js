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

var nums = [];

class ReservedFlights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: [],
      returnFlightID: '',
      flight: {},
      selectedReturnFlight: '',
      userflight: {},
      openModal1: false,
      LoggedInUser: jwt.decode(localStorage.getItem('token'))
    };
  }

  componentDidMount() {

    axios
      .get('http://localhost:8082/api/userflights')
      .then(res => {


        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].username === this.state.LoggedInUser.username) {
            nums.push(res.data[i].flight_number);


          }
        }

        axios.get('http://localhost:8082/api/flights').then(
          res => {
            var data = [];

            for (var i = 0; i < res.data.length; i++) {
              for (var j = 0; j < nums.length; j++) {
                if (res.data[i].flight_number === nums[j]) {
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


    axios
      .get('http://localhost:8082/api/flights/' + this.state.returnFlightID)
      .then(res => {
        axios.get('http://localhost:8082/api/userflights')
          .then(res => {
            for (var i = 0; i < res.data.length; i++) {

              if (res.data[i].flight_id == this.state.returnFlightID) {
                this.setState({
                  userflight: res.data[i]
                })
                break;
              }
            }
          })
          .catch(err => {
            console.log("Error from ReservedShowFlightDetails12");
          })

        this.setState({
          flight: res.data
        })
      })
      .catch(err => {
        console.log("Error from ReservedShowFlightDetails");
      })

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
              .post('http://localhost:8082/api/userflights/sendemail', {email: jwt.decode(localStorage.getItem('token')).email})
              .then(res => {
                console.log('here')
                window.location.reload(false);
              })
              .catch(err => {
                console.log("Error form ReservedShowFlightDetails_deleteClick");
              })

            axios
              .delete('http://localhost:8082/api/userflights/' + this.state.userflight._id)
              .then(res => {
                window.location.reload(false);
              })
              .catch(err => {
                console.log("Error form ReservedShowFlightDetails_deleteClick");
              })
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
    const flights = this.state.flights;
    const columns = [
      { field: 'flight_number', align: 'center', headerName: 'Flight Number', width: 120 },
      { field: 'departure_airport', align: 'center', headerName: 'From', width: 230 },
      { field: 'arrival_airport', align: 'center', headerName: 'To', width: 230 },
      { field: 'departure_date', align: 'center', headerName: 'Departure Date', width: 150 },
      { field: 'departure_time', align: 'center', headerName: 'Departure Time', width: 150 },
      { field: 'arrival_date', align: 'center', headerName: 'Arrival Date', width: 150 },
      { field: 'arrival_time', align: 'center', headerName: 'Arrival Time', width: 150 },

    ];

    nums = [];

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
                      <StyledTableCell align="center">Seats</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableCell align="center">{this.state.userflight.seats_booked}</StyledTableCell>
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
          {((this.state.returnFlightID === '')) ? (
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
          {((this.state.returnFlightID === '')) ? (
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