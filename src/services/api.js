import { dummyActivity, dummyFriends, dummySlamBook } from "../data/dummyData";

/**
 * Central API layer.
 *
 * While the Spring Boot backend is not wired up, every call is served from
 * centralized dummy data so the whole UI is populated. Set
 * VITE_API_BASE_URL and VITE_USE_API=true to switch to the real REST API —
 * the function signatures never change.
 */
const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
const USE_API = import.meta.env.VITE_USE_API === "true" && Boolean(API_BASE);

let friendsStore = dummyFriends.map((f) => ({ ...f }));
let slamBookStore = { ...dummySlamBook };

const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

async function request(path, options) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error("REQUEST_FAILED");
  return res.status === 204 ? null : res.json();
}

export async function getSlamBook() {
  if (USE_API) return request("/api/slambook");
  await delay();
  return { ...slamBookStore };
}

export async function updateSlamBook(data) {
  if (USE_API)
    return request("/api/slambook", { method: "PUT", body: JSON.stringify(data) });
  await delay();
  slamBookStore = { ...slamBookStore, ...data };
  return { ...slamBookStore };
}

export async function getFriends() {
  if (USE_API) return request("/api/friends");
  await delay();
  return friendsStore.map((f) => ({ ...f }));
}

export async function getFriendById(id) {
  if (USE_API) return request(`/api/friends/${id}`);
  await delay();
  const found = friendsStore.find((f) => String(f.id) === String(id));
  return found ? { ...found } : null;
}

export async function createFriend(friend) {
  if (USE_API)
    return request("/api/friends", { method: "POST", body: JSON.stringify(friend) });
  await delay();
  const created = {
    favorite: false,
    quote: friend.message || "A new page in my slam book 💖",
    ...friend,
    id: Date.now(),
    addedOn: new Date().toISOString().slice(0, 10),
  };
  friendsStore = [created, ...friendsStore];
  return { ...created };
}

export async function updateFriend(id, friend) {
  if (USE_API)
    return request(`/api/friends/${id}`, { method: "PUT", body: JSON.stringify(friend) });
  await delay();
  friendsStore = friendsStore.map((f) =>
    String(f.id) === String(id) ? { ...f, ...friend } : f,
  );
  return { ...friendsStore.find((f) => String(f.id) === String(id)) };
}

export async function deleteFriend(id) {
  if (USE_API) return request(`/api/friends/${id}`, { method: "DELETE" });
  await delay();
  friendsStore = friendsStore.filter((f) => String(f.id) !== String(id));
  return true;
}

export async function getActivity() {
  if (USE_API) return request("/api/activity");
  await delay(200);
  return dummyActivity;
}
