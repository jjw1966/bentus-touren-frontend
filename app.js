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

        const headers = Object.keys(data[0]);
        let headRow = "<tr>";
        headers.forEach(h => headRow += `<th>${h}</th>`);
        headRow += "</tr>";
        tableHead.innerHTML = headRow;

        data.forEach(row => {
            let rowHtml = "<tr>";
            headers.forEach(h => rowHtml += `<td>${row[h] ?? ""}</td>`);
            rowHtml += "</tr>";
            tableBody.innerHTML += rowHtml;
        });

    } catch (error) {
        console.error("Fel vid hämtning:", error);
        alert("Kunde inte hämta data.");
    }
}
