import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function DeleteAccount() {
  const identifier = localStorage.getItem('identifier');
  const [confirmInput, setConfirmInput] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (confirmInput !== identifier) return;
    setSaving(true);
    try {
      const payload = identifier.includes('@') ? { email: identifier } : { username: identifier };

      await axios.delete('http://localhost:8081/api/delete', {
        data: payload,
      });

      alert('Account deleted!');
      localStorage.removeItem('identifier');
      navigate('/login');
    } 
    catch (err) {
      alert('Delete failed: ' + (err.response?.data || err.message));
    } 
    finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{ padding: '1rem', display: 'grid', gap: '1rem', maxWidth: '400px', margin: '0 auto'}}
    >
      <h2 style={{ textAlign: 'center', color: 'Red' }}>Delete Account</h2>
      <p>
        To confirm, type your username or email:&nbsp;
        <strong>{identifier}</strong>
      </p>
      <input
        type="text"
        value={confirmInput}
        onChange={e => setConfirmInput(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', border: '1px solid Black', borderRadius: '4px' }}
      />
      <button
        type="button"
        onClick={handleDelete}
        disabled={saving || confirmInput !== identifier}
        style={{ padding: '0.5rem', backgroundColor: 'Red', color: 'White', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
      >
        {saving ? 'Deleting…' : 'Delete Account'}
      </button>
    </div>
  );
}
