import React from 'react';
import { Link } from 'react-router-dom';


export default function LandingPage() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to Lyle CS Hub</h1>
      <p>World Changers are made here!</p>
      <Link
        to="/login"
        style={{ display: 'inline-block', padding: '0.5rem 1rem', backgroundColor: 'DodgerBlue', color: 'White', textDecoration: 'none', borderRadius: '4px' }}
      >
        Get Started
      </Link>
    </div>
  );
}

