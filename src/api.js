const BASE_URL = "https://bentus-touren-backend-1-cfci.onrender.com";

async function fetchJSON(url) {
  try {
    const res = await fetch(url, {
      method: "GET",
      mode: "cors", // 🟩 viktigt för Render‑frontend
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Fetch failed: ${res.status}`);
    }

    const data = await res.json();
    console.log("FetchJSON:", url, data); // 🟩 loggar direkt i konsolen
    return data;
  } catch (err) {
    console.error("FetchJSON‑fel:", err);
    throw err;
  }
}

export async function getEvent(name) {
  return await fetchJSON(`${BASE_URL}/event/${name}`);
}

export async function getNH(name) {
  return await fetchJSON(`${BASE_URL}/event/${name}/nh`);
}

export async function getLD(name) {
  return await fetchJSON(`${BASE_URL}/event/${name}/ld`);
}

export async function getEvents() {
  return await fetchJSON(`${BASE_URL}/events`);
}

export async function getTour() {
  return await fetchJSON(`${BASE_URL}/tour`);
}
