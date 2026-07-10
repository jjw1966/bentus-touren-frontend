const API_URL = "https://bentus-touren-backend-1-cfci.onrender.com/dashboard";

async function loadDashboard() {
    const container = document.getElementById("dashboard");

    try {
        const res = await fetch(API_URL);
        const data = await res.json();

        renderSection(container, "Topp 5", data.topp5, p => `${p.spelare} – ${p.tourpoäng} poäng`);
        renderSection(container, "Närmast hål", data.nh, p => `${p.spelare} – ${p.nh}`);
        renderSection(container, "Längsta drive", data.ld, p => `${p.spelare} – ${p.ld}`);
        renderSection(container, "Spelade rundor", data.spelade, p => `${p.spelare} – ${p.antal}`);
        renderSection(container, "Deltävlingsvinster", data.vinster, p => `${p.spelare} – ${p.vinster}`);
        renderSection(container, "Landskamper", data.landskamper, p => `${p.lag} – ${p.vinster} vinster (${p.poäng} poäng)`);
        renderSection(container, "Deltävlingar", data.deltävlingar, p => `${p.datum} – ${p.klubb}`);

    } catch (err) {
        container.innerHTML = `<p style="color:red;">Fel vid hämtning av data.</p>`;
        console.error(err);
    }
}

function renderSection(container, title, items, formatter) {
    const card = document.createElement("div");
    card.className = "card";

    const h2 = document.createElement("h2");
    h2.textContent = title;
    card.appendChild(h2);

    const ul = document.createElement("ul");
    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = formatter(item);
        ul.appendChild(li);
    });

    card.appendChild(ul);
    container.appendChild(card);
}

loadDashboard();
