const BASE_URL = "https://bentus-touren-backend.onrender.com";

export async function getEvents() {
  return fetch(`${BASE_URL}/events`).then(r => r.json());
}

export async function getEvent(name) {
  return fetch(`${BASE_URL}/event/${name}`).then(r => r.json());
}

export async function getNH(name) {
  return fetch(`${BASE_URL}/event/${name}/nh`).then(r => r.json());
}

export async function getLD(name) {
  return fetch(`${BASE_URL}/event/${name}/ld`).then(r => r.json());
}

export async function getTeams(name) {
  return fetch(`${BASE_URL}/event/${name}/teams`).then(r => r.json());
}
