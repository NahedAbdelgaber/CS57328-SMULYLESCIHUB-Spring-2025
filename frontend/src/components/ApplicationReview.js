import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApplicationReview = () => {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch submitted proposals from the backend and filter out accepted ones
  const fetchApplications = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/industry-challenge-proposals');
      // Filter out proposals whose associated challenge is no longer open
      const pendingProposals = response.data.filter(app => app.challenge && app.challenge.openStatus === true);
      setApplications(pendingProposals);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setMessage('Error fetching applications. Please try again later.');
    }
  };

  // Call the backend endpoint to accept an application
  const acceptApplication = async (appId) => {
    try {
      await axios.post(`http://localhost:8080/api/industry-challenge-proposals/accept/${appId}`);
      setMessage('You have successfully accepted an application. The challenge is now in progress.');
      // Refresh the list so that accepted applications are removed.
      fetchApplications();
    } catch (error) {
      console.error('Error accepting application:', error);
      // When the backend returns an error (e.g. duplicate acceptance), display a message.
      setMessage('An application has already been accepted for this challenge.');
    }
  };

  // Fetch the proposals when the component mounts
  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Review Submitted Applications</h2>
      {message && <p>{message}</p>}
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {applications.map((app) => (
            <li key={app.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
              <h3>
                {app.challenge && app.challenge.title ? app.challenge.title : 'Challenge Title'}
              </h3>
              <p>
                <strong>Proposal Description:</strong> {app.description || 'No proposal description provided.'}
              </p>
              <p>
                <strong>Estimated Timeline:</strong>{' '}
                {(app.startDate && app.endDate) ? `${app.startDate} to ${app.endDate}` : 'N/A'}
              </p>
              {app.attachments && app.attachments.length > 0 && (
                <div>
                  <strong>Attachments:</strong>
                  <ul>
                    {app.attachments.map((att, index) => (
                      <li key={index}>{att}</li>
                    ))}
                  </ul>
                </div>
              )}
              <button onClick={() => acceptApplication(app.id)}>Accept Application</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApplicationReview;
