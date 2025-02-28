import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/main.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="navbar" role="navigation">
      <div className="navbar__brand">
        <Link to="/" className="navbar__logo">AI-CMS</Link>
      </div>

      <button 
        className="navbar__toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation"
      >
        <span className="navbar__hamburger"></span>
      </button>

      <div className={`navbar__links ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/dashboard" className="navbar__link">Dashboard</Link>
        <Link to="/editor" className="navbar__link">Editor</Link>
        <Link to="/analytics" className="navbar__link">Analytics</Link>
        <Link to="/admin" className="navbar__link">Admin</Link>
        <button 
          className="navbar__button"
          onClick={() => {
            // Add logout logic
            navigate('/login');
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;