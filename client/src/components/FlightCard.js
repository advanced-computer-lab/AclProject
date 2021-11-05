import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const FlightCard = (props) => {
    const  flight  = props.flight;

    return(
        <div className="card-container">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/65/Emoji_u2708.svg" alt="" class="center"/>
            <div className="desc">
			    <h3>Flight #: {flight.flight_number}</h3>
                <h3>From: {flight.departure_airport}</h3>
				<h3>To: {flight.arrival_airport}</h3>
                <p>Date: {flight.date}</p>
				<h2>
                     <Link to={`/show-flight/${flight._id}`}>
                         Show Flight
                    </Link>
                </h2>
            </div>
        </div>
    )
};

export default FlightCard;