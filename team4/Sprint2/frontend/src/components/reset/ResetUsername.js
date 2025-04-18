import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ResetUsername() {
  const [email, setEmail] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const url = `http://localhost:8081/api/reset/username/${encodeURIComponent(newUsername)}`;
    try {
      await axios.put(url, { email });
      alert('Username reset successful!');
      navigate('/login');
    } 
    catch (err) {
      const serverMsg = err.response?.data || err.message || 'Unknown error';
      alert('Reset failed: ' + serverMsg);
    } 
    finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ padding: '1rem', display: 'grid', gap: '1rem', maxWidth: '400px', margin: '0 auto'}}
    >
      <h2 style={{ textAlign: 'center' }}>Reset Username</h2>

      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={{ width: '100%', padding: '0.5rem', border: '1px solid Black', borderRadius: '4px'}}
      />

      <input
        type="text"
        placeholder="New Username"
        value={newUsername}
        onChange={e => setNewUsername(e.target.value)}
        required
        style={{ width: '100%', padding: '0.5rem', border: '1px solid Black', borderRadius: '4px'}}
      />

      <button
        type="submit"
        disabled={saving}
        style={{ padding: '0.5rem', backgroundColor:'DodgerBlue', color: 'White', border: 'none', borderRadius: '4px', cursor: saving ? 'default' : 'pointer'}}
      >
        {saving ? 'Submitting…' : 'Submit'}
      </button>
    </form>
  );
}
