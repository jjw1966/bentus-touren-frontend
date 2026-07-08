import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles.css";

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [logo, setLogo] = useState("bentus-logo-light.png");

  useEffect(() => {
    document.body.className = dark ? "dark" : "light";
    setLogo(dark ? "bentus-logo-dark.png" : "bentus-logo-light.png");
  }, [dark]);

  return (
    <nav className={dark ? "dark" : ""}>
      <div className="nav-left">
        <img src={`/${logo}`} alt="Bentus Touren logo" className="logo" />
      </div>

      <button className="hamburger" onClick={() => {
        document.querySelector(".nav-links").classList.toggle("open");
      }}>
        ☰
      </button>

      <ul className="nav-links">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/events">Deltävlingar</Link></li>
        <li><Link to="/tour">Tourställning</Link></li>
      </ul>

      <button className="theme-toggle" onClick={() => setDark(!dark)}>
        {dark ? "☀️" : "🌙"}
      </button>
    </nav>
  );
}
