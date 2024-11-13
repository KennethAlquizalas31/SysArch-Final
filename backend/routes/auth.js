import express from 'express';
import jwt from 'jsonwebtoken'; 
import User from '../models/User.js';

const router = express.Router();

// POST request to /register for user registration
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    // Create new user without hashing the password
    const newUser = new User({
      username,
      email,
      password,  // Store password as plain text
    });

    // Save user to DB
    await newUser.save();

    // Create JWT token for the newly registered user
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token back to the frontend
    res.status(201).json({ message: 'User registered successfully', token });

  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: `Server error during registration: ${error.message}` });
  }
});

// POST request to /login for user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists in DB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the password with the one stored in DB (no hashing, so it's plain text)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

export default router;
