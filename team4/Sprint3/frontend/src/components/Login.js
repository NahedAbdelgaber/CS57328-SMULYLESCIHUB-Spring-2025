import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8081/api/login', 
        {...(identifier.includes('@') ? { email: identifier, password } : { username: identifier, password })});

      const token = res.data.token || 'dummy-token';

      if (remember) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('identifier', identifier);
      } 
      else {
        sessionStorage.setItem('authToken', token);
        sessionStorage.setItem('identifier', identifier);
      }

      navigate('/settings');
    } 
    catch (err) {
      alert('Login failed: ' + (err.response?.data || err.message));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ padding:'1rem', display:'grid', gap:'1rem', maxWidth:'400px', margin:'0 auto' }}
    >
      <h2 style={{ textAlign:'center' }}>Login</h2>

      <input
        type="text"
        placeholder="Username or Email"
        value={identifier}
        onChange={e => setIdentifier(e.target.value)}
        required
        style={{ padding:'0.5rem', border:'1px solid black', borderRadius:'4px', width:'100%' }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        style={{ padding:'0.5rem', border:'1px solid black', borderRadius:'4px', width:'100%' }}
      />

      <label style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
        <input
          type="checkbox"
          checked={remember}
          onChange={e => setRemember(e.target.checked)}
        />
        Remember Me
      </label>

      <button
        type="submit"
        style={{ padding:'0.5rem', backgroundColor:'DodgerBlue', color:'White', border:'none', borderRadius:'4px', cursor:'pointer' }}
      >
        Login
      </button>

      <p style={{ textAlign:'center' }}>
        <Link to="/register" style={{ color:'black', textDecoration:'none' }}>
          Register
        </Link>
      </p>
      <p style={{ textAlign:'center' }}>
        <Link to="/reset/username" style={{ color:'black', textDecoration:'none' }}>
          Reset username
        </Link>
        <span style={{ margin:'0 0.5rem', color:'black' }}>|</span>
        <Link to="/reset/password" style={{ color:'black', textDecoration:'none' }}>
          Reset password
        </Link>
      </p>
    </form>
  );
}
