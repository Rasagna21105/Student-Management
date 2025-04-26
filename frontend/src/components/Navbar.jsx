import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/" style={{fontSize:'bold'}}>Student Management System</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{color:'white'}}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/students" style={{color:'white'}}>Students</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/students/add" style={{color:'white'}}>Add Student</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;