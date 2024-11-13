import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUser } from 'react-icons/fa';  // Use the FaUser icon for a single person
import './Login.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      if (response.data.token) {
        await login(response.data.token); // Wait for login to complete
        navigate('/dashboard'); // Redirect to dashboard after login
      }
    } catch (error) {
      console.error(error);
      alert(error.response ? error.response.data.message : 'Login error');
    }
  };

  const goToRegistration = () => {
    navigate('/registration');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>

        {/* Logo below "Login" heading */}
        <div className="logo-container">
          <FaUser className="logo" size={60} /> {/* Single person logo */}
        </div>

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
        <button type="submit" className="login-button">
          Login
        </button>
        <button
          type="button"
          className="register-button"
          onClick={goToRegistration}
        >
          Don't have an account? Register
        </button>
      </form>
    </div>
  );
};

export default Login;
