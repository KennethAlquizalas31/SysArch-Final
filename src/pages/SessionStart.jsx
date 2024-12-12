import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SessionStart.css'; // Import the corresponding CSS file

const SessionStart = () => {
  const [mood, setMood] = useState('');
  const [percentages, setPercentages] = useState({
    happy: 0,
    normal: 0,
    sad: 0,
    angry: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentages({
        happy: getRandomPercentage(),
        normal: getRandomPercentage(),
        sad: getRandomPercentage(),
        angry: getRandomPercentage(),
      });
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const getRandomPercentage = () => Math.floor(Math.random() * 101); // Random number between 0 and 100

  const handleEndSession = () => {
    navigate('/session-complete', { state: { percentages } }); // Pass the percentages to SessionComplete
  };

  const findDominantMood = () => {
    const maxPercentage = Math.max(...Object.values(percentages));
    const dominantMood = Object.keys(percentages).find(mood => percentages[mood] === maxPercentage);
    return dominantMood;
  };

  useEffect(() => {
    setMood(findDominantMood());
  }, [percentages]);

  return (
    <div className="session-start-container">
      <h1 className="session-start-header">Mood Speedometer</h1>
      <div className="speedometer-container">
        <div className="speedometer">
          <div className="needle" style={{ transform: `rotate(${moodAngle(mood)}deg)` }}></div>
          <div className="emoji">{getEmojiForMood(mood)}</div>
        </div>
        <div className="mood-labels">
          <div className="mood-button">Current Mood: {mood}</div>
        </div>
      </div>
      <div className="percentage-container">
        <div className="percentage-label">Happy: {percentages.happy}%</div>
        <div className="percentage-label">Normal: {percentages.normal}%</div>
        <div className="percentage-label">Sad: {percentages.sad}%</div>
        <div className="percentage-label">Angry: {percentages.angry}%</div>
      </div>
      <button className="end-session-button" onClick={handleEndSession}>
        End Session
      </button>
    </div>
  );
};

const getEmojiForMood = (mood) => {
  switch (mood) {
    case 'happy':
      return '😊';
    case 'normal':
      return '😐';
    case 'sad':
      return '😢';
    case 'angry':
      return '😡';
    default:
      return '😶'; // Default when no mood is selected
  }
};

const moodAngle = (mood) => {
  switch (mood) {
    case 'happy':
      return 45; // Angle for "Happy"
    case 'normal':
      return 135; // Angle for "Normal"
    case 'sad':
      return 225; // Angle for "Sad"
    case 'angry':
      return 315; // Angle for "Angry"
    default:
      return 0; // Default angle when no mood is selected
  }
};

export default SessionStart;
