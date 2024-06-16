import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.scss';

function NavBar() {
  return (
    <nav className="navbar">
      <h1 className="navbar__title">My Dashboard</h1>
      <div className="navbar__links">
        <NavLink className="navbar__link" to="/page1">Page 1</NavLink>
        <NavLink className="navbar__link" to="/page2">Page 2</NavLink>
      </div>
      <div className="navbar__settings">
        <i className="fas fa-cog"></i>
      </div>
    </nav>
  );
}

export default NavBar;