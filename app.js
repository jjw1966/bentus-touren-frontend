// ================================
// Hamburger-meny
// ================================
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
});

// ================================
// Tema-växling + loggobyte
// ================================
const logo = document.getElementById("logo");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

function updateLogo(e) {
    if (e.matches) {
        document.body.classList.add("dark");
        logo.src = "bentus-logo-dark.png";
    } else {
        document.body.classList.remove("dark");
        logo.src = "bentus-logo-light.png";
    }
}

updateLogo(prefersDark);
prefersDark.addEventListener("change", updateLogo);

// ================================
// Data-laddning
// ================================
async function loadData(endpoint, containerId) {
    const url = `https://bentus-touren-backend-1.onrender.com/${endpoint}`;
    const response = await fetch(url);
    const data = await response.json();
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    function createTable(title, rows) {
        let html = `<div class="section"><h2>${title}</h2><table><thead><tr>`;
        Object.keys(rows[0]).forEach(col => html += `<th>${col}</th>`);
        html += "</tr></thead><tbody>";
        rows.forEach(row => {
            html += "<tr>";
            Object.values(row).forEach(val => html += `<td>${val}</td>`);
            html += "</tr>";
        });
        html += "</tbody></table></div>";
        return html;
    }

    if (data.Topp5) container.innerHTML += createTable("Topp 5", data.Topp5);
    if (data.Spelade_rundor) container.innerHTML += createTable("Spelade rundor", data.Spelade_rundor);
    if (data["NH-liga"]) container.innerHTML += createTable("Närmast hål", data["NH-liga"]);
    if (data["LD-liga"]) container.innerHTML += createTable("Längsta drive", data["LD-liga"]);
    if (data.Deltävlingsvinster) container.innerHTML += createTable("Deltävlingsvinster", data.Deltävlingsvinster);

    document.getElementById("updated").textContent =
        "Senast uppdaterad: " + new Date().toLocaleString();
}

// ================================
// Ladda dashboard automatiskt
// ================================
if (document.getElementById("dashboardContainer")) {
    loadData("dashboard", "dashboardContainer");
}
