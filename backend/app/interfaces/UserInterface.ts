import { Document } from 'mongoose';

export interface userInterface extends Document {
  firstname: string;
  lastname: string;
  role?: string;
  email: string;
  password: string;
  // resetPasswordToken?: String;
  // resetPasswordExpire?: Date;
  // confirmEmailToken?: String;
  createdAt?: Date;
  resetPasswordToken?: string;
  resetPasswordExpire?: number;
}

// export interface UserDocument extends IUser, Document {
//   matchPassword(enteredPassword: string): Promise<boolean>;
// }
