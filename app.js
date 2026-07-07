const API = "https://bentus-touren-backend-1.onrender.com";

// ------------------------------
// Tema-hantering
// ------------------------------

function applyTheme(theme) {
    document.body.classList.toggle("dark", theme === "dark");

    const logo = document.getElementById("logo");
    if (logo) {
        logo.src = theme === "dark"
            ? "bentus-logo-dark.png"
            : "bentus-logo-light.png";
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);

    const toggle = document.getElementById("themeToggle");
    if (toggle) {
        toggle.addEventListener("click", () => {
            const newTheme = document.body.classList.contains("dark")
                ? "light"
                : "dark";

            localStorage.setItem("theme", newTheme);
            applyTheme(newTheme);
        });
    }
}

document.addEventListener("DOMContentLoaded", initTheme);

// ------------------------------
// Dashboard
// ------------------------------

async function loadDashboard() {
    const res = await fetch(`${API}/dashboard`);
    const data = await res.json();

    const container = document.getElementById("dashboardContainer");
    container.innerHTML = "";

    function table(title, rows) {
        if (!rows || rows.length === 0) return "";
        let html = `<div class="section"><h2>${title}</h2><table><thead><tr>`;
        Object.keys(rows[0]).forEach(k => html += `<th>${k}</th>`);
        html += "
