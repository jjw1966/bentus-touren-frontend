import { useEffect, useState } from "react";
import { getTour } from "../api";

export default function Tour() {
  const [tour, setTour] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getTour();
        setTour(data || []);
      } catch (err) {
        console.error("Tour error:", err);
        setError("Kunde inte hämta tourställningen.");
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="page"><p>Laddar...</p></div>;
  if (error) return <div className="page"><p>{error}</p></div>;

  return (
    <div className="page">
      <h1>Tourställning</h1>

      {tour.length === 0 ? (
        <p>Ingen tourdata.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Spelare</th>
              <th>Totalpoäng</th>
            </tr>
          </thead>
          <tbody>
            {tour.map((row, i) => (
              <tr key={i}>
                <td>{row.Spelare}</td>
                <td>{row.Totalpoäng}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
