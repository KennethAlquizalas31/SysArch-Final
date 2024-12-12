import User from '../models/User.js'; // Import the User model
import { authenticate } from '../middleware/authMiddleware.js'; // Import the authenticate middleware

// Controller for handling session booking
export const bookSession = async (req, res) => {
  try {
    const { counselor } = req.body; // Get counselor name from the request body

    if (!counselor) {
      return res.status(400).json({ message: 'Counselor is required.' });
    }

    // Extract userId from the authenticated request (set by the authenticate middleware)
    const userId = req.userId;

    // Fetch the user from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Log booking request (for debugging purposes)
    console.log(`User ${user.username} is booking a session with counselor: ${counselor}`);

    // Respond with success message after booking the session
    return res.status(200).json({
      message: `Session with ${counselor} successfully booked for ${user.name || user.username}.`,
    });
  } catch (err) {
    console.error('Error booking session:', err);
    res.status(500).json({ message: 'Failed to book session due to server error.' });
  }
};

// Other controllers can be added here for additional functionalities
