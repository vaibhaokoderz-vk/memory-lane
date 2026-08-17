import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Digital Slam Book — Keep Your Friendships Forever" },
      {
        name: "description",
        content:
          "Create your digital slam book: collect friends, favourite memories and little notes in one beautiful place, in light or dark mode.",
      },
      { property: "og:title", content: "Digital Slam Book — Your Memories, Your Friends" },
      {
        property: "og:description",
        content: "A warm, modern slam book for keeping your favourite memories forever.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="page">
      <section className="hero">
        <div>
          <span className="eyebrow">💌 A friendship keepsake</span>
          <h1>
            Your Memories.
            <br />
            Your Friends.
            <br />
            Your Story. 💖
          </h1>
          <p className="lead">
            Create your digital Slam Book and keep your favorite memories forever — the
            silly ones, the sweet ones and everything in between.
          </p>
          <div className="btn-row">
            <Link to="/slam-book" className="btn btn-primary">
              Create My Slam Book
            </Link>
            <Link to="/friends" className="btn btn-secondary">
              View My Friends
            </Link>
          </div>
        </div>

        <div className="memory-book">
          <div className="book-emoji" aria-hidden="true">
            📖
          </div>
          <h2 style={{ marginTop: 8 }}>Memory Book</h2>
          <p className="muted" style={{ marginBottom: 8 }}>
            8 friends · 28 memories · 5 favorites
          </p>
          <div>
            <span className="polaroid">🎂 Birthday surprise</span>
            <span className="polaroid">🌧️ Monsoon trek</span>
            <span className="polaroid">🎤 Farewell night</span>
            <span className="polaroid">☕ 2 AM talks</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>How it works</h2>
        </div>
        <div className="grid grid-3">
          {[
            {
              icon: "🖊️",
              title: "Write your page",
              text: "Add your hobbies, favourites and dreams — your own slam book page.",
            },
            {
              icon: "💌",
              title: "Add your friends",
              text: "One friendly form: how you met, their favourites and your message.",
            },
            {
              icon: "📸",
              title: "Revisit anytime",
              text: "Open a friend to read the memory you saved, years from now.",
            },
          ].map((item) => (
            <article className="card" key={item.title}>
              <div style={{ fontSize: "1.8rem" }} aria-hidden="true">
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p className="muted" style={{ marginBottom: 0 }}>
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
