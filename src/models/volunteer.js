const mongoose = require("mongoose");
const Schema = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  username: {
    type: String,
    trim: true,
  },
  email: { 
    type: String,
    trim: true,
  },
  phone: {
    type: Number,
    trim: true,
  },
  age: {
    type: Number,
    trim: true,
  },
  gender: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  language: {
    type: []
  },
  qualification: {
    type: String,
    trim: true,
  },
  certi: {
    type: String,
    trim: true,
  }
});

const volunteer = new mongoose.model('volunteer', volunteerSchema);

module.exports = volunteer;