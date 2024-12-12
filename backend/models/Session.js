import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  counselor: {
    type: String,
    required: true,
  },
  bookedAt: {
    type: Date,
    required: true,  // Ensure the booking date is required
  },
});

const Session = mongoose.model('Session', sessionSchema);
export default Session;
