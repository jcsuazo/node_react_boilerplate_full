import bcrypt from 'bcryptjs';
import { userInterface } from '../interfaces/UserInterface';
import { Document, Model, model, Types, Schema, Query } from 'mongoose';

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
    enum: ['user', 'admin'],
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
  //   isEmailConfirmed: {
  //     type: Boolean,
  //     default: false,
  //   },
  //   twoFactorCode: String,
  //   twoFactorCodeExpire: Date,
  //   twoFactorEnable: {
  //     type: Boolean,
  //     default: false,
  //   },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const User = model<userInterface>('User', UserSchema);

export default User;
