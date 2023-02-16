const mongoose = require("mongoose");
const Schema = require("mongoose");

const studentSchema = new mongoose.Schema({
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
  },
  gender: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  standard: {
    type: String
  },
  school: {
    type: String
  }
});

const student = new mongoose.model('student', studentSchema);

module.exports = student;