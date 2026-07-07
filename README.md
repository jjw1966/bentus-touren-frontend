# Bentus Touren — Frontend (React + Vite)

Detta är frontend-projektet för Bentus Touren.  
Det är byggt i React + Vite och kopplar upp sig mot backend-API:t:

https://bentus-touren-backend.onrender.com

Frontend visar:
- Dashboard (Sverige/Finland, Topp5, NH, LD)
- Tourställning (endast deltävlingar med resultat)
- Deltävlingar (huvudtabell + NH + LD + lagspel)
- Responsiv design
- Mörkt/ljust tema
- Autouppdatering

---

## 1. Rensa gamla filer

Innan du lägger in de nya filerna ska du radera allt i frontend-projektet:

Radera:
- src/
- index.html
- vite.config.js
- package.json

Frontend-mappen ska vara tom (förutom .git).

---

## 2. Lägg in de nya filerna

Lägg in de nya filerna från Copilot:

- src/
- index.html
- package.json
- vite.config.js

Installera beroenden:

npm install

---

## 3. Kör lokalt

Starta utvecklingsservern:

npm run dev

Frontend körs på:

http://localhost:5173

---

## 4. Deploy till Render

1. Gå till din Render Static Site-tjänst  
2. Tryck "Clear build cache"  
3. Tryck "Deploy"  
4. Render bygger automatiskt Vite-projektet  

---

## 5. Projektstruktur

src/
  api.js
  App.jsx
  main.jsx
  styles.css

  components/
    Navbar.jsx
    Footer.jsx

  pages/
    Dashboard.jsx
    Events.jsx
    Deltavling.jsx
    Tourstallning.jsx

---

## 6. Backend-API

Frontend använder följande endpoints:

- /events
- /event/<name>
- /event/<name>/nh
- /event/<name>/ld
- /event/<name>/teams

Backend är cache-optimerad och svarar snabbt.

---

## Klart

Frontend är nu redo att användas och deployas.
