const API = "https://bentus-touren-backend-1.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("dashboardContainer")) loadDashboard();
    if (document.getElementById("eventList")) loadEvents();
    if (document.getElementById("eventContainer")) loadEvent();
    if (document.getElementById("tourContainer")) loadTour();
});

// ---------------------------------------------------------
// Dashboard
// ---------------------------------------------------------
async function loadDashboard() {
    const res = await fetch(`${API}/dashboard`);
    const data = await res.json();

    const container = document.getElementById("dashboardContainer");
    container.innerHTML = "";

    function table(title, rows) {
        if (!rows || rows.length === 0) return "";
        let html = `<div class="section"><h2>${title}</h2><table><thead><tr>`;
        Object.keys(rows[0]).forEach(k => html += `<th>${k}</th>`);
        html += "</tr></thead><tbody>";
        rows.forEach(r => {
            html += "<tr>";
            Object.values(r).forEach(v => html += `<td>${v}</td>`);
            html += "</tr>";
        });
        html += "</tbody></table></div>";
        return html;
    }

    container.innerHTML += table("Topp 5", data.Topp5);
    container.innerHTML += table("Spelade rundor", data.Spelade_rundor);
    container.innerHTML += table("Närmast hål", data["NH-liga"]);
    container.innerHTML += table("Längsta drive", data["LD-liga"]);
    container.innerHTML += table("Deltävlingar vinster", data.Deltävlingsvinster);
    container.innerHTML += table("Landskamper", data.Lagresultat);
}

// ---------------------------------------------------------
// Lista deltävlingar
// ---------------------------------------------------------
async function loadEvents() {
    const res = await fetch(`${API}/events`);
    const events = await res.json();

    const list = document.getElementById("eventList");
    list.innerHTML = "<h2>Aktiva deltävlingar</h2>";

    events.forEach(e => {
        list.innerHTML += `<p><a href="event.html?name=${encodeURIComponent(e)}">${e}</a></p>`;
    });
}

// ---------------------------------------------------------
// En deltävling
// ---------------------------------------------------------
async function loadEvent() {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");

    const res = await fetch(`${API}/event/${name}`);
    const data = await res.json();

    document.getElementById("eventTitle").textContent = data.event;

    const container = document.getElementById("eventContainer");

    function table(title, rows) {
        if (!rows || rows.length === 0) return "";
        let html = `<div class="section"><h2>${title}</h2><table><thead><tr>`;
        Object.keys(rows[0]).forEach(k => html += `<th>${k}</th>`);
        html += "</tr></thead><tbody>";
        rows.forEach(r => {
            html += "<tr>";
            Object.values(r).forEach(v => html += `<td>${v}</td>`);
            html += "</tr>";
        });
        html += "</tbody></table></div>";
        return html;
    }

    container.innerHTML =
        table("Huvudtabell", data.main) +
        table("Närmast hål", data.nh) +
        table("Längsta drive", data.ld);

    if (data.lagspel) {
        container.innerHTML += table("Lagspel", data.lagspel);
    }
}

// ---------------------------------------------------------
// Tourställning
// ---------------------------------------------------------
async function loadTour() {
    const res = await fetch(`${API}/tourstallning`);
    const rows = await res.json();

    const container = document.getElementById("tourContainer");
    container.innerHTML = "";

    container.innerHTML += `<div class="section"><h2>Tourställning</h2><table><thead><tr>`;
    Object.keys(rows[0]).forEach(k => container.innerHTML += `<th>${k}</th>`);
    container.innerHTML += "</tr></thead><tbody>";

    rows.forEach(r => {
        container.innerHTML += "<tr>";
        Object.values(r).forEach(v => container.innerHTML += `<td>${v}</td>`);
        container.innerHTML += "</tr>";
    });

    container.innerHTML += "</tbody></table></div>";
}
