const express = require("express");
const { auth } = require('../middlewares/auth');
const uploadFunction = require('../middlewares/imageUpload');
const {
  login,
  register,
  logout,
  loginView,
  updateProfile,
  viewProfile,
  updateProfileVolunteer,
  volunteerProfile
} = require("../controllers/user/user.controller");

const route = express.Router();

route.get('/', loginView);
route.post('/login', login);
route.post('/register', register);
route.get('/logout', logout);
route.get('/profile', auth, viewProfile);
route.post('/profile', auth, updateProfile);
route.post('/profileVolunteer', auth, uploadFunction, updateProfileVolunteer);
route.get('/profil/:id', auth, volunteerProfile);

module.exports = route;
