import { createFileRoute } from "@tanstack/react-router";
import useAsync from "../hooks/useAsync";
import { getSlamBook } from "../services/api";

export const Route = createFileRoute("/slam-book")({
  head: () => ({
    meta: [
      { title: "My Slam Book — Vaibhao's Page" },
      {
        name: "description",
        content:
          "About me, hobbies, favourite things, dreams and memories — my own slam book page.",
      },
      { property: "og:title", content: "My Slam Book — Vaibhao's Page" },
      {
        property: "og:description",
        content: "A personal scrapbook page of hobbies, favourites, dreams and memories.",
      },
    ],
  }),
  component: SlamBookPage,
});

function SlamBookPage() {
  const { data: book, loading } = useAsync(getSlamBook, []);

  if (loading || !book) {
    return (
      <main className="page">
        <p className="muted">Opening your slam book…</p>
      </main>
    );
  }

  return (
    <main className="page">
      <header className="card profile-head section">
        <div className="friend-photo" style={{ width: 92, height: 92 }} aria-hidden="true">
          {book.emoji}
        </div>
        <div>
          <p className="muted" style={{ margin: 0 }}>
            📖 My Slam Book
          </p>
          <h1 style={{ margin: "4px 0" }}>{book.name}</h1>
          <p style={{ margin: 0 }} className="muted">
            &ldquo;{book.nickname}&rdquo; · {book.role}
          </p>
        </div>
      </header>

      <section className="section">
        <h2>About Me</h2>
        <div className="card">
          <p style={{ marginBottom: 0 }}>{book.about}</p>
        </div>
      </section>

      <section className="section">
        <h2>Hobbies</h2>
        <ul className="tag-list">
          {book.hobbies.map((hobby) => (
            <li className="tag" key={hobby}>
              {hobby}
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>Favorite Things</h2>
        <div className="grid grid-3">
          {Object.entries(book.favorites).map(([label, value]) => (
            <div className="card" key={label}>
              <p className="muted" style={{ margin: 0, fontSize: "0.85rem" }}>
                {label}
              </p>
              <p style={{ margin: 0, fontWeight: 700 }}>{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Dreams</h2>
        <div className="card">
          <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
            {book.dreams.map((dream) => (
              <li key={dream}>{dream}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <h2>Memories</h2>
        <div className="grid grid-3">
          {book.memories.map((memory) => (
            <div className="note-card" key={memory.title}>
              <h3 style={{ fontSize: "1rem" }}>{memory.title}</h3>
              <p className="muted" style={{ marginBottom: 0 }}>
                {memory.note}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
