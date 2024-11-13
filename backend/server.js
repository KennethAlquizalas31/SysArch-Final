// backend/server.js or app.js
require('dotenv').config(); // Loads environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Your MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;  // MongoDB URI from .env file
const PORT = process.env.PORT || 5000;        // Default to 5000 if PORT is not specified in .env

// MongoDB connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Your other middleware and routes...

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
