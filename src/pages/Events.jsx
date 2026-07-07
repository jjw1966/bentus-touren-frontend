import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../api";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  return (
    <div className="page">
      <h1>Deltävlingar</h1>
      <ul>
        {events.map((e, i) => (
          <li key={i}>
            <Link to={`/event/${e}`}>{e}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
