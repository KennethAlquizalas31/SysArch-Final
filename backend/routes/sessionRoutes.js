import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import Session from '../models/Session.js';

const router = express.Router();

// Booking endpoint
router.post('/book', authenticate, async (req, res) => {
  try {
    const { counselor, bookingDate } = req.body;

    if (!counselor || !bookingDate) {
      return res.status(400).json({ message: 'Counselor and Booking Date are required.' });
    }

    const userId = req.userId;
    const newSession = new Session({
      user: userId,
      counselor,
      bookedAt: new Date(bookingDate),
    });

    await newSession.save();

    return res.status(200).json({
      message: `Session with ${counselor} successfully booked on ${new Date(bookingDate).toLocaleDateString()}.`,
    });
  } catch (err) {
    console.error('Error in booking session:', err);
    return res.status(500).json({ message: 'Failed to book session due to server error.' });
  }
});

// Fetch session history
router.get('/history', authenticate, async (req, res) => {
  try {
    const userId = req.userId;

    const sessions = await Session.find({ user: userId }).sort({ bookedAt: -1 });

    if (!sessions.length) {
      return res.status(404).json({ message: 'No session history found.' });
    }

    return res.status(200).json(sessions);
  } catch (err) {
    console.error('Error fetching session history:', err);
    return res.status(500).json({ message: 'Failed to fetch session history due to server error.' });
  }
});

export default router;
