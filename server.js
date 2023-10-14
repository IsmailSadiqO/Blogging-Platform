const express = require('express');
const dotenv = require('dotenv');
// const logger = require('./middleware/logger');
const morgan = require('morgan');
const colors = require('colors');
// const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const errorHandler = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Connect to the MongoDB Database
connectDB();

// Importing route files
const blogpost = require('./routes/blogpostRoutes');

const app = express();

// Body parser
app.use(express.json());

// Dev logging Middleware
// app.use(logger);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers to corresponding route files
app.use('/api/v1/blogposts', blogpost);

app.use(errorHandler);
// app.use(notFound);

const PORT = process.env.PORT || 8000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green
      .underline.bold
  )
);
