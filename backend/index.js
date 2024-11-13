// index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';  // Import auth routes for registration/login
import profileRoutes from './routes/profile.js';  // Import profile routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Use the auth routes for /api/auth
app.use('/api/auth', authRoutes);

// Use the profile routes for /api/profile
app.use('/api', profileRoutes); // Register the profile routes under /api

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
