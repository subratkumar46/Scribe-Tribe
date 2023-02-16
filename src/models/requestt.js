const mongoose = require("mongoose");
const Schema = require("mongoose");

const requestSchema = new mongoose.Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "student",
  },
  volunteerId: {
    type: Schema.Types.ObjectId,
    ref: "volunteer",
  },
  examId: {
    type: Schema.Types.ObjectId,
    ref: "exam",
  },
  status: {
    type: String,
    trim: true,
  },
});

const requestt = new mongoose.model('requestt', requestSchema);

module.exports = requestt;