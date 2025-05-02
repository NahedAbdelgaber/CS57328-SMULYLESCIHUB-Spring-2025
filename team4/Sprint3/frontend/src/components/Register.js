import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PasswordStrength from './PasswordStrength';

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '', 
    password: '',
    name: '', 
    address: '', 
    degree: ''
  });
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/api/register', form);
      alert('Registration successful!');
      navigate('/login');
    } 
    catch (err) {
      const msg = err.response?.data || err.message;
      alert('Registration failed: ' + msg);
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
        style={{ padding: '0.5rem', border: '1px solid black', borderRadius: '4px', width: '100%' }}
      />

      <input
        type="email"
        placeholder="Email@example.com"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        required
        style={{ padding: '0.5rem', border: '1px solid black', borderRadius: '4px', width: '100%' }}
      />

      <div style={{ position: 'relative' }}>
        <input
          type={showPwd ? 'text' : 'password'}
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
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

      <PasswordStrength password={form.password} />

      <input
        type="text"
        placeholder="Full Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        style={{ padding: '0.5rem', border: '1px solid black', borderRadius: '4px', width: '100%' }}
      />

      <input
        type="text"
        placeholder="Address"
        value={form.address}
        onChange={e => setForm({ ...form, address: e.target.value })}
        style={{ padding: '0.5rem', border: '1px solid black', borderRadius: '4px', width: '100%' }}
      />

      <input
        type="text"
        placeholder="Degree"
        value={form.degree}
        onChange={e => setForm({ ...form, degree: e.target.value })}
        style={{ padding: '0.5rem', border: '1px solid black', borderRadius: '4px', width: '100%' }}
      />

      <button
        type="submit"
        style={{
          padding: '0.5rem',
          backgroundColor: 'DodgerBlue',
          color: 'White',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Register
      </button>
    </form>
  );
}
