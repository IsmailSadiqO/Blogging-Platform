const express = require('express');
const dotenv = require('dotenv');
// const logger = require('./middleware/logger');
const morgan = require('morgan');

// Importing route files
const blogpost = require('./routes/blogpostRoutes');

// Load environment variables
dotenv.config({ path: './config/config.env' });

const app = express();

// Dev logging Middleware
// app.use(logger);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers to corresponding route files
app.use('/api/v1/blogposts', blogpost);

const PORT = process.env.PORT || 8000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
