import React from 'react';

export default function PasswordStrength({ password }) {
  const score = 
    password.length > 9 ? 3 :
    password.length > 5 ? 2 :
    password.length > 0 ? 1 : 0;
  const labels = ["", "Weak", "Fair", "Strong"];
  const colors = ["", "red", "orange", "green"];

  return (
    <div style={{ fontSize:'0.9rem' }}>
      <span style={{ color: colors[score] }}>
        { labels[score] }
      </span>
    </div>
  );
}
