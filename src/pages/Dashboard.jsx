import { useEffect, useState } from "react";
import { getEvents, getTour } from "../api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  // 🟩 Versionstaggen — synlig i konsolen
  console.log("Frontend version: 1.0.2");

  const [events, setEvents] = useState(null);
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        console.log("Hämtar events...");
        const eventData = await getEvents();
        console.log("Events-data:", eventData);

        console.log("Hämtar tour...");
        const tourData = await getTour();
        console.log("Tour-data:", tourData);

        setEvents(eventData);
        setTour(tourData);
      } catch (err) {
        console.error("Dashboard-fel:", err);
        setError("Kunde inte hämta dashboard-data.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="page"><p>Laddar...</p></div>;

  if (error) {
    return (
      <div className="page">
        <h1>Fel</h1>
        <p>{error}</p>

        {/* 🟥 Synlig felsida så du kan se vad som händer på mobil */}
        <div style={{ marginTop: "20px", padding: "10px", background: "#fee", borderRadius: "8px" }}>
          <p style={{ color: "red" }}>Frontend version: 1.0.2</p>
          <p><strong>Events:</strong> {JSON.stringify(events)}</p>
          <p><strong>Tour:</strong> {JSON.stringify(tour)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Dashboard</h1>

      <h2>Deltävlingar</h2>
      {(!events || events.length === 0) ? (
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
      {(!tour || tour.length === 0) ? (
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
