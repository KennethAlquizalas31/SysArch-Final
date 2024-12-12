// routes/donationRoutes.js
import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js'; // Ensure correct path for authMiddleware
import { createDonation, getUserDonations } from '../controllers/DonationController.js'; // Import controller functions

const router = express.Router();

// Donation route to handle donation creation (POST /api/donate)
router.post('/', authenticate, createDonation); // Use POST method to call createDonation controller

// Optional: Route to fetch all donations for the authenticated user (GET /api/donate)
router.get('/', authenticate, getUserDonations); // Use GET method for fetching donations

export default router;
