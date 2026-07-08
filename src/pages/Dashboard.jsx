import { useEffect, useState } from "react";
import { getEvents, getTour } from "../api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [tour, setTour] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const eventData = await getEvents();
        const tourData = await getTour();

        console.log("Events:", eventData);
        console.log("Tour:", tourData);

        setEvents(eventData || []);
        setTour(tourData || []);
      } catch (err) {
        console.error("Dashboard‑fel:", err);
        setError("Kunde inte hämta dashboard‑data.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="page"><p>Laddar...</p></div>;
  if (error) return <div className="page"><p>{error}</p></div>;

  return (
    <div className="page">
      <h1>Dashboard</h1>

      <h2>Deltävlingar</h2>
      {events.length === 0 ? (
        <p>Inga deltävlingar hittades.</p>
      ) : (
        <ul>
          {events.map((name, i) => (
            <li key={i}>
              <Link to={`/event/${name}`}>{name}</Link>
            </li>
          ))}
        </ul>
      )}

      <h2>Tourställning</h2>
      {tour.length === 0 ? (
        <p>Ingen tourdata.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Spelare</th>
              <th>Totalpoäng</th>
            </tr>
          </thead>
          <tbody>
            {tour.map((row, i) => (
              <tr key={i}>
                <td>{row.Spelare}</td>
                <td>{row.Totalpoäng}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
