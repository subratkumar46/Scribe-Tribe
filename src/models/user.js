const mongoose = require("mongoose");
const Schema = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  emailID: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
});

userSchema.methods.getToken = function ({ exp, secret }) {
  let token;
  if (exp) {
    token = jwt.sign({ id: this._id }, secret, {
      // This time is in second
      expiresIn: exp,
    });
  } else {
    token = jwt.sign({ id: this._id }, secret);
  }

  return token;
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const user = new mongoose.model("user", userSchema);

module.exports = user;
