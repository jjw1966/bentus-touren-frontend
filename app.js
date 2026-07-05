const API_URL = "https://bentus-touren-backend.onrender.com";

const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");
const updateButton = document.getElementById("updateButton");
const resultatDiv = document.getElementById("resultat");
const statusText = document.getElementById("status-text");

// ================================
// Mobilmeny
// ================================
menuButton.addEventListener("click", () => {
    menu.classList.toggle("show");
    menuButton.classList.toggle("open");
});

// ================================
// Tabellgenerator
// ================================
function createTable(data) {
    if (!Array.isArray(data)) {
        return `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    }

    let html = "<table><thead><tr>";

    const keys = Object.keys(data[0]);
    keys.forEach(k => html += `<th>${k}</th>`);
    html += "</tr></thead><tbody>";

    data.forEach(row => {
        html += "<tr>";
        keys.forEach(k => html += `<td>${row[k]}</td>`);
        html += "</tr>";
    });

    html += "</tbody></table>";
    return html;
}

// ================================
// Hämta data
// ================================
async function loadData() {
    statusText.textContent = "Hämtar data...";

    try {
        const response = await fetch(`${API_URL}/resultat`, {
            cache: "no-store",
            mode: "cors"
        });

        if (!response.ok) throw new Error("Serverfel: " + response.status);

        const data = await response.json();

        statusText.textContent = "Data uppdaterad ✔";
        resultatDiv.innerHTML = createTable(data);

    } catch (error) {
        statusText.textContent = "Kunde inte hämta data ❌";
        resultatDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}

updateButton.addEventListener("click", loadData);
loadData();