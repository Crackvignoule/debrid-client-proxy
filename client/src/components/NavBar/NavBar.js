import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.scss';

function NavBar() {
  return (
    <nav className="navbar">
      <h1 className="navbar__title">My Dashboard</h1>
      <div className="navbar__links">
        <NavLink >Page 1</NavLink>
        <NavLink >Page 2</NavLink>
      </div>
      <div className="navbar__settings">
        <i className="fas fa-cog"></i>
      </div>
    </nav>
  );
}

export default NavBar;