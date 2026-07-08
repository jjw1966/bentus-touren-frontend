import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent, getNH, getLD } from "../api";

export default function Event() {
  const { name } = useParams();

  const [main, setMain] = useState([]);
  const [teams, setTeams] = useState([]);
  const [nh, setNh] = useState([]);
  const [ld, setLd] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const eventData = await getEvent(name);
        const nhData = await getNH(name);
        const ldData = await getLD(name);

        setMain(eventData.main || []);
        setTeams(eventData.teams || []);
        setNh(nhData.nh || []);
        setLd(ldData.ld || []);
      } catch (err) {
        console.error("Fel vid hämtning:", err);
        setError("Kunde inte hämta deltävlingen.");
      }
      setLoading(false);
    }
    load();
  }, [name]);

  if (loading) return <div className="page"><p>Laddar...</p></div>;
  if (error) return <div className="page"><p>{error}</p></div>;

  return (
    <div className="page">
      <h1>{name}</h1>

      <h2>Huvudtabell</h2>
      {main.length === 0 ? (
        <p>Ingen data.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Plac</th><th>Spelare</th><th>HCP</th><th>PB</th>
              <th>NH</th><th>LD</th><th>Bonus</th><th>Tot</th><th>Tourpoäng</th>
            </tr>
          </thead>
          <tbody>
            {main.map((row, i) => (
              <tr key={i}>
                <td>{row.Plac}</td>
                <td>{row.Spelare}</td>
                <td>{row.HCP}</td>
                <td>{row.PB}</td>
                <td>{row.NH}</td>
                <td>{row.LD}</td>
                <td>{row.Bonus}</td>
                <td>{row.Tot}</td>
                <td>{row.Tourpoäng}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2>Lagresultat</h2>
      {teams.length === 0 ? (
        <p>Inga lagresultat.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Lag</th><th>Resultat</th><th>Plac</th><th>Bonus</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((row, i) => (
              <tr key={i}>
                <td>{row.Lag}</td>
                <td>{row.Resultat}</td>
                <td>{row.Plac}</td>
                <td>{row.Bonus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2>Närmast hål</h2>
      {nh.length === 0 ? (
        <p>Ingen NH-data.</p>
      ) : (
        <ul>
          {nh.map((row, i) => (
            <li key={i}>{row.Hål}: {row.Vinnare}</li>
          ))}
        </ul>
      )}

      <h2>Längsta drive</h2>
      {ld.length === 0 ? (
        <p>Ingen LD-data.</p>
      ) : (
        <ul>
          {ld.map((row, i) => (
            <li key={i}>{row.Hål}: {row.Vinnare}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
