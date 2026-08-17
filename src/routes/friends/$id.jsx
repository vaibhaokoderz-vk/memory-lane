import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import useAsync from "../../hooks/useAsync";
import { deleteFriend, getFriendById } from "../../services/api";

export const Route = createFileRoute("/friends/$id")({
  head: () => ({
    meta: [
      { title: "Friend Memory — Digital Slam Book" },
      {
        name: "description",
        content:
          "How we met, first impressions, favourite things and the message saved for this friend.",
      },
      { property: "og:title", content: "Friend Memory — Digital Slam Book" },
      {
        property: "og:description",
        content: "A little page of memories kept for a special friend.",
      },
    ],
  }),
  component: FriendDetails,
});

function Row({ icon, title, children }) {
  return (
    <section className="card" style={{ marginBottom: 16 }}>
      <h2 style={{ fontSize: "1.15rem" }}>
        <span aria-hidden="true">{icon}</span> {title}
      </h2>
      <p style={{ marginBottom: 0 }}>{children}</p>
    </section>
  );
}

function FriendDetails() {
  const { id } = useParams({ from: "/friends/$id" });
  const navigate = useNavigate();
  const { data: friend, loading } = useAsync(() => getFriendById(id), [id]);

  if (loading) {
    return (
      <main className="page">
        <p className="muted">Opening the memory…</p>
      </main>
    );
  }

  if (!friend) {
    return (
      <main className="page">
        <h1>Friend not found</h1>
        <Link to="/friends" className="btn btn-secondary">
          ← Back to Friends
        </Link>
      </main>
    );
  }

  const onDelete = async () => {
    await deleteFriend(friend.id);
    navigate({ to: "/friends" });
  };

  return (
    <main className="page">
      <Link to="/friends" className="back-link">
        ← Back to Friends
      </Link>

      <header className="card profile-head section">
        <div className="friend-photo" style={{ width: 92, height: 92 }} aria-hidden="true">
          {friend.emoji || "👤"}
        </div>
        <div>
          <h1 style={{ margin: 0 }}>{friend.name}</h1>
          <p className="muted" style={{ margin: "2px 0 8px" }}>
            &ldquo;{friend.nickname}&rdquo; · 🎂 {friend.birthday}
          </p>
          {friend.favorite ? <span className="badge">⭐ One of my favorite people</span> : null}
        </div>
      </header>

      <Row icon="💬" title="How We Met">
        {friend.howWeMet}
      </Row>
      <Row icon="✨" title="First Impression">
        {friend.firstImpression}
      </Row>
      <Row icon="📸" title="Best Memory">
        {friend.bestMemory}
      </Row>

      <section className="grid grid-3 section">
        <div className="note-card">
          <p className="muted" style={{ margin: 0, fontSize: "0.85rem" }}>
            🍕 Favorite Food
          </p>
          <p style={{ margin: 0, fontWeight: 700 }}>{friend.favoriteFood}</p>
        </div>
        <div className="note-card">
          <p className="muted" style={{ margin: 0, fontSize: "0.85rem" }}>
            🎵 Favorite Song
          </p>
          <p style={{ margin: 0, fontWeight: 700 }}>{friend.favoriteSong}</p>
        </div>
        <div className="note-card">
          <p className="muted" style={{ margin: 0, fontSize: "0.85rem" }}>
            🎬 Favorite Movie
          </p>
          <p style={{ margin: 0, fontWeight: 700 }}>{friend.favoriteMovie}</p>
        </div>
      </section>

      <Row icon="💖" title="Message">
        {friend.message}
      </Row>

      <div className="btn-row">
        <Link to="/friends" className="btn btn-outline">
          Edit Memory
        </Link>
        <button type="button" className="btn btn-danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </main>
  );
}
