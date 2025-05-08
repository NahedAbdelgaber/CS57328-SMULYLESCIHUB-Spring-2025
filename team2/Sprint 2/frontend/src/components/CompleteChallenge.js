import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompleteChallenge = () => {
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState('');
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch challenges and filter for ones that are "In Progress"
  const fetchActiveChallenges = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/industry-challenges');
      console.log('Returned challenges:', response.data);
      response.data.forEach(challenge => console.log(challenge));
      const active = response.data.filter(challenge => challenge.openStatus === true);
      setChallenges(active);
    } catch (error) {
      console.error("Error fetching challenges:", error);
      setMessage("Error fetching challenges. Please try again later.");
    }
  };
  
  useEffect(() => {
    fetchActiveChallenges();
  }, []);

  // When the user clicks "Mark as Completed"
  const handleMarkCompleted = (challenge) => {
    setSelectedChallenge(challenge);
    setConfirmationVisible(true);
    setMessage('');
  };

  // Cancel the completion process
  const cancelCompletion = () => {
    setSelectedChallenge(null);
    setFeedback('');
    setRating('');
    setConfirmationVisible(false);
    setMessage('Completion cancelled.');
  };

  // Send the completion request to the backend
  const confirmCompletion = async () => {
    const payload = { feedback, rating };
    try {
      // This endpoint should update the challenge status to "Completed" and record the feedback.
      await axios.post(`http://localhost:8080/api/industry-challenges/complete/${selectedChallenge.id}`, payload);
      setMessage("Challenge has been marked as completed.");
      setSelectedChallenge(null);
      setFeedback('');
      setRating('');
      setConfirmationVisible(false);
      // Refresh the active challenges list (the just-completed challenge should no longer be active)
      fetchActiveChallenges();
    } catch (error) {
      console.error("Error completing challenge:", error);
      setMessage("Error marking challenge as completed. Please try again.");
    }
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Active Challenges</h2>
      {message && <p>{message}</p>}
      {challenges.length === 0 ? (
        <p>No active challenges found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {challenges.map(challenge => (
            <li key={challenge.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
              <h3>{challenge.title || 'Challenge Title'}</h3>
              <p>
                <strong>Description:</strong> {challenge.description}
              </p>
              <p>
                <strong>Status:</strong> {challenge.status}
              </p>
              <button onClick={() => handleMarkCompleted(challenge)}>
                Mark as Completed
              </button>
            </li>
          ))}
        </ul>
      )}

      {confirmationVisible && selectedChallenge && (
        <div style={{ marginTop: '2rem', border: '1px solid #007bff', padding: '1rem' }}>
          <h3>Complete Challenge: {selectedChallenge.title}</h3>
          <p>Please confirm completion and provide feedback for the solution.</p>
          <div>
            <label>
              Feedback:
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows="4"
                cols="50"
                style={{ width: '100%' }}
              />
            </label>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label>
              Rating (1-5):
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                style={{ width: '50px', marginLeft: '0.5rem' }}
              />
            </label>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <button onClick={confirmCompletion} style={{ marginRight: '1rem' }}>
              Confirm Completion
            </button>
            <button onClick={cancelCompletion}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompleteChallenge;
