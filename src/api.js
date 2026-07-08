const BASE_URL = "https://bentus-touren-backend-1-cfci.onrender.com";

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status}`);
  }
  return await res.json(); // 🟩 viktigt!
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
