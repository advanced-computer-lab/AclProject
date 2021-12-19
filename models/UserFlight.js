const mongoose = require('mongoose');

const UserFlightSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  flight_number: {
    type: String,
    required: true
  },
  flight_id: {
    type: String,
    required: true
  },
  seats_booked: {
    type: String,
    required: true
  },
  cabin: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  booking_reference: {
    type: Number,
    required: true
  }
});

module.exports = UserFlight = mongoose.model('userflight', UserFlightSchema);