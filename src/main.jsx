import { BrowserRouter, Routes, Route } from "react-router-dom";
import Events from "./pages/Events";
import Event from "./pages/Event";
import Tour from "./pages/Tour";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event/:name" element={<Event />} />
        <Route path="/tour" element={<Tour />} />
      </Routes>
    </BrowserRouter>
  );
}
