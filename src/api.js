const BASE_URL = "https://bentus-touren.onrender.com";

export async function getEvents() {
  const res = await fetch(`${BASE_URL}/events`);
  return res.json();
}

export async function getEvent(name) {
  const res = await fetch(`${BASE_URL}/event/${encodeURIComponent(name)}`);
  return res.json();
}

export async function getNH(name) {
  const res = await fetch(`${BASE_URL}/event/${encodeURIComponent(name)}/nh`);
  return res.json();
}

export async function getLD(name) {
  const res = await fetch(`${BASE_URL}/event/${encodeURIComponent(name)}/ld`);
  return res.json();
}

export async function getTeams(name) {
  const res = await fetch(`${BASE_URL}/event/${encodeURIComponent(name)}/teams`);
  return res.json();
}
