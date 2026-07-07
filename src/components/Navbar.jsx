import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  return (
    <nav className={dark ? "dark" : ""}>
      <h1>Bentus Touren</h1>

      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/events">Deltävlingar</Link></li>
        <li><Link to="/tour">Tourställning</Link></li>
      </ul>

      <button onClick={() => setDark(!dark)}>
        {dark ? "Ljust läge" : "Mörkt läge"}
      </button>
    </nav>
  );
}
