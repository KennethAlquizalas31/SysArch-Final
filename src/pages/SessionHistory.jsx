import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SessionHistory.css';

const SessionHistory = () => {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessionHistory = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get('http://localhost:5000/api/session/history', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setSessions(data);
        setError('');
      } catch (err) {
        console.error('Error fetching session history:', err.response ? err.response.data : err);
        setError('Failed to fetch session history.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessionHistory();
  }, []);

  return (
    <div className="session-history-container">
      <h1 className="session-history-header">Session History</h1>

      {error && <p className="error">{error}</p>}
      {isLoading ? (
        <p>Loading session history...</p>
      ) : (
        <div className="session-history-list">
          {sessions.length > 0 ? (
            sessions.map((session, index) => (
              <div key={index} className="session-card">
                <p><strong>Counselor:</strong> {session.counselor}</p>
                <p><strong>Booking Date:</strong> {new Date(session.bookedAt).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>No session history available.</p>
          )}
        </div>
      )}

      <button onClick={() => navigate('/dashboard')} className="back-button">
        Back to Dashboard
      </button>
    </div>
  );
};

export default SessionHistory;
