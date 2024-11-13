import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa'; // Import the FaUsers icon for the 3-person logo
import './Registration.css';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState(''); // New state for retype password
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== retypePassword) {
      alert("Passwords don't match. Please retype the password.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
      });

      if (response.data.message === 'User registered successfully') {
        alert('User registered successfully');
        localStorage.setItem('token', response.data.token); // Store the token
        navigate('/dashboard'); // Redirect to dashboard after successful registration
      }
    } catch (error) {
      alert('Error during registration: ' + (error.response?.data.message || 'Please try again.'));
    }
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleRegister} className="registration-form">
        <h2>Register</h2>

        {/* Logo below "Register" heading */}
        <div className="logo-container">
          <FaUsers className="logo" size={60} /> {/* 3-person logo */}
        </div>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Retype Password"
          value={retypePassword}
          onChange={(e) => setRetypePassword(e.target.value)} // Update retypePassword state
          required
        />
        <button type="submit" className="register-button">
          Register
        </button>
        <div className="login-redirect">
          <p>Already have an account?</p>
          <button onClick={() => navigate('/login')}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
