import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { createFriend } from "../../services/api";

export const Route = createFileRoute("/friends/new")({
  head: () => ({
    meta: [
      { title: "Add a Friend — Digital Slam Book" },
      {
        name: "description",
        content:
          "Tell us a little about someone special: how you met, their favourites and your message.",
      },
      { property: "og:title", content: "Add a Friend — Digital Slam Book" },
      {
        property: "og:description",
        content: "A friendly form to save a new friendship in your slam book.",
      },
    ],
  }),
  component: AddFriend,
});

const EMPTY = {
  name: "",
  nickname: "",
  gender: "",
  birthday: "",
  howWeMet: "",
  firstImpression: "",
  bestMemory: "",
  favoriteFood: "",
  favoriteMovie: "",
  favoriteSong: "",
  favoriteHobby: "",
  bestQuality: "",
  funnyHabit: "",
  message: "",
};

function Field({ id, label, value, onChange, placeholder, error, type = "text", textarea }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {textarea ? (
        <textarea
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}
      {error ? (
        <p className="error-text" id={`${id}-error`}>
          ⚠️ {error}
        </p>
      ) : null}
    </div>
  );
}

function AddFriend() {
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const set = (key) => (value) => setForm((prev) => ({ ...prev, [key]: value }));

  const onSubmit = async (event) => {
    event.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Please add your friend's name.";
    if (!form.howWeMet.trim()) next.howWeMet = "Tell us how you two met.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSaving(true);
    const created = await createFriend(form);
    setSaving(false);
    navigate({ to: "/friends/$id", params: { id: String(created.id) } });
  };

  return (
    <main className="page">
      <Link to="/friends" className="back-link">
        ← Back to Friends
      </Link>
      <h1>Add a Friend 💌</h1>
      <p className="muted">Tell us a little about someone special.</p>

      <form onSubmit={onSubmit} noValidate>
        <fieldset
          className="card section"
          style={{ border: "1px solid var(--color-border)" }}
        >
          <legend style={{ fontWeight: 700, padding: "0 8px" }}>About Your Friend</legend>
          <div className="form-grid">
            <Field
              id="name"
              label="Name"
              value={form.name}
              onChange={set("name")}
              placeholder="Rahul Patil"
              error={errors.name}
            />
            <Field
              id="nickname"
              label="Nickname"
              value={form.nickname}
              onChange={set("nickname")}
              placeholder="What do you call them?"
            />
            <div className="field">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                value={form.gender}
                onChange={(e) => set("gender")(e.target.value)}
              >
                <option value="">Prefer not to say</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <Field
              id="birthday"
              label="Birthday"
              value={form.birthday}
              onChange={set("birthday")}
              placeholder="12 March"
            />
          </div>
        </fieldset>

        <fieldset
          className="card section"
          style={{ border: "1px solid var(--color-border)" }}
        >
          <legend style={{ fontWeight: 700, padding: "0 8px" }}>Friendship</legend>
          <Field
            id="howWeMet"
            label="How did you meet?"
            value={form.howWeMet}
            onChange={set("howWeMet")}
            placeholder="We sat on the same bench in first year…"
            error={errors.howWeMet}
            textarea
          />
          <Field
            id="firstImpression"
            label="First impression"
            value={form.firstImpression}
            onChange={set("firstImpression")}
            placeholder="Quiet at first, then unstoppable."
            textarea
          />
          <Field
            id="bestMemory"
            label="Best memory"
            value={form.bestMemory}
            onChange={set("bestMemory")}
            placeholder="That midnight cake in the corridor 🎂"
            textarea
          />
        </fieldset>

        <fieldset
          className="card section"
          style={{ border: "1px solid var(--color-border)" }}
        >
          <legend style={{ fontWeight: 700, padding: "0 8px" }}>Favorites</legend>
          <div className="form-grid">
            <Field
              id="favoriteFood"
              label="Favorite food"
              value={form.favoriteFood}
              onChange={set("favoriteFood")}
              placeholder="Vada Pav"
            />
            <Field
              id="favoriteMovie"
              label="Favorite movie"
              value={form.favoriteMovie}
              onChange={set("favoriteMovie")}
              placeholder="3 Idiots"
            />
            <Field
              id="favoriteSong"
              label="Favorite song"
              value={form.favoriteSong}
              onChange={set("favoriteSong")}
              placeholder="Kabira"
            />
            <Field
              id="favoriteHobby"
              label="Favorite hobby"
              value={form.favoriteHobby}
              onChange={set("favoriteHobby")}
              placeholder="Cricket"
            />
          </div>
        </fieldset>

        <fieldset
          className="card section"
          style={{ border: "1px solid var(--color-border)" }}
        >
          <legend style={{ fontWeight: 700, padding: "0 8px" }}>A Little More</legend>
          <div className="form-grid">
            <Field
              id="bestQuality"
              label="Best quality"
              value={form.bestQuality}
              onChange={set("bestQuality")}
              placeholder="Always honest"
            />
            <Field
              id="funnyHabit"
              label="Funny habit"
              value={form.funnyHabit}
              onChange={set("funnyHabit")}
              placeholder="Says 'one minute' for an hour"
            />
          </div>
          <Field
            id="message"
            label="Message"
            value={form.message}
            onChange={set("message")}
            placeholder="Write something they'd love to read years from now 💖"
            textarea
          />
        </fieldset>

        <div className="btn-row">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving…" : "Save Friend"}
          </button>
          <Link to="/friends" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}
