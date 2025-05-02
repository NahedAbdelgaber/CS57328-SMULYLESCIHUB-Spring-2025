import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Settings() {
  const [profile, setProfile] = useState({
    name: '',
    address: '',
    degree: ''
  });

  const username = localStorage.getItem('username');

  useEffect(() => {
    if (username) {
      axios.get(`http://localhost:8081/api/profile/${username}`, {
        params: { username }
      })
      .then(res => setProfile(res.data))
      .catch(() => alert('Failed to load profile'));
    }
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/api/profile/${username}`, {
        username,
        ...profile
      });      
      alert('Profile updated!');
    } catch (err) {
      alert('Update failed: ' + (err.response?.data || 'Unknown error'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>System Settings</h2>
      <p>Full Name</p>
      <input
        type="text"
        placeholder="Full Name"
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
      />
      <p>Address</p>
      <input
        type="text"
        placeholder="Address"
        value={profile.address}
        onChange={(e) => setProfile({ ...profile, address: e.target.value })}
      />
      <p>Degree</p>
      <input
        type="text"
        placeholder="Degree"
        value={profile.degree}
        onChange={(e) => setProfile({ ...profile, degree: e.target.value })}
      />
      <p></p>
      <button type="submit">Save Changes</button>
    </form>
  );
}
