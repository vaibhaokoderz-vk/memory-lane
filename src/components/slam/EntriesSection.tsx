import { useState } from "react";
import {
  CalendarDays,
  Download,
  Eye,
  EyeOff,
  Film,
  Heart,
  Music,
  Palette,
  Pencil,
  Star,
  Trash2,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SlamEntry } from "@/data/mockData";
import { friendFullName, useSlamBook } from "@/hooks/useSlamBook";
import { exportEntryCard } from "@/lib/exportCard";

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

function Favorite({
  icon: Icon,
  label,
  value,
  swatch,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  swatch?: string;
}) {
  return (
    <div className="rounded-xl border border-border/70 bg-secondary/40 p-3">
      <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="size-3.5" /> {label}
      </p>
      <p className="mt-1 flex items-center gap-2 truncate text-sm font-medium">
        {swatch && (
          <span
            className="inline-block size-4 shrink-0 rounded-full border border-border"
            style={{ backgroundColor: swatch }}
          />
        )}
        {value || "—"}
      </p>
    </div>
  );
}

export function EntriesSection({
  query,
  friendFilterId,
  onClearFilter,
  onEditEntry,
}: {
  query: string;
  friendFilterId: string | null;
  onClearFilter: () => void;
  onEditEntry: (e: SlamEntry) => void;
}) {
  const { entries, friends, deleteEntry } = useSlamBook();
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [detail, setDetail] = useState<SlamEntry | null>(null);

  const nameOf = (id: string) => {
    const f = friends.find((x) => x.id === id);
    return f ? friendFullName(f) : "Unknown friend";
  };

  const q = query.trim().toLowerCase();
  const visible = entries
    .filter((e) => (friendFilterId ? e.friendId === friendFilterId : true))
    .filter((e) =>
      q
        ? [
            nameOf(e.friendId),
            e.nicknameGiven,
            e.personality,
            e.favoriteFood,
            e.favoriteSong,
            e.favoriteHobby,
            e.favoriteMovie,
            e.roleModel,
            e.bestMemory,
            e.whatILike,
          ]
            .join(" ")
            .toLowerCase()
            .includes(q)
        : true,
    );

  const filterFriend = friendFilterId ? friends.find((f) => f.id === friendFilterId) : null;

  const remove = (e: SlamEntry) => {
    deleteEntry(e.id);
    toast.success("Slam entry deleted");
  };

  const download = (e: SlamEntry) => {
    exportEntryCard({
      title: nameOf(e.friendId),
      subtitle: `“${e.nicknameGiven}” · ${fmtDate(e.createdAt)}`,
      color: e.favoriteColor,
      fileName: `slam-${nameOf(e.friendId).toLowerCase().replace(/\s+/g, "-")}`,
      lines: [
        ["Personality", e.personality],
        ["Favorite food", e.favoriteFood],
        ["Favorite song", e.favoriteSong],
        ["Favorite hobby", e.favoriteHobby],
        ["Favorite movie", e.favoriteMovie],
        ["Role model", e.roleModel],
        ["Best memory together", e.bestMemory],
        ["What I like about you", e.whatILike],
      ],
    });
    toast.success("Card exported as image");
  };

  return (
    <section id="entries" className="relative overflow-hidden py-16">
      <span className="blur-orb right-10 top-10 size-72 bg-rose opacity-30" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Slam entries</h2>
            <p className="mt-2 text-muted-foreground">
              A scrapbook of nicknames, favorites and things left unsaid.
            </p>
          </div>
          {filterFriend && (
            <Button variant="secondary" className="rounded-full" onClick={onClearFilter}>
              <X className="size-4" /> Showing {friendFullName(filterFriend)} · clear filter
            </Button>
          )}
        </div>

        {visible.length === 0 ? (
          <div className="card-surface mt-8 p-12 text-center">
            <p className="font-display text-xl">No slam entries yet</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Write one below and it'll show up here instantly.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((e) => (
              <article
                key={e.id}
                className="card-surface flex flex-col overflow-hidden bg-card p-4"
              >
                <div
                  className="flex h-28 items-end rounded-xl p-4"
                  style={{
                    background: `linear-gradient(135deg, ${e.favoriteColor}, ${e.favoriteColor}55)`,
                  }}
                >
                  <p className="font-hand text-2xl text-card drop-shadow-sm mix-blend-luminosity">
                    “{e.nicknameGiven}”
                  </p>
                </div>

                <div className="mt-4 flex-1">
                  <h3 className="text-lg font-bold">{nameOf(e.friendId)}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {e.personality}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Favorite
                      icon={Palette}
                      label="Color"
                      value={e.favoriteColor}
                      swatch={e.favoriteColor}
                    />
                    <Favorite icon={UtensilsCrossed} label="Food" value={e.favoriteFood} />
                    <Favorite icon={Music} label="Song" value={e.favoriteSong} />
                    <Favorite icon={Film} label="Movie" value={e.favoriteMovie} />
                    <Favorite icon={Heart} label="Hobby" value={e.favoriteHobby} />
                    <Favorite icon={Star} label="Role model" value={e.roleModel} />
                  </div>

                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Best memory together
                      </p>
                      <p className="text-sm line-clamp-2">{e.bestMemory || "—"}</p>
                    </div>
                    <div className="rounded-xl border border-dashed border-border p-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Secret message
                        </p>
                        <button
                          className="inline-flex items-center gap-1 text-xs font-medium text-violet"
                          onClick={() =>
                            setRevealed((r) => ({ ...r, [e.id]: !r[e.id] }))
                          }
                        >
                          {revealed[e.id] ? (
                            <>
                              <EyeOff className="size-3.5" /> Hide
                            </>
                          ) : (
                            <>
                              <Eye className="size-3.5" /> Reveal
                            </>
                          )}
                        </button>
                      </div>
                      <p className="mt-1 text-sm">
                        {revealed[e.id]
                          ? e.secretMessage || "—"
                          : "•••••• hidden until you reveal it"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
                  <Badge variant="outline" className="rounded-full">
                    <CalendarDays className="size-3" /> {fmtDate(e.createdAt)}
                  </Badge>
                  <div className="ml-auto flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="rounded-full"
                      onClick={() => setDetail(e)}
                    >
                      Details
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full"
                      aria-label="Edit entry"
                      onClick={() => onEditEntry(e)}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full"
                      aria-label="Download card"
                      onClick={() => download(e)}
                    >
                      <Download className="size-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full text-destructive hover:text-destructive"
                      aria-label="Delete entry"
                      onClick={() => remove(e)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!detail} onOpenChange={(v) => !v && setDetail(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl sm:max-w-lg">
          {detail && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">
                  {nameOf(detail.friendId)}
                </DialogTitle>
                <DialogDescription>
                  “{detail.nicknameGiven}” · {fmtDate(detail.createdAt)}
                </DialogDescription>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">{detail.personality}</p>
              <div className="grid grid-cols-2 gap-2">
                <Favorite
                  icon={Palette}
                  label="Color"
                  value={detail.favoriteColor}
                  swatch={detail.favoriteColor}
                />
                <Favorite icon={UtensilsCrossed} label="Food" value={detail.favoriteFood} />
                <Favorite icon={Music} label="Song" value={detail.favoriteSong} />
                <Favorite icon={Film} label="Movie" value={detail.favoriteMovie} />
                <Favorite icon={Heart} label="Hobby" value={detail.favoriteHobby} />
                <Favorite icon={Star} label="Role model" value={detail.roleModel} />
              </div>
              <div className="space-y-3">
                {[
                  ["Best memory together", detail.bestMemory],
                  ["What I like about you", detail.whatILike],
                  ["Secret message", detail.secretMessage],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-secondary/50 p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {label}
                    </p>
                    <p className="mt-1 text-sm">{value || "—"}</p>
                  </div>
                ))}
              </div>
              <Button className="rounded-full" onClick={() => download(detail)}>
                <Download className="size-4" /> Download card
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
