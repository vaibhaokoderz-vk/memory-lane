import { createFileRoute, Link } from "@tanstack/react-router";
import useAsync from "../hooks/useAsync";
import { getFriends } from "../services/api";
import FriendCard from "../components/FriendCard";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Digital Slam Book" },
      {
        name: "description",
        content: "See your friends, memories and favourites at a glance in your slam book.",
      },
      { property: "og:title", content: "Dashboard — Digital Slam Book" },
      {
        property: "og:description",
        content: "Your friendship stats, recent friends and quick actions.",
      },
    ],
  }),
  component: Dashboard,
});

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function Dashboard() {
  const { data: friends, loading } = useAsync(getFriends, []);
  const list = friends || [];
  const favorites = list.filter((f) => f.favorite).length;

  return (
    <main className="page">
      <section className="section">
        <h1>{greeting()}, Vaibhao! 👋</h1>
        <p className="muted">Ready to add another memory?</p>
      </section>

      <section className="section">
        <div className="grid grid-3">
          <div className="card stat">
            <span aria-hidden="true">👥</span>
            <span className="stat-value">{loading ? "—" : list.length}</span>
            <span className="muted">Friends</span>
          </div>
          <div className="card stat">
            <span aria-hidden="true">💖</span>
            <span className="stat-value">28</span>
            <span className="muted">Memories</span>
          </div>
          <div className="card stat">
            <span aria-hidden="true">⭐</span>
            <span className="stat-value">{loading ? "—" : favorites}</span>
            <span className="muted">Favorites</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Recent Friends</h2>
          <Link to="/friends" className="card-link">
            See all →
          </Link>
        </div>
        <div className="grid">
          {loading
            ? null
            : [...list]
                .sort((a, b) => String(b.addedOn).localeCompare(String(a.addedOn)))
                .slice(0, 4)
                .map((friend) => <FriendCard friend={friend} key={friend.id} />)}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Quick Actions</h2>
        </div>
        <div className="btn-row">
          <Link to="/friends/new" className="btn btn-primary">
            + Add a Friend
          </Link>
          <Link to="/slam-book" className="btn btn-secondary">
            Open My Slam Book
          </Link>
          <Link to="/friends" className="btn btn-outline">
            Browse Friends
          </Link>
        </div>
      </section>
    </main>
  );
}
