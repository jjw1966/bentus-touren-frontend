import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <div className="nav-left">
          <Link to="/" className="nav-logo">Bentus Touren</Link>
        </div>

        <div className="nav-right">
          <Link to="/" className="nav-item">Dashboard</Link>
          <Link to="/events" className="nav-item">Deltävlingar</Link>
          <Link to="/tour" className="nav-item">Tourställning</Link>
        </div>
      </div>
    </nav>
  );
}
