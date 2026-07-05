/* ================================
   Grundtema (mörkt)
================================ */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background: #121212;
    color: #e0e0e0;
}

/* ================================
   Logga
================================ */
.logo {
    width: 90px;
    margin: 5px auto;
    display: block;
}

/* ================================
   Ljust tema
================================ */
body.light {
    background: #f5f5f5;
    color: #222;
}

body.light table {
    background: #fff;
    color: #222;
}

body.light .desktop-menu {
    background: #e0e0e0;
}

body.light .menu-actions button {
    background: #1976d2;
}

body.light #dashboard {
    background: #fff;
}

body.light .tabs button {
    background: #ddd;
    color: #222;
}

body.light .tabs button.active {
    background: #1976d2;
    color: #fff;
}

/* ================================
   Desktopmeny
================================ */
.desktop-menu {
    background: #1e1e1e;
    padding: 10px 0;
    border-bottom: 2px solid #333;
}

.desktop-menu ul {
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 25px;
    padding: 0;
    margin: 0;
}

.desktop-menu a {
    color: #e0e0e0;
    text-decoration: none;
    font-weight: bold;
}

.desktop-menu a.active {
    color: #4caf50;
}

/* ================================
   Meny-knappar
================================ */
.menu-actions {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 10px;
}

.menu-actions button {
    padding: 8px 12px;
    background: #4caf50;
    border: none;
    border-radius: 6px;
    color: white;
    cursor: pointer;
}

.menu-actions button:hover {
    background: #3e8e41;
}

/* ================================
   Tabbar (Deltävlingar)
================================ */
.tabs {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    margin: 10px auto;
    width: 95%;
}

.tabs button {
    padding: 8px 12px;
    background: #333;
    color: #e0e0e0;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

.tabs button.active {
    background: #4caf50;
    color: white;
}

/* ================================
   Tabeller
================================ */
table {
    width: 95%;
    margin: 10px auto;
    border-collapse: collapse;
    background: #1e1e1e;
    color: #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
}

thead {
    background: #333;
    color: #fff;
}

th {
    padding: 10px;
    border-bottom: 1px solid #333;
    cursor: pointer;
}

td {
    padding: 10px;
    border-bottom: 1px solid #333;
}

/* ================================
   Poängfärger (Top 3)
================================ */
.gold { color: #ffd700; font-weight: bold; }
.silver { color: #c0c0c0; font-weight: bold; }
.bronze { color: #cd7f32; font-weight: bold; }

/* ================================
   Sökfält
================================ */
#searchBox {
