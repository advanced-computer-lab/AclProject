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
});

module.exports = UserFlight = mongoose.model('userflight', UserFlightSchema);