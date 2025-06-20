import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="custom-navbar shadow-sm">
      <div className="navbar-inner d-flex justify-content-between align-items-center container">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          🎓 NID Projects
        </Link>
        <ul className="nav gap-3 m-0">
          <li className="nav-item">
            <Link
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              to="/"
            >
              🏠 Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`}
              to="/projects"
            >
              📂 Gallery
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link ${location.pathname === '/add-project' ? 'active' : ''}`}
              to="/add-project"
            >
              ➕ Add Project
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
