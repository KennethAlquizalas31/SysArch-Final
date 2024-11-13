// profile.js
import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to verify JWT and get user ID from token
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).send('Token is required');
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use environment variable for secret key
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(403).send('Invalid token');
  }
};

// PUT route to update profile data (no password verification)
router.put('/profile', authenticate, async (req, res) => {
  const { name, sex, address } = req.body;

  if (!name || !sex || !address) {
    return res.status(400).send('All fields (name, sex, address) are required');
  }

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { name, sex, address },
      { new: true, runValidators: true }
    ).select('-password'); // Exclude password from returned data

    if (!updatedUser) {
      return res.status(500).send('Failed to update user');
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).send('Server error while updating profile');
  }
});

export default router;
