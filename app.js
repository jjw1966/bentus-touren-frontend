// Backend-URL (måste vara HTTPS för GitHub Pages)
const API_URL = "https://bentus-touren-backend.onrender.com";

const response = await fetch(${API_URL}/resultat, { cache: "no-store" });


// -----------------------------
// MENY (mobil + desktop)
// -----------------------------
const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");

if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
        menu.classList.toggle("open");
    });
}

// -----------------------------
// UPPDATERA-KNAPP
// -----------------------------
const updateButton = document.getElementById("updateButton");
const resultatDiv = document.getElementById("resultat");

if (updateButton && resultatDiv) {
    updateButton.addEventListener("click", async () => {
        resultatDiv.innerHTML = "<p>Hämtar data...</p>";

        try {
            const response = await fetch(`${API_URL}/resultat`);
            if (!response.ok) {
                throw new Error("Serverfel: " + response.status);
            }

            const data = await response.json();

            // Visa resultatet snyggt
            resultatDiv.innerHTML = `
                <h2>Senaste resultat</h2>
                <pre>${JSON.stringify(data, null, 2)}</pre>
            `;
        } catch (error) {
            resultatDiv.innerHTML = `
                <p style="color:red;">
                    Kunde inte hämta data.<br>
                    Fel: ${error.message}
                </p>
            `;
        }
    });
}

// -----------------------------
// AUTOLOAD VID START (valfritt)
// -----------------------------
async function loadInitialData() {
    if (!resultatDiv) return;

    try {
        const response = await fetch(`${API_URL}/resultat`);
        const data = await response.json();

        resultatDiv.innerHTML = `
            <h2>Senaste resultat</h2>
            <pre>${JSON.stringify(data, null, 2)}</pre>
        `;
    } catch {
        resultatDiv.innerHTML = "<p>Kunde inte ladda data vid start.</p>";
    }
}

// Kör autoload när sidan öppnas
loadInitialData();