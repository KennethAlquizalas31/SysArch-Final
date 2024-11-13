import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';
import { FaDollarSign, FaBox, FaClipboardList, FaMale, FaFemale, FaUsers } from 'react-icons/fa'; // Import relevant icons
import axios from 'axios';

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [userGender, setUserGender] = useState('');
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('profile'));
    if (savedProfile && savedProfile.name) {
      setUserName(savedProfile.name);
      setUserGender(savedProfile.gender || ''); // Load gender if available
      setProfileLoaded(true);
    } else {
      const fetchUserData = async () => {
        try {
          const { data } = await axios.get('/api/profile', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          setUserName(data.name);
          setUserGender(data.gender || ''); // Store gender if provided
          setProfileLoaded(true);
          localStorage.setItem('profile', JSON.stringify(data));
        } catch (error) {
          console.error('Error fetching user data:', error.response || error.message);
        }
      };
      fetchUserData();
    }
  }, []);

  const renderGenderIcon = () => {
    if (userGender === 'Male') return <FaMale className="user-icon" />;
    if (userGender === 'Female') return <FaFemale className="user-icon" />;
    return <FaUsers className="user-icon" />; // Default icon if gender is other or not specified
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <br />
        <div className="dashboard-header">
          {renderGenderIcon()}
          <h2>{profileLoaded ? `Welcome, ${userName}` : 'Welcome to Dashboard'}</h2>
        </div>

        <div className="dashboard-main">
          <div className="dashboard-stats">
            <div className="stat-card">
              <FaDollarSign size={40} />
              <h4>Sales</h4>
            </div>
            <div className="stat-card">
              <FaClipboardList size={40} />
              <h4>Orders</h4>
            </div>
            <div className="stat-card">
              <FaBox size={40} />
              <h4>Products</h4>
            </div>
          </div>
        </div>

        <div className="dashboard-links">
          <nav>
            <ul>
              <li>
                <Link to="/profile" className="profile-nav-link">
                  <span className="profile-nav-text">Go to Profile</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
