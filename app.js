// Backend-URL (HTTPS krävs för GitHub Pages)
const API_URL = "https://bentus-touren-backend.onrender.com";

// Element
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
// Hämta resultat från backend
// ================================
async function loadData() {
    statusText.textContent = "Hämtar data...";

    try {
        const response = await fetch(`${API_URL}/resultat`, {
            cache: "no-store",
            mode: "cors"
        });

        if (!response.ok) {
            throw new Error("Serverfel: " + response.status);
        }

        const data = await response.json();

        statusText.textContent = "Data uppdaterad ✔";

        resultatDiv.innerHTML = `
            <h2>Senaste resultat</h2>
            <pre>${JSON.stringify(data, null, 2)}</pre>
        `;
    } catch (error) {
        statusText.textContent = "Kunde inte hämta data ❌";
        resultatDiv.innerHTML = `
            <p style="color:red;">
                Fel vid hämtning:<br>
                ${error.message}
            </p>
        `;
    }
}

// ================================
// Uppdatera-knapp
// ================================
updateButton.addEventListener("click", loadData);

// ================================
// Ladda data vid start
// ================================
loadData();