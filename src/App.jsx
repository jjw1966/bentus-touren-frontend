import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Tourstallning from "./pages/Tourstallning.jsx";
import OmBentus from "./pages/OmBentus.jsx";

export default function App() {
  return (
    <Router>
      <header>
        <h1>Bentus Touren 2026</h1>
        <nav>
          <ul className="menu">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/tourstallning">Tourställning</Link></li>
            <li><Link to="/ombentus">Om Bentus</Link></li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tourstallning" element={<Tourstallning />} />
        <Route path="/ombentus" element={<OmBentus />} />
      </Routes>

      <footer>© 2026 Bentus Touren</footer>
    </Router>
  );
}
