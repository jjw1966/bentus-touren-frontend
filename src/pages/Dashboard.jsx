import { useEffect, useState } from "react";
import { getTour } from "../api";

export default function Dashboard() {
  const [top, setTop] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getTour();
      setTop(data.slice(0, 5));
    }
    load();
  }, []);

  if (!top) return <div className="page"><p>Laddar...</p></div>;

  return (
    <div className="page">
      <h1>Dashboard</h1>
      <h2>Topp 5</h2>
      <ul>
        {top.map((row, i) => (
          <li key={i}>
            {row.Spelare}: {row.Totalpoäng} poäng
          </li>
        ))}
      </ul>
    </div>
  );
}
