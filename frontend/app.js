// =========================================================
// Ladda tabell-data från backend
// =========================================================

async function loadData(endpoint, tableId) {
    const url = `https://bentus-touren-backend.onrender.com/${endpoint}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const tableHead = document.querySelector(`#${tableId} thead`);
        const tableBody = document.querySelector(`#${tableId} tbody`);

        tableHead.innerHTML = "";
        tableBody.innerHTML = "";

        if (!data || data.length === 0) {
            tableBody.innerHTML = "<tr><td>Inga data hittades.</td></tr>";
            return;
        }

        // Skapa tabellhuvud
        const headers = Object.keys(data[0]);
        let headRow = "<tr>";
        headers.forEach(h => headRow += `<th>${h}</th>`);
        headRow += "</tr>";
        tableHead.innerHTML = headRow;

        // Skapa tabellrader
        data.forEach(row => {
            let rowHtml = "<tr>";
            headers.forEach(h => rowHtml += `<td>${row[h] ?? ""}</td>`);
            rowHtml += "</tr>";
            tableBody.innerHTML += rowHtml;
        });

    } catch (error) {
        console.error("Fel vid hämtning:", error);
        alert("Kunde inte hämta data från backend.");
    }
}



// =========================================================
// Visa “Senast uppdaterad från backend”
// =========================================================

async function showLastUpdated() {
    const url = "https://bentus-touren-backend.onrender.com/health";
    const element = document.getElementById("updated");

    if (!element) return; // sidan har ingen indikator

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Försök hitta en tidstämpel i svaret
        const timestamp =
            data.timestamp ||
            data.last_updated ||
            data.updated ||
            new Date().toISOString();

        const formatted = new Date(timestamp).toLocaleString("sv-SE");

        element.textContent = "Senast uppdaterad från backend: " + formatted;

    } catch (error) {
        console.error("Fel vid hä
