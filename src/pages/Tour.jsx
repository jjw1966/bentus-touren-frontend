import React, { useEffect, useState } from "react";

export default function Tour() {
  const [tourData, setTourData] = useState([]);
  const [backendStatus, setBackendStatus] = useState("Kontrollerar...");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch("https://bentus-touren-backend-1-cfci.onrender.com/tour")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Kunde inte hämta tourställningen.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Tourställning:", data);
        setTourData(data);
        setBackendStatus("Backend OK");
      })
      .catch((error) => {
        console.error("Fel vid hämtning:", error);
        setErrorMessage(error.message);
        setBackendStatus("Backend FEL");
      });
  }, []);

  // 🟩 Top-3 logik
  const top3 = tourData.slice(0, 3);

  const medalStyle = {
    fontSize: "28px",
    marginRight: "10px",
  };

  const cardStyle = {
    padding: "15px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    marginBottom: "15px",
    display: "flex",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Tourställning</h1>

      {/* 🟩 Statusindikator */}
      <div
        style={{
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "6px",
          backgroundColor:
            backendStatus === "Backend OK" ? "#d4f8d4" : "#f8d4d4",
          color: backendStatus === "Backend OK" ? "#0a7a0a" : "#7a0a0a",
          fontWeight: "bold",
        }}
      >
        {backendStatus}
      </div>

      {/* 🟩 Felmeddelande */}
      {errorMessage && (
        <div
          style={{
            backgroundColor: "#ffe0e0",
            color: "#7a0a0a",
            padding: "10px",
            borderRadius: "6px",
            marginBottom: "20px",
          }}
        >
          {errorMessage}
        </div>
      )}

      {/* 🟩 Top-3 sektion */}
      {top3.length > 0 && (
        <div style={{ marginBottom: "30px" }}>
          <h2>Top 3</h2>

          {top3.map((row, index) => {
            const medal =
              index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉";

            const bg =
              index === 0
                ? "#fff7d1"
                : index === 1
                ? "#e3e3e3"
                : "#f7e2d1";

            return (
              <div
                key={index}
                style={{
                  ...cardStyle,
                  backgroundColor: bg,
                }}
              >
                <span style={medalStyle}>{medal}</span>
                <div>
                  <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {row.Spelare}
                  </div>
                  <div style={{ fontSize: "16px" }}>
                    Totalpoäng: <strong>{row.Totalpoäng}</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 🟩 Tourtabell */}
      {tourData && tourData.length > 0 ? (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#f9f9f9",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#e0e0e0" }}>
              <th style={{ textAlign: "left", padding: "8px" }}>Plac</th>
              <th style={{ textAlign: "left", padding: "8px" }}>Spelare</th>
              <th style={{ textAlign: "right", padding: "8px" }}>Totalpoäng</th>
            </tr>
          </thead>
          <tbody>
            {tourData.map((row, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f2f2f2",
                }}
              >
                <td style={{ padding: "8px" }}>{index + 1}</td>
                <td style={{ padding: "8px" }}>{row.Spelare}</td>
                <td style={{ padding: "8px", textAlign: "right" }}>
                  {row.Totalpoäng}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Ingen tourdata tillgänglig ännu...</p>
      )}
    </div>
  );
}
