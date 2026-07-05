const API_URL = "https://bentus-touren-backend.onrender.com";

let currentData = [];
let sortDirection = 1;
let page = 1;
const rowsPerPage = 10;
let chart;

// ================================
// Tema-switch + logga
// ================================
let selectedTab = "Deltävling 1";

function selectTab(name) {
    selectedTab = name;

    // Markera aktiv tab
    document.querySelectorAll(".tabs button").forEach(btn => {
        btn.classList.toggle("active", btn.textContent === name);
    });

    // Rendera tabell + diagram
    if (currentData[name]) {
        renderTable(currentData[name]);
        renderChart(currentData[name]);
    }
}

function updateLogo() {
    const logo = document.getElementById("logo");
    if (document.body.classList.contains("light")) {
        logo.src = "bentus-logo-light.png";
    } else {
        logo.src = "bentus-logo-dark.png";
    }
}

function toggleTheme() {
    document.body.classList.toggle("light");
    updateLogo();
}

updateLogo();

// ================================
// Automatisk endpoint-detektion
// ================================
function detectEndpoint() {
    const pageName = window.location.pathname.split("/").pop();

    if (pageName === "" || pageName === "index.html") return "resultat";
    if (pageName === "spelare.html") return "spelare";
    if (pageName === "lagspel.html") return "lagspel";
    if (pageName === "tourstallning.html") return "tourstallning";
    if (pageName === "deltavlingar.html") return "deltavlingar";

    return "resultat";
}

// ================================
// Sortering
// ================================
function sortTable(column) {
    currentData.sort((a, b) => {
        if (a[column] < b[column]) return -1 * sortDirection;
        if (a[column] > b[column]) return 1 * sortDirection;
        return 0;
    });

    sortDirection *= -1;
    renderTable(currentData);
    renderChart(currentData);
}

// ================================
// Filtrering
// ================================
function filterTable(query) {
    const filtered = currentData.filter(row =>
        JSON.stringify(row).toLowerCase().includes(query.toLowerCase())
    );
    renderTable(filtered);
    renderChart(filtered);
}

// ================================
// Paginering
// ================================
function paginate(data) {
    const start = (page - 1) * rowsPerPage;
    return data.slice(start, start + rowsPerPage);
}

// ================================
// Tabellrendering
// ================================
function renderTable(data) {
    const resultatDiv = document.getElementById("resultat");

    if (!Array.isArray(data) || data.length === 0) {
        resultatDiv.innerHTML = "<p>Ingen data</p>";
        return;
    }

    const keys = Object.keys(data[0]);

    let html = `
        <input id="searchBox" placeholder="Sök..." oninput="filterTable(this.value)">
        <table>
            <thead><tr>
    `;

    keys.forEach(k => {
        html += `<th onclick="sortTable('${k}')">${k}</th>`;
    });

    html += "</tr></thead><tbody>";

    const pageData = paginate(data);

    pageData.forEach(row => {
        html += "<tr>";
        keys.forEach(k => {
            const val = row[k];

            if (k.toLowerCase().includes("poäng")) {
                const sorted = [...currentData].sort((a, b) => b.Poäng - a.Poäng);
                const rank = sorted.findIndex(r => r.Poäng === val);

                let cls = "";
                if (rank === 0) cls = "gold";
                else if (rank === 1) cls = "silver";
                else if (rank === 2) cls = "bronze";

                html += `<td class="${cls}">${val}</td>`;
            } else {
                html += `<td>${val}</td>`;
            }
        });
        html += "</tr>";
    });

    html += "</tbody></table>";

    html += `
        <div class="pagination">
            <button onclick="page = Math.max(1, page - 1); renderTable(currentData)">Föregående</button>
            <button onclick="page = page + 1; renderTable(currentData)">Nästa</button>
        </div>
    `;

    resultatDiv.innerHTML = html;
}

// ================================
// Dashboard (endast index.html)
===============================
function renderDashboard(data) {
    const dashboard = document.getElementById("dashboard");
    if (!dashboard) return;

    const antal = data.length;
    const snitt = Math.round(data.reduce((a, b) => a + (b.Poäng || 0), 0) / antal);
    const top3 = [...data].sort((a, b) => b.Poäng - a.Poäng).slice(0, 3);

    dashboard.innerHTML = `
        <h2>Sammanfattning</h2>
        <p><strong>Antal spelare:</strong> ${antal}</p>
        <p><strong>Snittpoäng:</strong> ${snitt}</p>
        <p><strong>Topp 3:</strong></p>
        <ul>
            ${top3.map(s => `<li>${s.Spelare}: ${s.Poäng} poäng</li>`).join("")}
        </ul>
    `;
}

// ================================
// Interaktivt diagram
// ================================
function renderChart(data) {
    if (chart) chart.destroy();

    const container = document.createElement("div");
    container.id = "chartContainer";
    document.getElementById("resultat").appendChild(container);

    const canvas = document.createElement("canvas");
    container.appendChild(canvas);

    const labels = data.map(row => row.Spelare || row.Namn || row.Lag);
    const values = data.map(row => row.Poäng || row.Placering || 0);

    chart = new Chart(canvas, {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: "Poäng",
                data: values,
                backgroundColor: values.map((v, i) =>
                    i < 3 ? "#ff9800" : "#4caf50"
                )
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
                tooltip: { enabled: true },
                zoom: {
                    zoom: { wheel: { enabled: true }, pinch: { enabled: true }, mode: "x" },
                    pan: { enabled: true, mode: "x" }
                }
            },
            onClick: (evt, item) => {
                if (item.length > 0) {
                    const index = item[0].index;
                    alert(`Du klickade på: ${labels[index]} (${values[index]} poäng)`);
                }
            }
        }
    });
}

function resetZoom() {
    if (chart) chart.resetZoom();
}

// ================================
// Export
// ================================
function exportExcel() {
    const blob = new Blob([JSON.stringify(currentData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "bentus_export.json";
    a.click();
}

function exportPDF() {
    const pdf = new jsPDF();
    pdf.text("Bentus Tour Export", 10, 10);

    let y = 20;
    currentData.forEach(row => {
        pdf.text(JSON.stringify(row), 10, y);
        y += 10;
    });

    pdf.save("bentus_export.pdf");
}

// ================================
// Live-uppdatering
// ================================
setInterval(loadData, 60000);

// ================================
// Hämta data
// ================================
async function loadData() {
    const endpoint = detectEndpoint();
    const statusText = document.getElementById("status-text");

    statusText.textContent = `Hämtar ${endpoint}...`;

    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            cache: "no-store",
            mode: "cors"
        });

        if (!response.ok) throw new Error("Serverfel: " + response.status);

        const data = await response.json();
        currentData = data;

        statusText.textContent = "Data uppdaterad ✔";

        // Om vi är på deltävlingar.html
if (window.location.pathname.includes("deltavlingar")) {
    // currentData är ett objekt med alla deltävlingar
    selectTab(selectedTab);
} else {
    renderTable(data);
    renderChart(data);
    renderDashboard(data);
}

    } catch (error) {
        statusText.textContent = "Kunde inte hämta data ❌";
        document.getElementById("resultat").innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}

loadData();
