// controllers/DonationController.js
import Donation from '../models/Donations.js';
import User from '../models/User.js'; // Assuming you have a User model to get the user's name

// Controller to handle donation creation
export const createDonation = async (req, res) => {
  try {
    const { amount } = req.body; // Get the amount from the request body

    // Check if the amount is valid
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Donation amount must be greater than zero.' });
    }

    const userId = req.userId; // Get the userId from the token

    // Find the user to get their name
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Create a new donation object
    const donation = new Donation({
      user: userId,
      amount,
    });

    // Save the donation to the database
    await donation.save();

    // Send a Thanksgiving message with the user's name and donation amount
    return res.status(200).json({
      message: `Happy Thanksgiving, ${user.name}! Thank you for your generous donation of $${amount}.`,
    });
  } catch (error) {
    console.error('Error processing donation:', error);
    return res.status(500).json({ message: 'Failed to process donation due to server error.' });
  }
};

// Optionally: Add a function to fetch all donations for the user
export const getUserDonations = async (req, res) => {
  try {
    const userId = req.userId;
    const donations = await Donation.find({ user: userId });

    return res.status(200).json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    return res.status(500).json({ message: 'Failed to fetch donations.' });
  }
};
