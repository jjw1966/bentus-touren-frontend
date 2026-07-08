import { useEffect, useState } from "react";
import { getEvents } from "../api";
import { Link } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getEvents();
        setEvents(data || []);
      } catch (err) {
        console.error(err);
        setError("Kunde inte hämta deltävlingar.");
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="page"><p>Laddar...</p></div>;
  if (error) return <div className="page"><p>{error}</p></div>;

  return (
    <div className="page">
      <h1>Deltävlingar</h1>

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
    </div>
  );
}
