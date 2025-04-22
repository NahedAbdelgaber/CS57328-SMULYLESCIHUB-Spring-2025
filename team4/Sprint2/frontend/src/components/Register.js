import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    address: '',
    degree: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/api/register', form);
      alert('Registration successful!');
      navigate('/login');
    } 
    catch (err) {
      alert('Registration failed: ' + (err.response?.data || err.message));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ padding: '1rem', display: 'grid', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}
    >
      <h2 style={{ textAlign: 'center' }}>Create Account</h2>

      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={e => setForm({ ...form, username: e.target.value })}
        required
        style={{ width: '100%', padding: '0.5rem', border: '1px solid Black', borderRadius: '4px' }}
      />

      <input
        type="email"
        placeholder="Email@example.com"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        required
        style={{ width: '100%', padding: '0.5rem', border: '1px solid Black', borderRadius: '4px' }}
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        required
        style={{ width: '100%', padding: '0.5rem', border: '1px solid Black', borderRadius: '4px' }}
      />

      <input
        type="text"
        placeholder="Full Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
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
        style={{ padding: '0.5rem', backgroundColor: 'DodgerBlue', color: 'Black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Register
      </button>
    </form>
  );
}
