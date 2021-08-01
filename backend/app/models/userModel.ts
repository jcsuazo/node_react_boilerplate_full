import bcrypt from 'bcryptjs';
import { userInterface } from '../interfaces/UserInterface';
import { Document, Model, model, Types, Schema, Query } from 'mongoose';
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = new Schema<userInterface>({
  firstname: {
    type: String,
    required: [true, 'Please add a name'],
  },
  lastname: {
    type: String,
    required: [true, 'Please add a lastname'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'publisher'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  confirmEmailToken: String,
  // isEmailConfirmed: {
  //   type: Boolean,
  //   default: false,
  // },
  // twoFactorCode: String,
  // twoFactorCodeExpire: Date,
  // twoFactorEnable: {
  //   type: Boolean,
  //   default: false,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const User = model<userInterface>('User', UserSchema);
// // Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// // Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// // Generate and hash password token
UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
export default User;
