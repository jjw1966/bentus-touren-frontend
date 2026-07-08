const BASE = "https://bentus-touren-backend-1-cfci.onrender.com";

export async function getEvents() {
  const r = await fetch(`${BASE}/events`);
  return r.json();
}

export async function getEvent(name) {
  const r = await fetch(`${BASE}/event/${name}`);
  return r.json();
}

export async function getNH(name) {
  const r = await fetch(`${BASE}/event/${name}/nh`);
  return r.json();
}

export async function getLD(name) {
  const r = await fetch(`${BASE}/event/${name}/ld`);
  return r.json();
}

export async function getTour() {
  const r = await fetch(`${BASE}/tour`);
  return r.json();
}
