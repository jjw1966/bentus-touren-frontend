import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [backendStatus, setBackendStatus] = useState("Kontrollerar...");

  useEffect(() => {
    // 🟩 TEST 1 — Logga data i konsolen
    fetch("https://bentus-touren-backend-1-cfci.onrender.com/events")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Backend svarade inte OK");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data från backend:", data);

        // 🟩 TEST 2 — Visa statusindikator
        setBackendStatus("Backend OK");

        // Spara data i state så Dashboard kan använda det
        setEvents(data);
      })
      .catch((error) => {
        console.error("Fel vid hämtning:", error);
        setBackendStatus("Backend FEL");
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

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

      {/* 🟩 Visa event-listan om den finns */}
      {events.length > 0 ? (
        <div>
          <h2>Deltävlingar</h2>
          <ul>
            {events.map((event) => (
              <li key={event}>{event}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Inga event hämtade ännu...</p>
      )}
    </div>
  );
}
