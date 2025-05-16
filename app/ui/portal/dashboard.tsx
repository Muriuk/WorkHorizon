'use client'

import { useState } from "react";

export const Navigation = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleNotifications = () => setNotificationsOpen(!notificationsOpen);
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

  const collapseItems = [
    'Profile', 'Dashboard', 'Activity', 'Analytics', 'System',
    'Deployments', 'My Settings', 'Team Settings', 'Help & Feedback', 'Log Out'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navbar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        borderBottom: '1px solid #ccc',
        background: isDark ? '#222' : '#fff',
        color: isDark ? '#fff' : '#000'
      }}>
        {/* Burger */}
        <button onClick={toggleSidebar} style={{ fontSize: '18px' }}>
          {collapsed ? '☰' : '✖'}
        </button>

        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          style={{
            flex: 1,
            margin: '0 20px',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '5px'
          }}
        />

        {/* Right Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button onClick={() => alert('Feedback clicked')}>📣 Feedback</button>
          <button onClick={toggleNotifications}>🔔</button>
          <button onClick={() => alert('Support clicked')}>🛟</button>
          <a href="https://github.com" target="_blank" rel="noreferrer">🐱 GitHub</a>
          <div style={{ position: 'relative' }}>
            <button onClick={toggleUserMenu}>👤</button>
            {userMenuOpen && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: '100%',
                background: '#fff',
                color: '#000',
                border: '1px solid #ccc',
                padding: '10px',
                zIndex: 1000
              }}>
                <div><strong>Signed in as</strong><br />zoey@example.com</div>
                <hr />
                <div>My Settings</div>
                <div>Team Settings</div>
                <div>Analytics</div>
                <div>System</div>
                <div>Configurations</div>
                <div>Help & Feedback</div>
                <div style={{ color: 'red' }}>Log Out</div>
                <hr />
                <label>
                  <input
                    type="checkbox"
                    checked={isDark}
                    onChange={toggleTheme}
                  /> Dark Mode
                </label>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Notifications */}
      {notificationsOpen && (
        <div style={{
          position: 'absolute',
          top: '60px',
          right: '20px',
          background: '#fff',
          border: '1px solid #ccc',
          width: '300px',
          zIndex: 999,
          padding: '10px'
        }}>
          <div>
            <strong>📣 Profile Update</strong>
            <p>Update your profile information.</p>
          </div>
          <hr />
          <div>
            <strong>🚀 Paperless Receipts</strong>
            <p>Switch to digital receipts.</p>
          </div>
        </div>
      )}

      {/* Collapse Menu (for mobile) */}
      {collapsed && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          background: isDark ? '#333' : '#f9f9f9',
          padding: '10px',
          borderBottom: '1px solid #ccc'
        }}>
          {collapseItems.map((item, index) => (
            <a
              key={index}
              href="#"
              style={{ padding: '5px 0', color: item === 'Log Out' ? 'red' : 'inherit' }}
            >
              {item}
            </a>
          ))}
        </div>
      )}

      {/* Page Content */}
      <main style={{ flex: 1, padding: '20px' }}>
        {children}
      </main>
    </div>
  );
};
 
      
