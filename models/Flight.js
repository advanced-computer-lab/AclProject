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
  departure_date: {
    type: Date,
    required: true
  },
  arrival_date: {
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
  baggage_allowance_economy: {
    type: String,
    required: true
  },
  baggage_allowance_business: {
    type: String,
    required: true
  },
  baggage_allowance_first: {
    type: String,
    required: true
  },
  price_economy: {
    type: String,
    required: true
  },
  price_business: {
    type: String,
    required: true
  },
  price_first: {
    type: String,
    required: true
  },
  trip_duration: {
    type: String,
    required: true
  },
  BookedSeats1:{
    type: Array,
    required: true
  }
});

module.exports = Flight = mongoose.model('flight', FlightSchema);