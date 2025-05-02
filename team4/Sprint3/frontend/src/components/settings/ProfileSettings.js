import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProfileSettings() {
  const identifier = localStorage.getItem('identifier');

  const [form, setForm] = useState({
    name: '',
    address: '',
    degree: ''
  });
  const [emailOptIn, setEmailOptIn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/profile/${identifier}`)
      .then(res => {
        setForm({
          name: res.data.name || '',
          address: res.data.address || '',
          degree: res.data.degree || ''
        });
        setEmailOptIn(Boolean(res.data.emailOptIn));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [identifier]);

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);

    try {
      await axios.put(
        `http://localhost:8081/api/profile/${identifier}`,
        form
      );

      await axios.put(
        `http://localhost:8081/api/profile/${identifier}/email-opt-in`,
        { emailOptIn }
      );

      alert('Profile & preferences updated!');
    } catch (err) {
      const msg = err.response?.data || err.message;
      alert('Failed to update profile: ' + msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error loading profile.</p>;

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: '1rem',
        display: 'grid',
        gap: '1rem',
        maxWidth: '400px',
        margin: '0 auto'
      }}
    >
      <h2 style={{ textAlign: 'center' }}>Profile Settings</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
        style={{
          width: '100%',
          padding: '0.5rem',
          border: '1px solid black',
          borderRadius: '4px'
        }}
      />

      <input
        type="text"
        placeholder="Address"
        value={form.address}
        onChange={e => setForm({ ...form, address: e.target.value })}
        style={{
          width: '100%',
          padding: '0.5rem',
          border: '1px solid black',
          borderRadius: '4px'
        }}
      />

      <input
        type="text"
        placeholder="Degree"
        value={form.degree}
        onChange={e => setForm({ ...form, degree: e.target.value })}
        style={{
          width: '100%',
          padding: '0.5rem',
          border: '1px solid black',
          borderRadius: '4px'
        }}
      />

      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <input
          type="checkbox"
          checked={emailOptIn}
          onChange={e => setEmailOptIn(e.target.checked)}
        />
        Receive email notifications
      </label>

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
        {saving ? 'Saving…' : 'Save Changes'}
      </button>
    </form>
  );
}
