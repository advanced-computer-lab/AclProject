import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import jwt from 'jsonwebtoken'
import '../App.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

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

class ShowFlightList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: [],
      LoggedInUser: jwt.decode(localStorage.getItem('token'))
    };

    if (jwt.decode(localStorage.getItem('token')) === null) {
      window.location.href = "http://localhost:3000/not-authorized";
    }
    else if (this.state.LoggedInUser.username !== "Administrator") {
      window.location.href = "http://localhost:3000/not-authorized";
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/flights')
      .then(res => {
        this.setState({
          flights: res.data
        })
      })
      .catch(err => {
        console.log('Error from ShowFlightList');
      })
  };


  submit = (id) => {
    confirmAlert({
      title: 'Confirmation',
      message: 'Are you sure that you want to delete this flight?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>


            axios
              .delete('http://localhost:8082/api/flights/' + id)
              .then(res => {
                window.location.assign('http://localhost:3000/admin-show-flight-list')
              })
              .catch(err => {
                console.log("Error form ShowFlightDetails_deleteClick");
              })

        },
        {
          label: 'No',
        }
      ]
    });
  };


  render() {
    const flights = this.state.flights;

    return (
      <div className="ShowFlightList">
        <div className="FlightsTable">
          <br />
          <br />
          <br />
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Flight Number</StyledTableCell>
                  <StyledTableCell align="center">From</StyledTableCell>
                  <StyledTableCell align="center">To</StyledTableCell>
                  <StyledTableCell align="center">Departure Date/Time</StyledTableCell>
                  <StyledTableCell align="center">Arrival Date/Time</StyledTableCell>
                  <StyledTableCell align="center">Baggage Allowance</StyledTableCell>
                  <StyledTableCell align="center">Price</StyledTableCell>
                  <StyledTableCell align="center">Admin Panel</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {flights.map((row) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.flight_number}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.departure_airport}</StyledTableCell>
                    <StyledTableCell align="center">{row.arrival_airport}</StyledTableCell>
                    <StyledTableCell align="center">{row.departure_date.substring(0, 10)} | {row.departure_time}</StyledTableCell>
                    <StyledTableCell align="center">{row.arrival_date.substring(0, 10)} | {row.arrival_time}</StyledTableCell>
                    <StyledTableCell align="center"><Tooltip title={<span style={{ whiteSpace: 'pre-line' }}>{"Economy = " + row.baggage_allowance_economy + " Bags\nBusiness = " + row.baggage_allowance_business + " Bags \nFirst = " + row.baggage_allowance_first + " Bags"}</span>}>
                      <IconButton>
                        <InfoIcon />
                      </IconButton>
                    </Tooltip></StyledTableCell>

                    <StyledTableCell align="center"><Tooltip title={<span style={{ whiteSpace: 'pre-line' }}>{"Economy = " + row.price_economy + "LE\nBusiness = " + row.price_business + "LE\nFirst = " + row.price_first + "LE"}</span>}>
                      <IconButton>
                        <InfoIcon />
                      </IconButton>
                    </Tooltip></StyledTableCell>
                    <TableCell align="center">
                      <Button style={{
                        width: "70px",
                        height: "30px",
                        fontWeight: "bold"
                      }} color="success" href={`/edit-flight/${row._id}`} variant="contained">
                        Edit
                      </Button>

                      <Button style={{
                        width: "70px",
                        height: "30px",
                        fontWeight: "bold"
                      }} color="error" onClick={this.submit.bind(this, row._id)} variant="contained">
                        Delete
                      </Button>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default ShowFlightList;