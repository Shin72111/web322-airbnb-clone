const mongoose = require("mongoose");

const BookedSchema = new mongoose.Schema({
  roomID: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

const Booked = new mongoose.model("Booked", BookedSchema);

module.exports = Booked;
