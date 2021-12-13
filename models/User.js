const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  countrycode: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  telenumber1: {
    type: String,
    required: true
  },
  telenumber2: {
    type: String,
    required: false
  },
  telenumber3: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  passport: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model('user', UserSchema);