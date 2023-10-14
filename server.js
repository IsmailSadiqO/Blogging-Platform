const express = require('express');
const dotenv = require('dotenv');

// Importing route files
const blogposts = require('./routes/blogposts');

// Load env variables
dotenv.config({ path: './config/config.env' });

const app = express();

// Mount routers to corresponding route files
app.use('/api/v1/blogposts', blogposts)

const PORT = process.env.PORT || 8000;

app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);