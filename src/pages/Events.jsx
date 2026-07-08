import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../api";

export default function Events() {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getEvents();

        if (!Array.isArray(data)) {
          setError("Felaktigt svar från servern.");
        } else {
          setEvents(data);
        }
      } catch (err) {
        setError("Kunde inte hämta deltävlingar.");
      }

      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="page">
        <p>Laddar deltävlingar...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <p>{error}</p>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="page">
        <h1>Deltävlingar</h1>
        <p>Inga deltävlingar hittades.</p>
        <p>Kontrollera att backend returnerar flikar i /events.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Deltävlingar</h1>
      <ul>
        {events.map((e, i) => (
          <li key={i}>
            <Link to={`/event/${encodeURIComponent(e)}`}>{e}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
