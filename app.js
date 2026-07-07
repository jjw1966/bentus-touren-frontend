// ================================
// Hamburger-meny
// ================================
const hamburger = document.createElement("div");
hamburger.classList.add("hamburger");
hamburger.textContent = "☰";
document.querySelector("nav").appendChild(hamburger);

const mobileMenu = document.createElement("div");
mobileMenu.classList.add("mobile-menu");
mobileMenu.innerHTML = `
    <a href="index.html">Dashboard</a>
    <a href="spelare.html">Spelare</a>
    <a href="lagspel.html">Lagspel</a>
    <a href="tourstallning.html">Tourställning</a>
    <a href="deltavlingar.html">Deltävlingar</a>
`;
document.querySelector("nav").appendChild(mobileMenu);

hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
});

// ================================
// Tema-växling (auto baserat på system)
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
if (prefersDark) document.body.classList.add("dark");

// ================================
// Data-laddning
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

    document.getElementById("updated").textContent = "Senast uppdaterad: " + new Date().toLocaleString();
}

// Ladda dashboard automatiskt
if (document.getElementById("dashboardContainer")) {
    loadData("dashboard", "dashboardContainer");
}
