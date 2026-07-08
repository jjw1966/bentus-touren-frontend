export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>Bentus Touren © {year}</p>
    </footer>
  );
}
