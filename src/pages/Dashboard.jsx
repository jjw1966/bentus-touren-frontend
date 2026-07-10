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

  const renderTable = (title, items, columns) => (
    <div className="card">
      <h2>{title}</h2>
      <div className="table">
        <div className="table-header">
          {columns.map((col, i) => (
            <div key={i} className="table-col">{col.header}</div>
          ))}
        </div>

        {(items || []).map((item, index) => (
          <div key={index} className="table-row">
            {columns.map((col, i) => (
              <div key={i} className="table-col">
                {col.format(item, index)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <main>

      {renderTable("Topp 5", data.topp5, [
        { header: "Plac", format: (_, i) => i + 1 },
        { header: "Spelare", format: p => p.spelare },
        { header: "Poäng", format: p => p.tourpoäng }
      ])}

      {renderTable("Spelade rundor", data.spelade, [
        { header: "Spelare", format: p => p.spelare },
        { header: "Antal", format: p => p.antal }
      ])}

      {renderTable("Deltävlingar", data.deltävlingar, [
        { header: "Datum", format: p => p.datum },
        { header: "Klubb", format: p => p.klubb }
      ])}

    </main>
  );
}
