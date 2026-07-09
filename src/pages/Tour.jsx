import React, { useEffect, useState } from "react";

export default function Tourställning() {
  const [tourData, setTourData] = useState([]);
  const [backendStatus, setBackendStatus] = useState("Kontrollerar...");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // 🟩 Hämta tourställning från backend
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
