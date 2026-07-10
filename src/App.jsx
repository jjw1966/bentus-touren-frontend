import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Tour from "./pages/Tour";
import OmBentus from "./pages/OmBentus";

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
