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
        console.error(err);
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
