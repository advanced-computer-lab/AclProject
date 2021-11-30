const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  flight_number: {
    type: String,
    required: true
  },
  departure_airport: {
    type: String,
    required: true
  },
  arrival_airport: {
    type: String,
    required: true
  },
  departure_time: {
    type: String,
    required: true
  },
  arrival_time: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  economy_seats_number: {
    type: String,
    required: true
  },
  business_seats_number: {
    type: String,
    required: true
  },
  first_seats_number: {
    type: String,
    required: true
  },
  baggage_allowance: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
});

module.exports = Flight = mongoose.model('flight', FlightSchema);