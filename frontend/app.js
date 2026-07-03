console.log("✅ app.js laddades!");
// ============================
// 1. Mobilmeny – hamburger
// ============================
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (hamburger && mobileMenu) {
        hamburger.addEventListener("click", () => {
            mobileMenu.classList.toggle("show");
        });
    }

    // ============================
    // 2. Datahämtning från backend
    // ============================
    const backendBaseUrl = "https://bentus-touren-backend.onrender.com"; // Render-backend

    window.loadData = async function (endpoint, tableId) {
        try {
            const response = await fetch(`${backendBaseUrl}/${endpoint}`);
            if (!response.ok) throw new Error("Fel vid hämtning av data");

            const data = await response.json();
            const table = document.getElementById(tableId);
            const thead = table.querySelector("thead");
            const tbody = table.querySelector("tbody");

            // Rensa tabellen
            thead.innerHTML = "";
            tbody.innerHTML = "";

            // Om data är tomt
            if (!data || data.length === 0) {
                tbody.innerHTML = "<tr><td>Ingen data hittades</td></tr>";
                return;
            }

            // Skapa rubriker
            const headers = Object.keys(data[0]);
            const headerRow = document.createElement("tr");
            headers.forEach(h => {
                const th = document.createElement("th");
                th.textContent = h;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);

            // Skapa rader
            data.forEach(row => {
                const tr = document.createElement("tr");
                headers.forEach(h => {
                    const td = document.createElement("td");
                    td.textContent = row[h];
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });

            // Uppdatera statusrad
            const updated = document.getElementById("updated");
            const now = new Date().toLocaleString("sv-SE");
            updated.textContent = `Senast uppdaterad från backend: ${now}`;

        } catch (error) {
            console.error("❌ Kunde inte hämta data:", error);
            alert("Kunde inte hämta data från backend.");
        }
    };
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
        console.error("Fel vid hämtning av uppdateringstid:", error);
        element.textContent = "Kunde inte hämta uppdateringstid.";
    }
}

// ============================
// Mobilmeny – hamburger
// ============================
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (hamburger && mobileMenu) {
        hamburger.addEventListener("click", () => {
            mobileMenu.classList.toggle("show");
        });
    }
});

// =========================================================
// Kör uppdateringsindikatorn automatiskt vid sidladdning
// =========================================================

document.addEventListener("DOMContentLoaded", showLastUpdated);
