import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [identifier, setIdentifier] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const url = `http://localhost:8081/api/reset/password/${encodeURIComponent(newPassword)}`;
    const payload = identifier.includes('@') ? { email: identifier } : { username: identifier };

    try {
      await axios.put(url, payload);
      alert('Password reset successful!');
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

  //Testing to resend repo

  return (
    <form
      onSubmit={handleSubmit}
      style={{ padding: '1rem', display: 'grid', gap: '1rem', maxWidth: '400px', margin: '0 auto'}}
    >
      <h2 style={{ textAlign: 'center' }}>Reset Password</h2>

      <input
        type="text"
        placeholder="Username or Email"
        value={identifier}
        onChange={e => setIdentifier(e.target.value)}
        required
        style={{ width: '100%', padding: '0.5rem', border: '1px solid Black', borderRadius: '4px'}}
      />

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
        required
        style={{ width: '100%', padding: '0.5rem', border: '1px solid Black', borderRadius: '4px'}}
      />

      <button
        type="submit"
        disabled={saving}
        style={{ padding: '0.5rem', backgroundColor: 'DodgerBlue', color: 'White', border: 'none', borderRadius: '4px', cursor: saving ? 'default' : 'pointer'}}
      >
        {saving ? 'Submitting…' : 'Submit'}
      </button>
    </form>
  );
}
