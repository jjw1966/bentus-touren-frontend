import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://bentus-touren-backend-1-cfci.onrender.com/dashboard")
      .then(res => res.json())
      .then(setData)
      .catch(setError);
  }, []);

  if (error) return <p style={{ color: "red" }}>Fel vid hämtning av data.</p>;
  if (!data) return <p>Laddar data...</p>;

  const renderList = (title, items, formatter) => (
    <div className="card">
      <h2>{title}</h2>
      <ul>
        {(items || []).map((item, i) => (
          <li key={i}>{formatter(item)}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <main>
      {renderList("Topp 5", data.topp5, p => `${p.spelare} – ${p.tourpoäng} poäng`)}
      {renderList("Närmast hål", data.nh, p => `${p.spelare} – ${p.nh}`)}
      {renderList("Längsta drive", data.ld, p => `${p.spelare} – ${p.ld}`)}
      {renderList("Spelade rundor", data.spelade, p => `${p.spelare} – ${p.antal}`)}
      {renderList("Deltävlingsvinster", data.vinster, p => `${p.spelare} – ${p.vinster}`)}
      {renderList("Landskamper", data.landskamper, p => `${p.lag} – ${p.vinster} vinster (${p.poäng} poäng)`)}
      {renderList("Deltävlingar", data.deltävlingar, p => `${p.datum} – ${p.klubb}`)}
    </main>
  );
}
