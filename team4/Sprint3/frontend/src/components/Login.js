import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import PasswordStrength from './PasswordStrength';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword]     = useState('');
  const [showPwd, setShowPwd]       = useState(false);
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
      const msg = err.response?.data || err.message;
      alert('Login failed: ' + msg);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ padding: '1rem', display: 'grid', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}
    >
      <h2 style={{ textAlign: 'center' }}>Login</h2>

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
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
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

      <PasswordStrength password={password} />

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
        Login
      </button>

      <p style={{ textAlign: 'center' }}>
        <Link to="/register" style={{ color: 'black', textDecoration: 'none' }}>
          Register
        </Link>
      </p>

      <p style={{ textAlign: 'center' }}>
        <Link to="/reset/username" style={{ color: 'black', textDecoration: 'none' }}>
          Reset username
        </Link>
        <span style={{ margin: '0 0.5rem', color: 'black' }}>|</span>
        <Link to="/reset/password" style={{ color: 'black', textDecoration: 'none' }}>
          Reset password
        </Link>
      </p>
    </form>
  );
}
