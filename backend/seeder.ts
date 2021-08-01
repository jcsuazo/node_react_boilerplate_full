import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
let colors = require('colors/safe');

// Load env vars
dotenv.config();

// Load models
import User from './app/models/userModel';
// import Bootcamp from './app/models/Bootcamp';
// import Course from './app/models/Course';
// import Review from './app/models/Review';

// Connect to DB
mongoose.connect(process.env.MONGO_URI as string, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Read JSON files
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'),
);

// const bootcamps = JSON.parse(
//   fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'),
// );

// const courses = JSON.parse(
//   fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'),
// );

// const reviews = JSON.parse(
//   fs.readFileSync(`${__dirname}/_data/reviews.json`, 'utf-8'),
// );

// Import into DB
const importData = async () => {
  try {
    // await Bootcamp.create(bootcamps);
    // await Course.create(courses);
    await User.create(users);
    // await Review.create(reviews);
    console.log(colors.green.inverse('Data Imported...'));
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    // await Bootcamp.deleteMany();
    // await Course.deleteMany();
    await User.deleteMany();
    // await Review.deleteMany();
    console.log(colors.red.inverse('Data Destroyed...'));
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}
// node seeder -d
// node seeder -i
