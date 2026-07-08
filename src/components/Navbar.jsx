import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const logo = dark ? "bentus-logo-dark.png" : "bentus-logo-light.png";

  function toggleTheme() {
    setDark(!dark);
    document.body.className = dark ? "light" : "dark";
  }

  return (
    <nav className="navbar">
      <Link to="/">
        <img src={`/${logo}`} alt="Bentus Touren logo" className="logo" />
      </Link>

      <ul className="menu">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/events">Deltävlingar</Link></li>
        <li><Link to="/tour">Tourställning</Link></li>
      </ul>

      <button onClick={toggleTheme} className="theme-toggle">
        {dark ? "☀️" : "🌙"}
      </button>
    </nav>
  );
}
