import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/api/login', credentials);
      if (response.status === 200) {
        localStorage.setItem('username', credentials.username);
        navigate('/settings');
      } else {
        alert('Login failed.');
      }
    } catch (err) {
      alert('Login error: ' + (err.response?.data || 'Unknown error'));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Don’t have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}
