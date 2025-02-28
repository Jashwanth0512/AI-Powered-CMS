import React from 'react';
import '../styles/admin.css';

const Admin = () => {
  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
      </div>

      <div className="admin-grid">
        {/* Users Section */}
        <div className="admin-card">
          <h3 className="metric-title">User Management</h3>
          <div className="user-list">
            <div className="user-item">
              <div className="user-info">
                <span>John Doe</span>
                <span className="user-email">john@example.com</span>
              </div>
              <div className="admin-controls">
                <select className="role-select">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <button className="admin-button admin-button--danger">Remove</button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="admin-card">
          <h3 className="metric-title">Quick Actions</h3>
          <div className="admin-controls" style={{ flexDirection: 'column', gap: '1rem' }}>
            <button className="admin-button admin-button--primary">
              Manage Users
            </button>
            <button className="admin-button admin-button--primary">
              System Settings
            </button>
            <button className="admin-button admin-button--primary">
              Generate Reports
            </button>
          </div>
        </div>

        {/* Audit Log */}
        <div className="admin-card">
          <h3 className="metric-title">Recent Activity</h3>
          <div className="audit-log">
            <div className="log-item">
              <div>User login - 2:45 PM</div>
              <div className="user-email">system event</div>
            </div>
            <div className="log-item">
              <div>Profile updated - 10:30 AM</div>
              <div className="user-email">jashwanthdhanavath05@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;