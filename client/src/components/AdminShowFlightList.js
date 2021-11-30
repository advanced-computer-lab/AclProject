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
import { Link } from 'react-router-dom'

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
                  <StyledTableCell align="center">Date</StyledTableCell>
                  <StyledTableCell align="center">Departure Time</StyledTableCell>
                  <StyledTableCell align="center">Arrival Time</StyledTableCell>
                  <StyledTableCell align="center">Baggage Allowance</StyledTableCell>
                  <StyledTableCell align="center">Price</StyledTableCell>
                  <StyledTableCell align="center">Edit Flight</StyledTableCell>
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
                    <StyledTableCell align="center">{row.date.substring(0, 10)}</StyledTableCell>
                    <StyledTableCell align="center">{row.departure_time}</StyledTableCell>
                    <StyledTableCell align="center">{row.arrival_time}</StyledTableCell>
                    <StyledTableCell align="center">{row.baggage_allowance}</StyledTableCell>
                    <StyledTableCell align="center">{row.price}</StyledTableCell>
                    <TableCell align="center">
                      <Link
                        to={`/edit-flight/${row._id}`}
                        style={{ textDecoration: 'none', color: 'red' }}
                      >
                        Edit Flight
                      </Link>
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