const exam = require('../../models/exam');
const student = require('../../models/student');
const volunteer = require('../../models/volunteer');
const requestt = require('../../models/requestt');

const { successResponse, errorResponse } = require('../../utils');
let globalExamId;
let examIdGlobal;

// student
const viewExam = async (req, res) => {
  try {

    let userId = req.user._id;

    const examData = await exam.find({studentId: userId, status: "pending"});
    res.render("viewExamStudent", { exams: examData });
      // return successResponse(req, res, busData, 200);

  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};

// student
const viewCompleteExam = async (req, res) => {
  try {

    let userId = req.user._id;
    let status = 'accepted';
     const examData = await exam.find({
            studentId: userId, status: status
        }).populate("volunteerId");
    console.log(examData);
    res.render("viewAcceptedForStudent", { exams: examData });

  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};

// student
const addExam = async (req, res) => {
  try {

    let userId = req.user._id;
console.log("subrat",userId)
    const payload = {
      studentId: userId,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      city: req.body.city,
      language: req.body.language,
    };

    // register new user
    const newExam = new exam(payload);
    const insertExam = await newExam.save();
    console.log(insertExam)
    console.log("Exam Added Successful");
    res.redirect("/exam");
    // res.redirect('bus');
    // return successResponse(req, res, insertBus, 200);
  } catch (error) {
    console.log(error.message);
    return errorResponse(req, res, 'something went wrong', 500, { err: error });
  }
};

const addExamView = async (req, res) => {
  res.render("addExam");
};

// student
const viewVolunteerForExam = async(req, res) => {
  try {
    let examId = req.params.id;
    globalExamId = examId;
    const examData = await exam.find({_id: examId});
    let city = examData[0].city;
    const voluteerData = await volunteer.find({city: city});
    res.render("viewVolunteerByStudent", { volunteers: voluteerData });
  } catch(error) {
    console.log(error.message);
  }
}

// student
const addRequest = async(req, res) => {
  try {
    let VolunteerId = req.params.id;

    let examData = await exam.findOne({ _id: globalExamId })
    if(examData.reqVolunteer !== []) {
    if (!(examData.reqVolunteer.includes(VolunteerId))) {
      examData.reqVolunteer.push(VolunteerId);
      examData.save();
    } } else {
      examData.reqVolunteer.push(VolunteerId);
      examData.save();
    }
    res.redirect('/exam');
  } catch(error) {
    console.log(error.message);
  }
};

// volunteer
const viewRequest = async(req, res) => {
  try {

    let userId = req.user._id;
    let status = 'pending';
     const examData = await exam.find({
            reqVolunteer: { $in: userId }, status: status
        }).populate("studentId");
    res.render("viewRequest", { exams: examData });

  console.log(examData)
  } catch(error) {
    console.log(error.message);
  }
};

//volunteer
const acceptRequest = async (req, res) => {
  try {

    let userId = req.user._id;
    let examId = req.params.id;
    let status = 'accepted';
    const examData = await exam.findByIdAndUpdate(examId, { volunteerId: userId, status: status });
    console.log(examData);
    // res.render('/accept');
    res.redirect('/upcoming');

  } catch(error) {
    console.log(error.message);
  }
};

// volunteer
const upcomingExams = async (req, res) => {
  try {

    let userId = req.user._id;
    console.log(userId);
    let status = 'accepted';
    const examData = await exam.find({ volunteerId: userId, status: status }).populate("studentId");
    console.log(examData);
    res.render("viewUpcoming", { exams: examData });

  } catch(error) {
    console.log(error.message);
  }
};

const viewOwnReview = async (req, res) => {
  try {

    let userId = req.user._id;

    const examData = await exam.find({volunteerId: userId}).populate("studentId");
    console.log(examData);
    res.render("viewOwnReview", { exams: examData });

  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};

const addReview = async (req, res) => {
  try {

    let examId = examIdGlobal;
    let text = req.body.text;
    const examData = await exam.findByIdAndUpdate(examId, { text: text });
    console.log(examData);
    res.redirect('/accept');

  } catch (error) {
    console.log(error.message);
    return errorResponse(req, res, 'something went wrong', 500, { err: error });
  }
};

const addReviewView = async (req, res) => {
  examIdGlobal = req.params.id;
  res.render("addReview");
};

module.exports = { viewExam, addExam, viewCompleteExam, addExamView, viewVolunteerForExam, addRequest, viewRequest, acceptRequest, upcomingExams, addReviewView, viewOwnReview, addReview };
