import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function SettingsLayout() {
  const linkStyle = ({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal', textDecoration: 'none', color: 'Black', cursor: 'pointer'});

  return (
    <div style={{ padding: '1rem' }}>
      <nav
        style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid Black', paddingBottom: '0.5rem', marginBottom: '1rem'}}
      >
        <NavLink to="" end style={linkStyle}>
          Profile
        </NavLink>
        <NavLink to="account" style={linkStyle}>
          Account
        </NavLink>
        <NavLink to="security" style={linkStyle}>
          Password
        </NavLink>
        <NavLink to="logout" style={linkStyle}>
          Logout
        </NavLink>
        <NavLink to="delete" style={linkStyle}>
          Delete
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
}
