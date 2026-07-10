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

  // Fallback för "deltävlingar" vs "deltavlingar"
  const deltavlingar = data.deltävlingar || data.deltavlingar;

  const renderTable = (title, items, columns) => (
    <div className="card">
      <h2>{title}</h2>
      <div className="table">
        <div className="table-header">
          {columns.map((col, i) => (
            <div key={i} className="table-col">{col.header}</div>
          ))}
        </div>

        {(items || [])
          .filter(item => Object.values(item).some(v => v !== null && v !== "" && v !== 0))
          .map((item, index) => (
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
        { header: "Placering", format: p => p.placering },
        { header: "Spelare", format: p => p.spelare },
        { header: "Tourpoäng", format: p => p.tourpoäng }
      ])}

      {renderTable("Närmast hål", data.nh, [
        { header: "Placering", format: p => p.placering },
        { header: "Spelare", format: p => p.spelare },
        { header: "NH", format: p => p.nh }
      ])}

      {renderTable("Längsta drive", data.ld, [
        { header: "Placering", format: p => p.placering },
        { header: "Spelare", format: p => p.spelare },
        { header: "LD", format: p => p.ld }
      ])}

      {renderTable("Spelade rundor", data.spelade, [
        { header: "Placering", format: p => p.placering },
        { header: "Spelare", format: p => p.spelare },
        { header: "Antal", format: p => p.antal }
      ])}

      {renderTable("Deltävlingar", deltavlingar, [
        { header: "Datum", format: p => p.datum },
        { header: "Klubb", format: p => p.klubb }
      ])}

      {renderTable("Deltävlingsvinster", data.vinster, [
        { header: "Placering", format: p => p.placering },
        { header: "Spelare", format: p => p.spelare },
        { header: "Vinster", format: p => p.vinster }
      ])}

      {renderTable("Landskamper", data.landskamper, [
        { header: "Lag", format: p => p.lag },
        { header: "Placering", format: p => p.placering },
        { header: "Poäng", format: p => p.poäng },
        { header: "Vinster", format: p => p.vinster }
      ])}
    </main>
  );
}
