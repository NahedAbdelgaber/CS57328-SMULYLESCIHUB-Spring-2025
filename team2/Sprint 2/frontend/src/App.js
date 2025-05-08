// src/App.js
import React from 'react';
import ApplicationReview from './components/ApplicationReview';
import CompleteChallenge from './components/CompleteChallenge';
import ResetSampleChallenges from './components/ResetSampleChallenges';

function App() {
  return (
    <div>
      <h1>Company Dashboard</h1>
      {/* Component for reviewing and accepting applications */}
      <ApplicationReview />
      <hr />
      {/* Component for completing challenges */}
      <CompleteChallenge />
      <hr />
      {/* New component for resetting sample challenges */}
      <ResetSampleChallenges />
    </div>
  );
}

export default App;
