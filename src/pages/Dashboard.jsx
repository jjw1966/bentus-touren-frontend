import { useEffect, useState } from "react";
import { getEvent, getNH, getLD, getTeams } from "../api";

export default function Dashboard() {
  const [lands, setLands] = useState([]);
  const [top5, setTop5] = useState([]);
  const [nh, setNh] = useState([]);
  const [ld, setLd] = useState([]);

  async function load() {
    const landsData = await getTeams("Landskamp");
    setLands(landsData.teams || []);

    const main = await getEvent("Sura");
    setTop5(main.main.slice(0, 5));

    const nhData = await getNH("Sura");
    setNh(nhData.nh);

    const ldData = await getLD("Sura");
    setLd(ldData.ld);
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page">
      <h1>Dashboard</h1>

      <section>
        <h2>Landskamp — Sverige vs Finland</h2>
        <table>
          <thead>
            <tr><th>Lag</th><th>Spelare</th><th>Poäng</th></tr>
          </thead>
          <tbody>
            {lands.map((r, i) => (
              <tr key={i}>
                <td>{r.Lag}</td>
                <td>{r.Namn}</td>
                <td>{r.Poäng}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Topp 5 — Sura</h2>
        <table>
          <thead>
            <tr><th>Plac</th><th>Namn</th><th>Poäng</th></tr>
          </thead>
          <tbody>
            {top5.map((r, i) => (
              <tr key={i}>
                <td>{r.Placering}</td>
                <td>{r.Namn}</td>
                <td>{r.Poäng}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Närmast hål</h2>
        <ul>{nh.map((r, i) => <li key={i}>{r.Namn}: {r.NH} m</li>)}</ul>
      </section>

      <section>
        <h2>Längsta drive</h2>
        <ul>{ld.map((r, i) => <li key={i}>{r.Namn}: {r.LD} m</li>)}</ul>
      </section>
    </div>
  );
}
