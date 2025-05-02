import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PasswordStrength from '../PasswordStrength';

export default function ResetPassword() {
  const [identifier, setIdentifier] = useState('');
  const [newPassword, setNewPassword]   = useState('');
  const [showPwd, setShowPwd]           = useState(false);
  const [saving, setSaving]             = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
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
      const msg = err.response?.data || err.message || 'Unknown error';
      alert('Reset failed: ' + msg);
    } 
    finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ padding: '1rem', display: 'grid', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}
    >
      <h2 style={{ textAlign: 'center' }}>Reset Password</h2>

      <input
        type="text"
        placeholder="Username or Email"
        value={identifier}
        onChange={e => setIdentifier(e.target.value)}
        required
        style={{ padding: '0.5rem', border: '1px solid black', borderRadius: '4px', width: '100%' }}
      />

      <div style={{ position: 'relative' }}>
        <input
          type={showPwd ? 'text' : 'password'}
          placeholder="New Password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
          style={{ padding: '0.5rem', border: '1px solid black', borderRadius: '4px', width: '100%' }}
        />
        <button
          type="button"
          onClick={() => setShowPwd(!showPwd)}
          style={{
            position: 'absolute',
            right: '0.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            border: 'none',
            background: 'none',
            cursor: 'pointer'
          }}
        >
          {showPwd ? 'Hide' : 'Show'}
        </button>
      </div>

      <PasswordStrength password={newPassword} />

      <button
        type="submit"
        disabled={saving}
        style={{
          padding: '0.5rem',
          backgroundColor: 'DodgerBlue',
          color: 'White',
          border: 'none',
          borderRadius: '4px',
          cursor: saving ? 'default' : 'pointer'
        }}
      >
        {saving ? 'Submitting…' : 'Submit'}
      </button>
    </form>
  );
}
