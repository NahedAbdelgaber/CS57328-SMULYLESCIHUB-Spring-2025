import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogoutSettings() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('identifier');
    navigate('/login');
  };

  return (
    <div
      style={{ padding: '1rem', display: 'grid', gap: '1rem', maxWidth: '400px', margin: '0 auto'}}
    >
      <button
        onClick={handleLogout}
        style={{ padding: '0.5rem', backgroundColor: 'DodgerBlue', color: 'White', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
      >
        Logout
      </button>
    </div>
  );
}
