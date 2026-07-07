import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Deltavling from "./pages/Deltavling";
import Tourstallning from "./pages/Tourstallning";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/:name" element={<Deltavling />} />
          <Route path="/tour" element={<Tourstallning />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
