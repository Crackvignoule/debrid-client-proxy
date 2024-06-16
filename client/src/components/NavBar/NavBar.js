import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import './NavBar.scss';

function NavBar() {
  return (
    <nav className="navbar">
      <NavLink className="navbar__title" to="/">
        <h1>Debrid Client</h1>
      </NavLink>
      <div className="navbar__links">
        <NavLink className="navbar__link" to="/">Home</NavLink>
        <NavLink className="navbar__link" to="/page2">Page 2</NavLink>
      </div>
      <NavLink className="navbar__settings" to="/settings">
        <FontAwesomeIcon icon={faCog} />
      </NavLink>
    </nav>
  );
}

export default NavBar;