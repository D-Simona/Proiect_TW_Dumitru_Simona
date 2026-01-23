import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Navbar.css';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          📄 Document Manager
        </Link>
        
        {user && (
          <div className="nav-menu">
            <Link to="/documents" className="nav-link">Documents</Link>
            <div className="nav-user">
              <span className="user-email">{user.email}</span>
              <button onClick={handleLogout} className="nav-logout">Logout</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
