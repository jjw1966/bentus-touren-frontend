// Bentus Touren Frontend – app.js
// Version 2026-07-06

const backendBaseUrl = "https://bentus-touren-backend.onrender.com";

// =========================
// Hämta data
// =========================
async function fetchData(endpoint) {
    try {
        const response = await fetch(`${backendBaseUrl}/${endpoint}`);
        if (!response.ok) throw new Error(`Fel vid hämtning av ${endpoint}`);
        return await response.json();
    } catch (error) {
        console.error(error);
        document.getElementById("content").innerHTML =
            `<p style="color:red;">Kunde inte hämta ${endpoint}</p>`;
    }
}

// =========================
// Rendera tabell
// =========================
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

// =========================
// Diagram (Chart.js)
// =========================
let chartInstance = null;

function renderChart(data) {
    const ctx = document.getElementById("chartCanvas").getContext("2d");

    const labels = data.map(d => d.namn);
    const scores = data.map(d => d.poang);

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: "Poäng",
                data: scores,
                backgroundColor: "#4CAF50"
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// =========================
// Laddningsfunktioner
// =========================
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
    renderChart(data);
}

// =========================
// Tema (ljus/mörk)
// =========================
function toggleTheme() {
    document.body.classList.toggle("light");
    const logo = document.getElementById("logo");
    logo.src = document.body.classList.contains("light")
        ? "bentus-logo-light.png"
        : "bentus-logo-dark.png";
}

// =========================
// Event listeners
// =========================
window.onload = loadResultat;

document.getElementById("btnResultat").onclick = loadResultat;
document.getElementById("btnTourstallning").onclick = loadTourstallning;
document.getElementById("btnLagspel").onclick = loadLagspel;
document.getElementById("btnDeltavlingar").onclick = loadDeltavlingar;
document.getElementById("btnTema").onclick = toggleTheme;
