import { useEffect, useState } from "react";
import { getEvents, getEvent } from "../api";

export default function Tourstallning() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function load() {
      const events = await getEvents();

      const realEvents = events.filter(e =>
        !e.startsWith("Deltävling")
      );

      const all = [];

      for (const ev of realEvents) {
        const data = await getEvent(ev);
        if (data.main.length > 0) {
          all.push({ name: ev, results: data.main });
        }
      }

      setRows(all);
    }

    load();
  }, []);

  return (
    <div className="page">
      <h1>Tourställning</h1>

      {rows.map((ev, i) => (
        <section key={i}>
          <h2>{ev.name}</h2>
          <table>
            <thead>
              <tr>
                <th>Plac</th>
                <th>Namn</th>
                <th>Poäng</th>
              </tr>
            </thead>
            <tbody>
              {ev.results.map((r, j) => (
                <tr key={j}>
                  <td>{r.Placering}</td>
                  <td>{r.Namn}</td>
                  <td>{r.Poäng}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </div>
  );
}
