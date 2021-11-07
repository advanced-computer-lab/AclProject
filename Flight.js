const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema1 = new Schema({
  num: {
    type: Number,
    required: true,
    unique: true,
  },
  dep: {
    type: String,
    required: true,
  },
  des: {
    type: String,
    required: true,
  },
  nSeats: {
    type: Number,
    required: true,
  },
  arrTime: {
    type: Date,
    required: true,
  },
  depTime: {
    type: Date,
    required: true,
  },
});

const Flight = mongoose.model("Flight", schema1);

module.exports = Flight;
