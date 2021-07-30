import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParse from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import helmet from 'helmet';

export default function createServer() {
  // Load env vars
  dotenv.config({ path: './config/config.env' });

  // Connect to database
  //   connectDB();

  // Route files
  //   const bootcamps = require('./routes/bootcamps');
  //   const courses = require('./routes/courses');
  //   const auth = require('./routes/auth');
  //   const users = require('./routes/users');
  //   const reviews = require('./routes/reviews');

  const app = express();

  // Body parser
  app.use(express.json());

  // Cookie Parser
  app.use(cookieParse());

  // Dev logging middleware
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  // File uploading middleware
  //   app.use(fileupload());

  // Enable CORS
  app.use(cors());

  // Sanitize Data
  app.use(mongoSanitize());

  // Prevent xss attacks
  app.use(xss());

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, //10 mins
    max: 100,
  });
  app.use(limiter);

  //Prevent http param pollution
  app.use(hpp());

  // Set security headers
  app.use(helmet());
  //   app.use(
  //     helmet({
  //       contentSecurityPolicy: {
  //         useDefaults: true,
  //         directives: {
  //           ...helmet.contentSecurityPolicy.getDefaultDirectives(),
  //           'script-src': ["'self'", "'unsafe-inline'", 'http://localhost:5000/'],
  //         },
  //       },
  //     }),
  //   );

  //Set static folder
  app.use(express.static(path.join(__dirname, 'public')));

  //Mount routers
  let version = '/api/v1';
  //   app.use(`${version}/bootcamps`, bootcamps);
  //   app.use(`${version}/courses`, courses);
  //   app.use(`${version}/auth`, auth);
  //   app.use(`${version}/users`, users);
  //   app.use(`${version}/reviews`, reviews);

  // app.get('/', (request, response) => {
  //   response.send('Hello from express');
  // });

  //Error Handler Middleware
  //   app.use(errorHandler);

  return app;
}
