const mongoose = require("mongoose");
const Schema = require("mongoose");

const examSchema = new mongoose.Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "student",
  },
  studentName: {
    type: String,
    trim: true,
  },
  volunteerId: {
    type: Schema.Types.ObjectId,
    ref: "volunteer",
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  language: {
    type: String,
    default: "english",
    trim: true,
  },
  status: {
    type: String,
    default: "pending",
    trim: true,
  },
  reqVolunteer : {
    type: [Schema.Types.ObjectId],
  },
  text: {
    type: String,
    default: ' ',
    trim: true,
  },
});

const exam = new mongoose.model('exam', examSchema);

module.exports = exam;