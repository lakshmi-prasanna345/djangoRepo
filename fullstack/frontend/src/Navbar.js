import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary ">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link text-light fs-2">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/table" className="nav-link text-white fs-2">Table</Link>
            </li>
            {/* Add more navigation items here */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
