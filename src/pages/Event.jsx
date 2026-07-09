import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Event() {
  const { name } = useParams(); // Hämtar t.ex. "Sura" från URL
  const [eventData, setEventData] = useState(null);
  const [backendStatus, setBackendStatus] = useState("Kontrollerar...");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // 🟩 Hämta data för vald deltävling
    fetch(`https://bentus-touren-backend-1-cfci.onrender.com/event/${name}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Kunde inte hämta deltävlingen.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data för event:", data);
        setEventData(data);
        setBackendStatus("Backend OK");
      })
      .catch((error) => {
        console.error("Fel vid hämtning:", error);
        setErrorMessage(error.message);
        setBackendStatus("Backend FEL");
      });
  }, [name]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>{name}</h1>

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

      {/* 🟩 Visa huvudtabell */}
      {eventData && eventData.main && eventData.main.length > 0 && (
        <div style={{ marginBottom: "30px" }}>
          <h2>Huvudtabell</h2>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#f9f9f9",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#e0e0e0" }}>
                <th>Plac</th>
                <th>Spelare</th>
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
              {eventData.main.map((row, index) => (
                <tr key={index}>
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
        </div>
      )}

      {/* 🟩 Visa lagtabell */}
      {eventData && eventData.teams && eventData.teams.length > 0 && (
        <div>
          <h2>Lagresultat</h2>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#f9f9f9",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#e0e0e0" }}>
                <th>Lag</th>
                <th>Resultat</th>
                <th>Plac</th>
                <th>Bonus</th>
              </tr>
            </thead>
            <tbody>
              {eventData.teams.map((row, index) => (
                <tr key={index}>
                  <td>{row.Lag}</td>
                  <td>{row.Resultat}</td>
                  <td>{row.Plac}</td>
                  <td>{row.Bonus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
