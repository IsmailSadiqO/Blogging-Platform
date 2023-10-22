const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Connect to the MongoDB Database
connectDB();

// Importing route files
const blogpost = require('./routes/blogpostRoutes');
const auth = require('./routes/authRoutes');

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// Dev logging Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers to corresponding route files
app.use('/api/v1/blogposts', blogpost);
app.use('/api/v1/auth', auth);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green
      .underline.bold
  )
);
