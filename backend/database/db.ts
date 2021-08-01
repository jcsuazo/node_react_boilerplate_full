import mongoose from 'mongoose';
// import dotenv from 'dotenv';
let colors = require('colors/safe');
// dotenv.config({ path: './config/config.env' });

const connectDB = async (): Promise<void> => {
  const conn = await mongoose.connect(process.env.MONGO_URI as string, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log(
    colors.cyan.bold.underline(`MongoDB Connected: ${conn.connection.host}`),
  );
};

export default connectDB;
