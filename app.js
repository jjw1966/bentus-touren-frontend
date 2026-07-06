// Bentus Touren Frontend – app.js
// Version 2026-07-06

// 🟩 Backend URL
const backendBaseUrl = "https://bentus-touren-backend.onrender.com";

// 🟦 Hjälpfunktion för att hämta data
async function fetchData(endpoint) {
  try {
    const response = await fetch(`${backendBaseUrl}/${endpoint}`);
    if (!response.ok) throw new Error(`Fel vid hämtning av ${endpoint}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    document.getElementById("content").innerHTML = `<p style="color:red;">Kunde inte hämta ${endpoint}</p>`;
  }
}

// 🟩 Funktion för att visa data i tabell
function renderTable(data, containerId) {
  const container = document.getElementById(containerId);
  if (!data || data.length === 0) {
    container.innerHTML = "<p>Ingen data hittades.</p>";
    return;
  }

  const keys = Object.keys(data[0]);
  let html = "<table><thead><tr>";
  keys.forEach(k => html += `<th>${k}</th>`);
  html += "</tr></thead><tbody>";

  data.forEach(row => {
    html += "<tr>";
    keys.forEach(k => html += `<td>${row[k]}</td>`);
    html += "</tr>";
  });

  html += "</tbody></table>";
  container.innerHTML = html;
}

// 🟦 Funktioner för varje flik
async function loadResultat() {
  const data = await fetchData("resultat");
  renderTable(data, "content");
}

async function loadTourstallning() {
  const data = await fetchData("tourstallning");
  renderTable(data, "content");
}

async function loadLagspel() {
  const data = await fetchData("lagspel");
  renderTable(data, "content");
}

async function loadDeltavlingar() {
  const data = await fetchData("deltavlingar");
  renderTable(data, "content");
}

// 🟩 Koppla knappar till funktioner
document.getElementById("btnResultat").addEventListener("click", loadResultat);
document.getElementById("btnTourstallning").addEventListener("click", loadTourstallning);
document.getElementById("btnLagspel").addEventListener("click", loadLagspel);
document.getElementById("btnDeltavlingar").addEventListener("click", loadDeltavlingar);

// 🟦 Ladda standardvy
window.onload = loadResultat;

// 🟩 Tema-knapp (ljus/mörk)
document.getElementById("btnTema").addEventListener("click", () => {
  document.body.classList.toggle("light");
  const logo = document.getElementById("logo");
  logo.src = document.body.classList.contains("light")
    ? "bentus-logo-light.png"
    : "bentus-logo-dark.png";
});
