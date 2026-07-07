import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent, getNH, getLD, getTeams } from "../api";

export default function Deltavling() {
  const { name } = useParams();

  const [main, setMain] = useState([]);
  const [nh, setNh] = useState([]);
  const [ld, setLd] = useState([]);
  const [teams, setTeams] = useState([]);
  const [lagspelPa, setLagspelPa] = useState(false);

  useEffect(() => {
    async function load() {
      const mainData = await getEvent(name);
      setMain(mainData.main);

      const nhData = await getNH(name);
      setNh(nhData.nh);

      const ldData = await getLD(name);
      setLd(ldData.ld);

      const teamData = await getTeams(name);
      setTeams(teamData.teams || []);
      setLagspelPa(teamData.teams && teamData.teams.length > 0);
    }

    load();
  }, [name]);

  return (
    <div className="page">
      <h1>{name}</h1>

      <section>
        <h2>Huvudtabell</h2>
        <table>
          <thead>
            <tr>
              <th>Plac</th>
              <th>Namn</th>
              <th>HCP</th>
              <th>PB</th>
              <th>NH</th>
              <th>LD</th>
              <th>Bonus</th>
              <th>Tot</th>
              <th>Tourpoäng</th>
            </tr>
          </thead>
          <tbody>
            {main.map((r, i) => (
              <tr key={i}>
                <td>{r.Placering}</td>
                <td>{r.Namn}</td>
                <td>{r.HCP}</td>
                <td>{r.PB}</td>
                <td>{r.NH}</td>
                <td>{r.LD}</td>
                <td>{r.Bonus}</td>
                <td>{r.Tot}</td>
                <td>{r.Tourpoäng}</td>
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

      {lagspelPa && (
        <section>
          <h2>Lagspel</h2>
          <table>
            <thead>
              <tr><th>Lag</th><th>Namn</th><th>Poäng</th></tr>
            </thead>
            <tbody>
              {teams.map((r, i) => (
                <tr key={i}>
                  <td>{r.Lag}</td>
                  <td>{r.Namn}</td>
                  <td>{r.Poäng}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}
