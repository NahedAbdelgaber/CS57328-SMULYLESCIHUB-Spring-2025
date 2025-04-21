import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = identifier.includes('@') ? { email: identifier, password } : { username: identifier, password };

    try {
      await axios.post('http://localhost:8081/api/login', payload);
      localStorage.setItem('identifier', identifier);
      navigate('/settings');
    } 
    catch (err) {
      alert('Login failed: ' + (err.response?.data || err.message));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ padding: '1rem', color: 'black', display: 'grid', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}
    >
      <h2 style={{ textAlign: 'center' }}>Login</h2>

      <input
        type="text"
        placeholder="Username or Email"
        value={identifier}
        onChange={e => setIdentifier(e.target.value)}
        required
        style={{ width: '100%', padding: '0.5rem', border: '1px solid Black', borderRadius: '4px' }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        style={{ width: '100%', padding: '0.5rem', border: '1px solid Black', borderRadius: '4px' }}
      />

      <button
        type="submit"
        style={{ padding: '0.5rem', backgroundColor: 'DodgerBlue', color: 'White', border: 'none', borderRadius: '4px' }}
      >
        Login
      </button>

      <p style={{ textAlign: 'center' }}>
        <Link
          to="/register"
          style={{ color: 'black', textDecoration: 'none', cursor: 'pointer' }}
        >
          Register
        </Link>
      </p>

      <p style={{ textAlign: 'center' }}>
        <Link
          to="/reset/username"
          style={{ color: 'black', textDecoration: 'none', cursor: 'pointer' }}
        >
          Reset username
        </Link>
        <span style={{ margin: '0 0.5rem', color: 'black' }}>|</span>
        <Link
          to="/reset/password"
          style={{ color: 'black', textDecoration: 'none', cursor: 'pointer' }}
        >
          Reset password
        </Link>
      </p>
      
    </form>
  );
}
