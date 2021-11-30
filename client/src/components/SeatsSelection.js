import React, { useState } from 'react';
import Seats from './Seats';
import '../App.css';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


const steps = [
    'Select departure and return flights',
    'Select plane seats',
    'Summary and confirmation',
];

const createSeats = (rows, startIndex) => {
    let i = 0;
    let j = startIndex;
    let k = 'A';
    const section = [];
    while (i < 25 && j <= rows) {
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

const SeatsSelection = () => {
    const FirstClassSeats = createSeats(5, '1');
    const BusnissSeats = createSeats(12, '6');
    const EconomySeats = createSeats(25, '13');
    const myArray1 = (window.location.pathname).split("/");
    var u;
    if (myArray1[8] === "Economy") {
        u = EconomySeats;
    }
    else if (myArray1[8] === "First") {
        u = FirstClassSeats;
    }
    else if (myArray1[8] === "Business") {
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
        });
        const newAvailableSeats = availableSeats.filter(seat => !bookedSeats.includes(seat));
        setAvailableSeats(newAvailableSeats);
        setBookedSeats([]);
        numberOfSeats = 0;
    };
    const myArray = (window.location.pathname).split("/");
    var numberOfSeats = parseInt(myArray[6]) + parseInt(myArray[7]);

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
                <div class="vl"></div>
                <div class="v2"></div>
                <div className="row">
                    <div className="col-md-10 m-auto">
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
                            <button class="button button1" onClick={confirmBooking}>Continue Booking</button>
                        <p>{bookedStatus}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default SeatsSelection;