import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Session.css';

const Session = () => {
  const [availableCounselors, setAvailableCounselors] = useState([]);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        setIsLoading(true);
        const mockCounselors = [
          {
            id: 1,
            name: 'Counselor Joem Pacaña',
            age: 31,
            qualification: 'Doctorate in Psychology',
            specialization: 'Stress Management',
          },
          {
            id: 2,
            name: 'Counselor Roch Plando',
            age: 35,
            qualification: 'Masters in Counseling',
            specialization: 'Career Guidance',
          },
        ];
        setAvailableCounselors(mockCounselors);
        setError('');
      } catch (err) {
        console.error('Error fetching counselors:', err);
        setError('Failed to fetch counselors.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCounselors();
  }, []);

  const handleBooking = async () => {
    if (!selectedCounselor || !bookingDate) {
      alert('Please select a counselor and a booking date.');
      return;
    }

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/session/book',
        { counselor: selectedCounselor.name, bookingDate },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setBookingConfirmed(true);
      alert(data.message);

      setTimeout(() => {
        navigate('/dashboard');
      }, 5000);
    } catch (err) {
      console.error('Error booking session:', err.response ? err.response.data : err);
      alert('Failed to book session.');
    }
  };

  return (
    <div className="session-container">
      <h1 className="session-header">Book a Counseling Session</h1>

      {error && <p className="error">{error}</p>}

      {isLoading ? (
        <p>Loading counselors...</p>
      ) : (
        <div className="session-form-container">
          <h3 className="form-header">Select a Counselor:</h3>
          {availableCounselors.map((counselor) => (
            <div
              key={counselor.id}
              className={`counselor-card ${selectedCounselor?.id === counselor.id ? 'selected' : ''}`}
              onClick={() => setSelectedCounselor(counselor)}
            >
              <strong>{counselor.name}</strong>
              <p>Age: {counselor.age}</p>
              <p>Qualification: {counselor.qualification}</p>
              <p>Specialization: {counselor.specialization}</p>
            </div>
          ))}

          <div className="input-group">
            <label>
              Booking Date:
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="input-field"
              />
            </label>
          </div>

          <button onClick={handleBooking} className="book-button">
            Book Session
          </button>
        </div>
      )}

      {bookingConfirmed && selectedCounselor && (
        <div className="confirmation">
          <h3>Booking Confirmed!</h3>
          <p>
            Your session with <strong>{selectedCounselor.name}</strong> has been successfully booked for{' '}
            <strong>{new Date(bookingDate).toLocaleDateString()}</strong>.
          </p>
        </div>
      )}
    </div>
  );
};

export default Session;
