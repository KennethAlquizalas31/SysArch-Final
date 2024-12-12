import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios to make HTTP requests
import './Donation.css'; // Import the new CSS file

const Donation = () => {
  const navigate = useNavigate();
  const [donationAmount, setDonationAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // To show a loading state while submitting
  const [showConfetti, setShowConfetti] = useState(false); // State to control the confetti animation
  const [showBalloons, setShowBalloons] = useState(false); // State to control the balloon animation
  const [shakeScreen, setShakeScreen] = useState(false); // State for the screen shake effect

  const handleDonationSubmit = async (e) => {
    e.preventDefault();

    // Check if donation amount is valid
    if (donationAmount > 0) {
      try {
        setLoading(true); // Start loading
        setMessage(''); // Clear previous messages

        // Make a POST request to the backend donation API
        const response = await axios.post(
          'http://localhost:5000/api/donate', // Ensure the URL matches your backend route
          { amount: donationAmount },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`, // Attach token from localStorage for authentication
            },
          }
        );

        // Handle success response and include the donation amount
        setMessage(response.data.message); // Show Thanksgiving message

        // Trigger the confetti and balloon animations
        setShowConfetti(true);
        setShowBalloons(true);

        // Trigger the shake effect for the screen
        setShakeScreen(true);
        setTimeout(() => {
          setShakeScreen(false); // Stop shaking after a short time
        }, 2000); // Shake for 2 seconds

        // Delay the redirect so that the message is visible before navigating
        setTimeout(() => {
          navigate('/dashboard'); // Redirect to dashboard after donation is successful
        }, 30000);

      } catch (error) {
        setLoading(false); // Stop loading
        if (error.response) {
          // If there's a response error from the server
          setMessage(error.response.data.message || 'Failed to process donation.');
        } else {
          setMessage('An error occurred while processing your donation.');
        }
      }
    } else {
      setMessage('Please enter a valid donation amount.');
    }
  };

  // Create a lot of confetti with randomized colors and positions
  const createConfetti = () => {
    const confetti = [];
    for (let i = 0; i < 400; i++) {  // Increase number of confetti pieces
      confetti.push(<div key={i} className={`confetti confetti-${i}`} style={{
        left: `${Math.random() * 100}vw`,
        animationDuration: `${Math.random() * 2 + 3}s`, // Random fall duration
        animationDelay: `${Math.random() * 2}s`, // Random delay before start
        backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`, // Random color
      }}></div>);
    }
    return confetti;
  };

  // Create a lot of balloons with random sizes and animation speed
  const createBalloons = () => {
    const balloons = [];
    for (let i = 0; i < 100; i++) { // Increase number of balloons
      balloons.push(<div key={i} className={`balloon balloon-${i}`} style={{
        width: `${Math.random() * 50 + 30}px`, // Random balloon size
        height: `${Math.random() * 70 + 50}px`, // Random balloon size
        left: `${Math.random() * 100}vw`, // Random position on the X-axis
        animationDuration: `${Math.random() * 5 + 5}s`, // Random float duration
        animationDelay: `${Math.random() * 2}s`, // Random delay before start
        backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`, // Random color
      }}></div>);
    }
    return balloons;
  };

  return (
    <div className={`donation-container ${shakeScreen ? 'shake' : ''}`}>
      <div className="donation-content">
        <h2>Make a Donation</h2>
        <form className="donation-form" onSubmit={handleDonationSubmit}>
          <input
            type="number"
            placeholder="Enter donation amount"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            min="1" // Make sure the minimum amount is 1 or more
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Donate Now'}
          </button>
        </form>
        {message && (
          <p className={`donation-message ${message.includes('error') ? 'error' : ''}`}>
            {message}
          </p>
        )}
        {/* Conditionally render confetti */}
        {showConfetti && (
          <div className="confetti-container">
            {createConfetti()}
          </div>
        )}
        {/* Conditionally render balloons */}
        {showBalloons && (
          <div className="balloon-container">
            {createBalloons()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Donation;
