import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReservedFlightSummary from './ReservedFlightSummary';
import jwt from 'jsonwebtoken';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
var nums=[]; 
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
class ReservedFlights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: [],
      LoggedInUser: jwt.decode(localStorage.getItem('token'))
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/userflights')
      .then(res => {

        
        for (var i = 0; i < res.data.length; i++) {
          if(res.data[i].username === this.state.LoggedInUser.username){
            nums.push(res.data[i].flight_number);
            
        }
      }

      axios.get('http://localhost:8082/api/flights').then(
      res =>{
        var data = [];
        
        for (var i = 0; i < res.data.length; i++) {
          for(var j=0 ; j<nums.length;j++){
          if(res.data[i].flight_number === nums[j]){
            data.push(res.data[i]);
            
          }
        }
      } 
      this.setState({
        flights: data
      })

      }

    ).catch(err =>{
      console.log('Error from ReservedFlights2');
    })

      })
      .catch(err =>{
        console.log('Error from ReservedFlights');
      })
    

  };


  render() {
    const flights = this.state.flights;
    
    let flightList;

    if(!flights) {
      flightList = "there is no flight record!";
    } else {
      flightList = flights.map((flight, k) =>
        <ReservedFlightSummary flight={flight} key={k} />
      );
      nums=[];
    }

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

export default ReservedFlights;