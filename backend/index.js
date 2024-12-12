import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js'; // Import auth routes for registration/login
import profileRoutes from './routes/profile.js'; // Import profile routes
import sessionRoutes from './routes/sessionRoutes.js'; // Import session routes
import donationRoutes from './routes/donationRoutes.js'; // Import donation routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Routes
app.use('/api/auth', authRoutes); // Auth routes
app.use('/api/profile', profileRoutes); // Profile routes
app.use('/api/session', sessionRoutes); // Session routes
app.use('/api/donate', donationRoutes); // Updated to match lowercase '/donate'
// Use the profile routes for /api/profile
app.use('/api', profileRoutes); // Register the profile routes under /api


// Root endpoint for testing server availability
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
