import { Link } from "@tanstack/react-router";

export default function FriendCard({ friend }) {
  return (
    <article className="card friend-card">
      <div className="friend-photo" aria-hidden="true">
        {friend.emoji || "👤"}
      </div>
      <h3 className="friend-name">{friend.name}</h3>
      <p className="muted" style={{ margin: 0, fontSize: "0.9rem" }}>
        &ldquo;{friend.nickname}&rdquo;
      </p>
      {friend.favorite ? <span className="badge">⭐ Favorite</span> : null}
      <p className="friend-quote">{friend.quote}</p>
      <Link
        to="/friends/$id"
        params={{ id: String(friend.id) }}
        className="card-link"
        aria-label={`View memories with ${friend.name}`}
      >
        View Memory →
      </Link>
    </article>
  );
}
