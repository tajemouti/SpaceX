import { NavLink } from 'react-router-dom';
import planet from '../assets/planet.png';

const Header = () => (
  <>
    <header>
      <div className="logo">
        <img src={planet} alt="Logo" />
        <h1>Space Travelers&apos; Hub</h1>
      </div>
      <div className="links">
        <NavLink to="/" className="link">
          Rockets
        </NavLink>
        <NavLink to="/missions" className="link">
          Missions
        </NavLink>
        |
        <NavLink to="/profile" className="link">
          Profile
        </NavLink>
      </div>
    </header>
    <hr />
  </>
);

export default Header;
