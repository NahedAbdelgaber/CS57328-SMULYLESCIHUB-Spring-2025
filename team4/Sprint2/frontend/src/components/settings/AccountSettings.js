import React, { useState } from 'react';
import axios from 'axios';

export default function AccountSettings() {
  const identifier = localStorage.getItem('identifier');  
  const [newUsername, setNewUsername] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = identifier.includes('@') ? { email: identifier } : { username: identifier };

    try {
      await axios.put(
        `http://localhost:8081/api/reset/username/${encodeURIComponent(newUsername)}`,
        payload
      );
      alert('Username changed!');
      setNewUsername('');
      if (!identifier.includes('@')) {
        localStorage.setItem('identifier', newUsername);
      }
    } 
    catch (err) {
      alert('Failed to change username: ' + (err.response?.data || err.message));
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
      <h2 style={{ textAlign: 'center' }}>Change Username</h2>

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
        {saving ? 'Saving…' : 'Change Username'}
      </button>
    </form>
  );
}
