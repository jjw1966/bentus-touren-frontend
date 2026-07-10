import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Tour from "./pages/Tour.jsx";
import OmBentus from "./pages/OmBentus.jsx";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tour" element={<Tour />} />
        <Route path="/ombentus" element={<OmBentus />} />
      </Routes>
    </Router>
  );
}
