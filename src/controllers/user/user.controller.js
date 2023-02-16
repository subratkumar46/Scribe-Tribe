const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const exam = require('../../models/exam');
const student = require('../../models/student');
const volunteer = require('../../models/volunteer');
const user = require("../../models/user");
const { successResponse, errorResponse } = require("../../utils");

const login = async (req, res) => {
  try {
    const emailID = req.body.emailID;
    const password = req.body.password;
    const role = req.body.role

    // check for email exist or not
    const userData = await user.findOne({ emailID: emailID, role: role });
    if (!userData) {
      return errorResponse(req, res, "Invalid credentials!", 404);
    }

    // check for the password
    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
      res.render("login");

      // return errorResponse(req, res, 'Invalid credentials!', 404);
    } else {
      // jwt token created
      let accessToken = userData.getToken({
        exp: 60 * 60,
        secret: process.env.ACCESS_TOKEN_SECRET,
      });

      res.cookie("accessToken", accessToken);
      await userData.save();

      if (role === "student") res.redirect("/exam");
      else res.redirect("/reques");
      // return successResponse(req, res, accessToken, 200);
    }
  } catch (error) {
    console.log(error.message);
    return errorResponse(req, res, "something went wrong!", 400, {
      err: error,
    });
  }
};

const register = async (req, res) => {
  try {
    const { emailID, password, role } = new user(req.body);

    // check if email id allready exist
    const userData = await user.findOne({ emailID: emailID });

    if (userData) {
      return errorResponse(req, res, "email id allready exist", 400);
    } else {
      // creating payload
      const payload = {
        emailID,
        password,
        role,
      };

      // register new user
      const newUser = new user(payload);
      const insertUser = await newUser.save();

      console.log("Registration Successful");
      res.render("login");
      // return successResponse(req, res, insertUser, 200);
    }
  } catch (error) {
    return errorResponse(req, res, "something went wrong", 400);
  }
};

const loginView = async (req, res) => {
  res.render("login");
};

const viewProfile = async (req, res) => {
  try {
    const id = req.user._id;
    console.log(id);
    const role = req.user.role;
    if(role === 'student') {
      let userData = await student.findOne({ _id: id });

      // check if data is exist or not
      if (!userData) {
        let userData = {
          username : ' ',
          email: ' ',
          age: ' ',
          phone: ' ',
          gender: ' ',
          city: ' ',
          state: ' ',
          standard: ' ',
          school: ' '
        }
        res.render("userProfile", { users: userData });
      } else {
        res.render("userProfile", { users: userData });
      }

    } else if (role === 'volunteer') {

      let userData = await volunteer.findOne({ _id: id });
      console.log(userData);
      // check if data is exist or not
      if (!userData) {
        let userData = {
          username : ' ',
          email: ' ',
          age: ' ',
          phone: ' ',
          gender: ' ',
          city: ' ',
          state: ' ',
          language: ' ',
          qualification: ' ',
        }
        res.render("userProfileVolunteer", { users: userData });
      } else {
        res.render("userProfileVolunteer", { users: userData });
      }
    }
  } catch (error) {
    return errorResponse(req, res, "something went wrong", 400);
  }
};

const updateProfile = async (req, res) => {
  try {
    let userId = req.user._id;

    const userD = await student.findOne({ _id: userId });
    if(!userD) {
      const payload = {
        _id: userId,
        username : req.body.username,
        email: req.user.email,
        age: req.body.age,
        phone: req.body.phone,
        gender: req.body.gender,
        city: req.body.city,
        state: req.body.state,
        standard: req.body.standard,
        school: req.body.school,
      };

      // register new user
      const newUser = new student(payload);
      const insertUser = await newUser.save();
    } else {
      // updating user details
      const updateDetails = await student.findByIdAndUpdate(userId, {
        username : req.body.username,
        // email: req.body.email,
        age: req.body.age,
        phone: req.body.phone,
        gender: req.body.gender,
        city: req.body.city,
        state: req.body.state,
        standard: req.body.standard,
        school: req.body.school,
      });
    }
    const userData = await student.findOne({ _id: userId });

    if (!userData) {
      return errorResponse(req, res, "User Not Found", 404);
    } else {
      res.render("userProfile", { users: userData });
      // return successResponse(req, res, userData, 200);
    }
  } catch (error) {
    return errorResponse(req, res, "something went wrong", 400);
  }
};

const updateProfileVolunteer = async (req, res) => {
  try {
    let userId = req.user._id;
    const userD = await volunteer.findOne({ _id: userId });
    if(!userD) {
      const payload = {
        _id: userId,
        username : req.body.username,
        email: req.user.email,
        age: req.body.age,
        phone: req.body.phone,
        gender: req.body.gender,
        city: req.body.city,
        state: req.body.state,
        language: req.body.language,
        qualification: req.body.qualification,
        certi: req.file.filename
      };

      // register new user
      const newUser = new volunteer(payload);
      const insertUser = await newUser.save();
    } else {
      // updating user details
      const updateDetails = await volunteer.findByIdAndUpdate(userId, {
        username : req.body.username,
        email: req.user.email,
        age: req.body.age,
        phone: req.body.phone,
        gender: req.body.gender,
        city: req.body.city,
        state: req.body.state,
        language: req.body.language,
        qualification: req.body.qualification,
        certi: req.file.filename
      });
    }
    const userData = await volunteer.findOne({ _id: userId });

    if (!userData) {
      return errorResponse(req, res, "User Not Found", 404);
    } else {
      res.render("userProfileVolunteer", { users: userData });
      // return successResponse(req, res, userData, 200);
    }
  } catch (error) {
    console.log(error.message);
    return errorResponse(req, res, "something went wrong", 400);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    return res.redirect("/");
  } catch (error) {
    return errorResponse(req, res, "Error while logging out", 500);
  }
};

const volunteerProfile = async (req, res) => {
  try {
    let VolunteerId = req.params.id;
    let userData = await volunteer.findOne({ _id: VolunteerId });
    let examData = await exam.find({volunteerId: VolunteerId}).populate("studentId");
     res.render("viewVolunteer", { users: userData, exams: examData });
  } catch (error) {
    console.log(error.message);
    return errorResponse(req, res, "Error while logging out", 500);
  }
};

module.exports = {
  login,
  register,
  logout,
  loginView,
  viewProfile,
  updateProfile,
  updateProfileVolunteer,
  volunteerProfile
};
