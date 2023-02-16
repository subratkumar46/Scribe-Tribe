const exam = require('../../models/exam');
const student = require('../../models/student');
const volunteer = require('../../models/volunteer');
const review = require('../../models/review');

const { successResponse, errorResponse } = require('../../utils');

const viewOwnReview = async (req, res) => {
  try {

    let userId = req.user._id;

    const examData = await exam.find({volunteerId: userId});
    res.render("viewOwnReview", { exams: examData });

  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};

const addReview = async (req, res) => {
  try {

    let userId = req.user._id;
    let examId = req.params.id;
    let text = req.body.text;
    const examData = await exam.findByIdAndUpdate(examId, { text: text });
    console.log(examData);
    res.render("viewRequest", { exams: examData });

  } catch (error) {
    console.log(error.message);
    return errorResponse(req, res, 'something went wrong', 500, { err: error });
  }
};

const addReviewView = async (req, res) => {
  res.render("addReview");
};

module.exports = { addReviewView, viewOwnReview, addReview };
