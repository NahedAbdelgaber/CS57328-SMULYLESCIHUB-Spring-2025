import React, { useState } from 'react';
import axios from 'axios';
import PasswordStrength from '../PasswordStrength';

export default function AccountSecurity() {
  const identifier        = localStorage.getItem('identifier');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword]         = useState('');
  const [showCurrent, setShowCurrent]         = useState(false);
  const [showNew, setShowNew]                 = useState(false);
  const [saving, setSaving]                   = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = identifier.includes('@') ? { email: identifier } : { username: identifier };

      await axios.put(
        `http://localhost:8081/api/reset/password/${encodeURIComponent(newPassword)}`,
        payload
      );
      alert('Password changed!');
      setCurrentPassword('');
      setNewPassword('');
    } 
    catch (err) {
      const msg = err.response?.data || err.message;
      alert('Failed to change password: ' + msg);
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
      <h2 style={{ textAlign: 'center' }}>Change Password</h2>

      <div style={{ position: 'relative' }}>
        <input
          type={showCurrent ? 'text' : 'password'}
          placeholder="Current Password"
          value={currentPassword}
          onChange={e => setCurrentPassword(e.target.value)}
          required
          style={{ padding: '0.5rem', border: '1px solid black', borderRadius: '4px', width: '100%' }}
        />
        <button
          type="button"
          onClick={() => setShowCurrent(!showCurrent)}
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
          {showCurrent ? 'Hide' : 'Show'}
        </button>
      </div>

      <div style={{ position: 'relative' }}>
        <input
          type={showNew ? 'text' : 'password'}
          placeholder="New Password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
          style={{ padding: '0.5rem', border: '1px solid black', borderRadius: '4px', width: '100%' }}
        />
        <button
          type="button"
          onClick={() => setShowNew(!showNew)}
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
          {showNew ? 'Hide' : 'Show'}
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
        {saving ? 'Updating…' : 'Change Password'}
      </button>
    </form>
  );
}
