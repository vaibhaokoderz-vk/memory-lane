import { Cake, Heart, NotebookPen, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSlamBook } from "@/hooks/useSlamBook";

export function Hero({
  onAddFriend,
  onWriteEntry,
}: {
  onAddFriend: () => void;
  onWriteEntry: () => void;
}) {
  const { friends, entries } = useSlamBook();

  const memories = entries.filter(
    (e) => e.bestMemory.trim() || e.secretMessage.trim() || e.whatILike.trim(),
  ).length;

  const stats = [
    { label: "Friends in the book", value: friends.length, icon: Users },
    { label: "Slam entries", value: entries.length, icon: NotebookPen },
    { label: "Memories logged", value: memories, icon: Heart },
  ];

  return (
    <section id="home" className="relative overflow-hidden">
      <div className="gradient-hero absolute inset-0 -z-10" />
      <span className="blur-orb -left-16 top-0 size-72 bg-violet" />
      <span className="blur-orb right-0 top-24 size-80 bg-rose" />
      <span className="blur-orb bottom-0 left-1/3 size-72 bg-amber" />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground backdrop-blur">
            <Sparkles className="size-3.5 text-violet" /> Your keepsake, forever
          </span>
          <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">
            Lock Your Friendships &{" "}
            <span className="text-gradient-brand">Memories</span> in a Digital Keepsake
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            A digital slam book to keep your favorite bonds, secrets, and moments forever.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="rounded-full" onClick={onWriteEntry}>
              <NotebookPen className="size-4" /> Write a slam
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="rounded-full"
              onClick={onAddFriend}
            >
              <Users className="size-4" /> Add a friend
            </Button>
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="card-surface bg-card/80 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
                <span className="gradient-brand flex size-9 items-center justify-center rounded-xl">
                  <s.icon className="size-4 text-primary-foreground" />
                </span>
              </div>
              <p className="mt-3 font-display text-4xl font-black">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <button
            onClick={() =>
              document
                .getElementById("friends")
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            className="card-surface flex items-center gap-4 bg-card/80 p-5 text-left backdrop-blur"
          >
            <span className="flex size-11 items-center justify-center rounded-2xl bg-secondary">
              <Cake className="size-5 text-rose" />
            </span>
            <span>
              <span className="block font-semibold">Never miss a birthday</span>
              <span className="block text-sm text-muted-foreground">
                Countdowns on every friend card.
              </span>
            </span>
          </button>
          <button
            onClick={() =>
              document
                .getElementById("entries")
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            className="card-surface flex items-center gap-4 bg-card/80 p-5 text-left backdrop-blur"
          >
            <span className="flex size-11 items-center justify-center rounded-2xl bg-secondary">
              <Heart className="size-5 text-violet" />
            </span>
            <span>
              <span className="block font-semibold">Browse the scrapbook</span>
              <span className="block text-sm text-muted-foreground">
                Polaroid cards with secrets you can reveal.
              </span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
