// AdminPanel.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-panel-container">
      <h2>Admin Panel</h2>
      <div className="admin-options">
        <div className="admin-card" onClick={() => navigate('/review-users')}>
          <h3>Review Users</h3>
          <p>Fetch user profiles, view details, and remove accounts if necessary.</p>
        </div>
        <div className="admin-card" onClick={() => navigate('/review-items')}>
          <h3>Review Items</h3>
          <p>Check reported items and remove any illicit content as per university policies.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
