import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProfileSettings() {
  const identifier = localStorage.getItem('identifier');
  const [form, setForm] = useState({ name: '', address: '', degree: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/profile/${identifier}`)
      .then(res => setForm(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [identifier]);

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(`http://localhost:8081/api/profile/${identifier}`, form);
      alert('Profile updated!');
    } 
    catch {
      alert('Failed to update profile');
    } 
    finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error loading profile.</p>;

  return (
    <form
      onSubmit={handleSubmit}
      style={{ padding: '1rem', color: 'black', display: 'grid', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}
    >
      <h2 style={{ textAlign: 'center' }}>Profile Settings</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
        style={{ width: '100%', padding: '0.5rem', border: '1px solid Black', borderRadius: '4px' }}
      />

      <input
        type="text"
        placeholder="Address"
        value={form.address}
        onChange={e => setForm({ ...form, address: e.target.value })}
        style={{ width: '100%', padding: '0.5rem', border: '1px solid Black', borderRadius: '4px' }}
      />

      <input
        type="text"
        placeholder="Degree"
        value={form.degree}
        onChange={e => setForm({ ...form, degree: e.target.value })}
        style={{ width: '100%', padding: '0.5rem', border: '1px solid Black', borderRadius: '4px' }}
      />

      <button
        type="submit"
        disabled={saving}
        style={{ padding: '0.5rem', backgroundColor: 'DodgerBlue',  color: 'Black',  border: 'none',  borderRadius: '4px',  cursor: 'pointer'}}
      >
        {saving ? 'Saving…' : 'Save Changes'}
      </button>
    </form>
)}
