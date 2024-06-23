import { NavLink } from 'react-router-dom';
import { Settings } from 'lucide-react';
import './NavBar.scss';

function NavBar() {
  return (
    <nav className="navbar">
      <NavLink className="navbar__title" to="/">
        <img src="logo.png" alt="Logo" className="navbar__logo" />
      </NavLink>
      <div className="navbar__links">
        <NavLink className="navbar__link" to="/">Home</NavLink>
        <NavLink className="navbar__link" to="/pending-torrents">Pending Torrents</NavLink>
        <NavLink className="navbar__link" to="/saved-links">Saved Links</NavLink>
        <NavLink className="navbar__link" to="/history">History</NavLink>
      </div>
      <NavLink className="navbar__settings" to="/settings">
        <Settings />
      </NavLink>
    </nav>
  );
}

export default NavBar;