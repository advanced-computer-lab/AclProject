import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import jwt from 'jsonwebtoken'

var token = localStorage.getItem('token')
var user;

const ReservedFlightSummary = (props) => {
    const  flight  = props.flight;

    return(
        <div className="card-container">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/65/Emoji_u2708.svg" alt="" class="center"/>
            <div className="desc">
			    <h3>Flight #: {flight.flight_number} </h3>
                <h3>From: {flight.departure_airport}  &nbsp; To: {flight.arrival_airport}</h3>
				<h3>Departure: {flight.departure_time}  &nbsp; Arrival: {flight.arrival_time}</h3>
                <p>Date: {flight.date.substring(0, 10)}</p>
				<h2>
                <Link to={`/reserved-show-flight/${flight._id}`}>
                         Show Flight
                    </Link>
                <br />
                </h2>
            </div>
        </div>
    )
};

export default ReservedFlightSummary;