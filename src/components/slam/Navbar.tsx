import { BookHeart, Moon, PenLine, Search, Sun, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSlamBook } from "@/hooks/useSlamBook";

const tabs = [
  { id: "home", label: "Home" },
  { id: "friends", label: "Friends" },
  { id: "entries", label: "Slam Entries" },
  { id: "write", label: "Write a Slam" },
];

export function Navbar({
  query,
  onQueryChange,
  onAddFriend,
  onWriteEntry,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  onAddFriend: () => void;
  onWriteEntry: () => void;
}) {
  const { theme, toggleTheme } = useSlamBook();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2 rounded-2xl px-1 py-1 transition-transform hover:scale-[1.02]"
        >
          <span className="gradient-brand flex size-10 items-center justify-center rounded-2xl shadow-soft">
            <BookHeart className="size-5 text-primary-foreground" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            DigitalSlamBook <span aria-hidden>📖</span>
          </span>
        </button>

        <nav className="order-3 flex w-full items-center gap-1 overflow-x-auto lg:order-none lg:w-auto lg:ml-4">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => scrollTo(t.id)}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search friends & memories…"
              aria-label="Search friends and memories"
              className="w-44 rounded-full pl-9 md:w-64"
            />
          </div>
          <Button size="sm" variant="secondary" className="rounded-full" onClick={onAddFriend}>
            <UserPlus className="size-4" /> Add Friend
          </Button>
          <Button size="sm" className="rounded-full" onClick={onWriteEntry}>
            <PenLine className="size-4" /> Write Entry
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
        </div>

        <div className="relative order-4 w-full sm:hidden">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search friends & memories…"
            className="rounded-full pl-9"
          />
        </div>
      </div>
    </header>
  );
}
