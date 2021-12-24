import React, { useState } from 'react';
import Seats from './Seats';
import '../App.css';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'

var economySeatsNumber = parseInt(((window.location.pathname).split("/"))[15]);
var businessSeatsNumber = parseInt(((window.location.pathname).split("/"))[16]);
var firstSeatsNumber = parseInt(((window.location.pathname).split("/"))[17]);
var reserved = String(((window.location.pathname).split("/"))[18]);
const chars = reserved.split('-');

var result;
var bookedA = chars

const myArray5 = (window.location.pathname).split("/");
var pp;
var arr2 = "";
for (var ii = 0; ii < myArray5.length; ii++){
    if (ii < 9){
        arr2 = arr2 + "/" + myArray5[ii];
    }
}

var previousPage = (arr2).replace("/seats-selection-when-changing-flight", "change-flight");
var previousPage = (previousPage).replace("/change-flight-summary", "change-flight");

const steps = [
  <Link to={previousPage}>Select departure and return flights</Link>,
  'Select plane seats',
  'Summary and confirmation',
];

const createSeats = (rows, startIndex) => {
    let i = 0;
    let j = startIndex;
    let k = 'A';
    const section = [];
    while (i < ((economySeatsNumber + businessSeatsNumber + firstSeatsNumber) / 4) && j <= rows) {
        if (k > 'D') {
            k = 'A';
            j++;
        }
        if (j < rows + 1) {
            section.push(j + k);
            k = String.fromCharCode(k.charCodeAt(0) + 1);
        }
    }
    return section;

}

const SeatsSelectionWhenChangingFlight = () => {
    const FirstClassSeats = createSeats((firstSeatsNumber) / 4, '1');
    const BusnissSeats = createSeats((businessSeatsNumber + firstSeatsNumber) / 4, String((firstSeatsNumber) / 4 + 1));
    const EconomySeats = createSeats((economySeatsNumber + firstSeatsNumber + businessSeatsNumber) / 4, String((businessSeatsNumber + firstSeatsNumber) / 4 + 1));
    const myArray1 = (window.location.pathname).split("/");
    var u;
    if (myArray1[13] === "Economy") {
        u = EconomySeats;
    }
    else if (myArray1[13] === "First") {
        u = FirstClassSeats;
    }
    else if (myArray1[13] === "Business") {
        u = BusnissSeats;
    }
    
    const [availableSeats, setAvailableSeats] = useState(u);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [bookedStatus, setBookedStatus] = useState('');
    const addSeat = (ev) => {
        if (numberOfSeats && !ev.target.className.includes('disabled')) {
            const seatsToBook = parseInt(numberOfSeats, 15, 25);
            if (bookedSeats.length <= seatsToBook) {
                if (bookedSeats.includes(ev.target.innerText)) {
                    const newAvailable = bookedSeats.filter(seat => seat !== ev.target.innerText);
                    setBookedSeats(newAvailable);
                } else if (bookedSeats.length < numberOfSeats) {
                    setBookedSeats([...bookedSeats, ev.target.innerText]);

                } else if (bookedSeats.length === seatsToBook) {
                    bookedSeats.shift();
                    setBookedSeats([...bookedSeats, ev.target.innerText]);
                }
            }
        }
    };

    const confirmBooking = () => {
        bookedSeats.forEach(seat => {
            setBookedStatus(prevState => {
                return prevState + seat + ' ';
            })
            result = (window.location.pathname).replace("seats-selection-when-changing-flight", "change-flight-summary");
        });
        const newAvailableSeats = availableSeats.filter(seat => !bookedSeats.includes(seat));
        for (var i = 0; i < bookedA.length; i++){
            delete newAvailableSeats[newAvailableSeats.indexOf(bookedA[i])];
        }
        setAvailableSeats(newAvailableSeats)
        setBookedSeats([]);
        numberOfSeats = 0;
    };
    const myArray = (window.location.pathname).split("/");
    var numberOfSeats = parseInt(myArray[4])

    window.onload = function() {
        confirmBooking();
      };

    return (

        <div className="SeatsSelection">
            <br />
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={1} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            <br />
            <div className="container">
                <div className="row">
                    <div className="col-md-10 m-auto">
                        <div class="vl"></div>
                        <div class="v2"></div>
                        <section className="lower">
                        </section>
                        <br />
                        <br />
                        <section className="color">
                            <h6>First Class Seats</h6>
                            <Seats values={FirstClassSeats}
                                availableSeats={availableSeats}
                                bookedSeats={bookedSeats}
                                addSeat={addSeat} />
                            <br />
                            <h6>Business Seats</h6>
                            <Seats values={BusnissSeats}
                                availableSeats={availableSeats}
                                bookedSeats={bookedSeats}
                                addSeat={addSeat} />
                            <br />
                            <h6>Economy Seats</h6>
                            <Seats values={EconomySeats}
                                availableSeats={availableSeats}
                                bookedSeats={bookedSeats}
                                addSeat={addSeat} />
                        </section>
                        <br />
                        <br />
                        <Button color="success" onClick={confirmBooking} href={result +"/"+ (bookedStatus.replace(/ /g, "-")).substring(0, (bookedStatus.replace(/ /g, "-")).length - 1)} variant="contained">
                            Select Seats
                        </Button>
                     </div>
                </div>
            </div>
        </div>
    );
}


export default SeatsSelectionWhenChangingFlight;