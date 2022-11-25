import { Link } from "react-router-dom";
import "./css/Navbar.css";

const Navbar = () => {
  return (
    <header className="header">
      <h2>HerkkuGrilli</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Etusivu</Link>
          </li>
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          <li>
            <Link to="/orders">Tilaukset</Link>
          </li>
          <li>
            <Link to="/profile">Profiili</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;