import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import useAsync from "../../hooks/useAsync";
import { getFriends } from "../../services/api";
import FriendCard from "../../components/FriendCard";

export const Route = createFileRoute("/friends/")({
  head: () => ({
    meta: [
      { title: "My Friends — Digital Slam Book" },
      {
        name: "description",
        content: "Search and browse every friend saved in your digital slam book.",
      },
      { property: "og:title", content: "My Friends — Digital Slam Book" },
      {
        property: "og:description",
        content: "All your favourite people, one warm and searchable page.",
      },
    ],
  }),
  component: FriendsPage,
});

const FILTERS = ["All", "Male", "Female", "Recent"];

function FriendsPage() {
  const { data, loading } = useAsync(getFriends, []);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const friends = useMemo(() => {
    let list = data || [];
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (f) =>
          f.name.toLowerCase().includes(q) || (f.nickname || "").toLowerCase().includes(q),
      );
    }
    if (filter === "Male" || filter === "Female") {
      list = list.filter((f) => f.gender === filter);
    }
    if (filter === "Recent") {
      list = [...list].sort((a, b) => String(b.addedOn).localeCompare(String(a.addedOn)));
    }
    return list;
  }, [data, query, filter]);

  return (
    <main className="page">
      <div className="section-head">
        <h1>My Friends 💖</h1>
        <Link to="/friends/new" className="btn btn-primary btn-sm">
          + Add Friend
        </Link>
      </div>

      <div className="section" style={{ display: "grid", gap: 16 }}>
        <div className="field" style={{ margin: 0 }}>
          <label htmlFor="friend-search">Search your friends</label>
          <input
            id="friend-search"
            type="search"
            className="search-input"
            placeholder="🔍 Search your friends..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="chips" role="group" aria-label="Filter friends">
          {FILTERS.map((item) => (
            <button
              type="button"
              key={item}
              className="chip"
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="muted">Loading your friends…</p>
      ) : friends.length === 0 ? (
        <div className="card">
          <h2>No friends found</h2>
          <p className="muted">
            Try a different search, or add someone special to your slam book.
          </p>
          <Link to="/friends/new" className="btn btn-primary">
            + Add a Friend
          </Link>
        </div>
      ) : (
        <div className="grid">
          {friends.map((friend) => (
            <FriendCard friend={friend} key={friend.id} />
          ))}
        </div>
      )}
    </main>
  );
}
