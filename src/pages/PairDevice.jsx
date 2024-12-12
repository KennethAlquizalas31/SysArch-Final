import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PairDevice.css'; // Ensure this file is correctly imported

const PairDevice = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();

  const handleConnectDevice = () => {
    setIsConnecting(true); // Start connecting
    setTimeout(() => {
      setIsConnecting(false); // End connecting
      setIsConnected(true); // Show connected state
    }, 3000); // Simulate a 3-second delay
  };

  const handleConfirm = () => {
    navigate('/session-start'); // Navigate to the SessionStart component
  };

  return (
    <div className="pair-device-container">
      <h1 className="pair-device-header">Pair Your Device</h1>
      {!isConnected ? (
        <div className="pair-device-content">
          <p>Click the button below to connect your device.</p>
          <button
            className={`connect-button ${isConnecting ? 'disabled' : ''}`}
            onClick={handleConnectDevice}
            disabled={isConnecting}
          >
            {isConnecting ? 'Connecting...' : 'Connect Device'}
          </button>
        </div>
      ) : (
        <div className="pair-device-confirmation">
          <p>Device is connected successfully!</p>
          <button className="ok-button" onClick={handleConfirm}>
            Okay
          </button>
        </div>
      )}
    </div>
  );
};

export default PairDevice;
