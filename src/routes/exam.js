const express = require('express');
const { auth } = require("../middlewares/auth");

const {
  viewExam,
  addExam,
  addExamView,
  viewVolunteerForExam,
  addRequest,
  viewRequest,
  upcomingExams,
  acceptRequest,
  viewOwnReview,
  addReview,
  addReviewView,
  viewCompleteExam
} = require('../controllers/user/exam.controller');

const route = express.Router();

route.get('/exam', auth, viewExam);
route.get('/accept', auth, viewCompleteExam);
route.post('/exam', auth, addExam);
route.get('/addexam', auth, addExamView);
route.get('/volunteer/:id', auth, viewVolunteerForExam);
route.get('/request/:id', auth, addRequest);
route.get('/reques', auth, viewRequest);
route.get('/requestAccept/:id', auth, acceptRequest);
route.get('/upcoming', auth, upcomingExams);
route.get("/myreview", auth, viewOwnReview);
route.post('/review', auth, addReview);
route.get('/addreview/:id', auth, addReviewView);

module.exports = route;