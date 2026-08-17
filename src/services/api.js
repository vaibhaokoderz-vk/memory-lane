import { friends as seedFriends, slamBook as seedSlamBook } from "../data/dummyData";

/**
 * API layer. Currently backed by in-memory dummy data so the UI is always
 * populated. Swap `USE_DUMMY` to false (and set API_BASE) to talk to the
 * existing Spring Boot REST API — the function signatures stay identical.
 */
const USE_DUMMY = true;
const API_BASE = "/api";

let friendsStore = [...seedFriends];

const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

async function request(path, options) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.status === 204 ? null : res.json();
}

export async function getSlamBook() {
  if (!USE_DUMMY) return request("/slambook");
  await delay();
  return seedSlamBook;
}

export async function getFriends() {
  if (!USE_DUMMY) return request("/friends");
  await delay();
  return friendsStore;
}

export async function getFriendById(id) {
  if (!USE_DUMMY) return request(`/friends/${id}`);
  await delay();
  return friendsStore.find((f) => String(f.id) === String(id)) || null;
}

export async function createFriend(friend) {
  if (!USE_DUMMY)
    return request("/friends", { method: "POST", body: JSON.stringify(friend) });
  await delay();
  const created = {
    id: String(Date.now()),
    emoji: "🙂",
    favorite: false,
    quote: friend.message || "A new page in my slam book 💖",
    addedOn: new Date().toISOString().slice(0, 10),
    ...friend,
  };
  friendsStore = [created, ...friendsStore];
  return created;
}

export async function updateFriend(id, friend) {
  if (!USE_DUMMY)
    return request(`/friends/${id}`, { method: "PUT", body: JSON.stringify(friend) });
  await delay();
  friendsStore = friendsStore.map((f) =>
    String(f.id) === String(id) ? { ...f, ...friend } : f,
  );
  return friendsStore.find((f) => String(f.id) === String(id));
}

export async function deleteFriend(id) {
  if (!USE_DUMMY) return request(`/friends/${id}`, { method: "DELETE" });
  await delay();
  friendsStore = friendsStore.filter((f) => String(f.id) !== String(id));
  return true;
}
