import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SessionComplete.css'; // Ensure this CSS file matches your design

const SessionComplete = () => {
  // Static data for testing
  const percentages = {
    happy: 60,
    normal: 20,
    sad: 10,
    angry: 10,
  };

  // Emojis for each emotion
  const emojis = {
    happy: '😊',
    normal: '😐',
    sad: '😢',
    angry: '😡',
  };

  const dominantEmotion = Object.keys(percentages).reduce((a, b) => 
    percentages[a] > percentages[b] ? a : b
  );

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/dashboard');
  };

  return (
    <div className="session-complete-container">
      <h1 className="session-complete-header">Session Complete</h1>
      <div className="results">
        <div className="result">
          <span className="emoji">{emojis[dominantEmotion]}</span>
          <div>Dominant Emotion: {dominantEmotion.charAt(0).toUpperCase() + dominantEmotion.slice(1)}</div>
          <div>Percentage: {percentages[dominantEmotion]}%</div>
        </div>
        <div className="result">
          <div>Happy: {percentages.happy}% {emojis.happy}</div>
        </div>
        <div className="result">
          <div>Normal: {percentages.normal}% {emojis.normal}</div>
        </div>
        <div className="result">
          <div>Sad: {percentages.sad}% {emojis.sad}</div>
        </div>
        <div className="result">
          <div>Angry: {percentages.angry}% {emojis.angry}</div>
        </div>
      </div>
      <button className="back-to-dashboard-button" onClick={handleNavigate}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default SessionComplete;
