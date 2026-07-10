import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const logoSrc = prefersDark ? "/bentus-logo-dark.png" : "/bentus-logo-light.png";

  return (
    <nav className="navbar">
      <div className="nav-inner">

        <div className="nav-left">
          <img src={logoSrc} alt="Bentus logo" className="nav-logo-img" />
          <Link to="/" className="nav-logo-text">Bentus Touren</Link>
        </div>

        <div className="nav-right">
          <Link to="/" className="nav-item">Dashboard</Link>
          <Link to="/tour" className="nav-item">Tour</Link>
          <Link to="/ombentus" className="nav-item">Om Bentus</Link>
        </div>

      </div>
    </nav>
  );
}
