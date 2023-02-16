const mongoose = require("mongoose");
const Schema = require("mongoose");

const reviewSchema = new mongoose.Schema({
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
  text: {
    type: String,
    trim: true,
  },
});

const review = new mongoose.model('review', reviewSchema);

module.exports = review;