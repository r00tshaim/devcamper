const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const colors = require('colors');
const fileupload = require('express-fileupload');
const errorHandler = require('./middleware/error')
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');


// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to DB
connectDB();

// Route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');

const app = express();

// Body parser
app.use(express.json());

// File Uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: 'a' });
    app.use(morgan('dev', { stream: accessLogStream }));
}


// Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server
    server.close(() => process.exit(1));
});