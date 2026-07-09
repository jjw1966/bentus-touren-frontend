import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://bentus-touren-backend-1-cfci.onrender.com/dashboard")
      .then((res) => {
        if (!res.ok) throw new Error("Kunde inte hämta Dashboard-data");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const card = {
    padding: "15px",
    marginBottom: "20px",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
  };

  const table = {
    width: "100%",
    borderCollapse: "collapse"
  };

  const th = {
    backgroundColor: "#e0e0e0",
    padding: "8px",
    textAlign: "left"
  };

  const td = {
    padding: "8px",
    borderBottom: "1px solid #ddd"
  };

  const renderTable = (title, rows, columns) => (
    <div style={card}>
      <h2 style={{ color: "#1a73e8" }}>{title}</h2>
      <table style={table}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c} style={th}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ padding: "10px", textAlign: "center", color: "#777" }}>
                Ingen data hittades
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={i}>
                {columns.map((c) => {
                  const key = c.toLowerCase();
                  return (
                    <td key={c} style={td}>
                      {row[key] !== undefined ? row[key] : ""}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Dashboard</h1>
        <p>Laddar data från Excel...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", color: "#7a0a0a" }}>
        <h1>Dashboard</h1>
        <p style={{ backgroundColor: "#ffe0e0", padding: "10px", borderRadius: "6px" }}>
          Fel: {error}
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      {renderTable("Topp 5", data.topp5, ["Plac", "Spelare", "Poang"])}
      {renderTable("Spelade rundor", data.spelade, ["Plac", "Spelare", "Antal"])}
      {renderTable("Närmast hål (NH)", data.nh, ["Plac", "Spelare", "Nh"])}
      {renderTable("Längsta drive (LD)", data.ld, ["Plac", "Spelare", "Ld"])}
      {renderTable("Deltävlingsvinster", data.vinster, ["Plac", "Spelare", "Vinster"])}
      {renderTable("Landskamper", data.landskamper, ["Plac", "Lag", "Vinster", "Poang"])}
    </div>
  );
}
