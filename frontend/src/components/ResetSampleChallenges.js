// src/components/ResetSampleChallenges.js
import React, { useState } from 'react';
import axios from 'axios';

const ResetSampleChallenges = () => {
  const [message, setMessage] = useState('');

  const handleReset = async () => {
    try {
      // Call the backend endpoint to repopulate sample challenges.
      // Ensure the URL and port match your backend's configuration.
      await axios.post('http://localhost:8080/api/industry-challenges/populate');
      setMessage('Sample challenges have been reset successfully.');
    } catch (error) {
      console.error('Error resetting sample challenges:', error);
      setMessage('Failed to reset sample challenges. Please try again.');
    }
  };

  return (
    <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
      <h2>Reset Sample Challenges</h2>
      <button onClick={handleReset}>Reset Sample Challenges</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetSampleChallenges;
