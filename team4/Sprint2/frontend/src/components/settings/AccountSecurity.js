import React, { useState } from 'react';
import axios from 'axios';

export default function AccountSecurity() {
  const identifier = localStorage.getItem('identifier');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
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
      alert('Failed to change password: ' + (err.response?.data || err.message));
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
      <h2 style={{ textAlign: 'center' }}>Change Password</h2>

      <input
        type="password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={e => setCurrentPassword(e.target.value)}
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
        {saving ? 'Updating…' : 'Change Password'}
      </button>
    </form>
  );
}
