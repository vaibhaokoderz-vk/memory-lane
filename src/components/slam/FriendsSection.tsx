import { Cake, Mail, NotebookText, Pencil, Phone, Trash2, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Friend } from "@/data/mockData";
import {
  daysUntilBirthday,
  friendFullName,
  initials,
  useSlamBook,
} from "@/hooks/useSlamBook";

const genderLabel: Record<Friend["gender"], string> = {
  MALE: "Male",
  FEMALE: "Female",
  OTHER: "Other",
};

export function FriendsSection({
  query,
  onAddFriend,
  onEditFriend,
  onViewSlams,
}: {
  query: string;
  onAddFriend: () => void;
  onEditFriend: (f: Friend) => void;
  onViewSlams: (f: Friend) => void;
}) {
  const { friends, entries, deleteFriend } = useSlamBook();
  const q = query.trim().toLowerCase();

  const visible = q
    ? friends.filter((f) =>
        [f.firstName, f.lastName, f.nickname, f.email, f.phone]
          .join(" ")
          .toLowerCase()
          .includes(q),
      )
    : friends;

  const remove = (f: Friend) => {
    deleteFriend(f.id);
    toast.success(`${friendFullName(f)} removed from your slam book`);
  };

  return (
    <section id="friends" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Your friends</h2>
          <p className="mt-2 text-muted-foreground">
            {friends.length} bond{friends.length === 1 ? "" : "s"} kept safe in the book.
          </p>
        </div>
        <Button className="rounded-full" onClick={onAddFriend}>
          <UserPlus className="size-4" /> Add friend
        </Button>
      </div>

      {visible.length === 0 ? (
        <div className="card-surface mt-8 p-12 text-center">
          <p className="font-display text-xl">No friends found</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {q ? "Try a different search." : "Add your first friend to begin."}
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((f) => {
            const days = daysUntilBirthday(f.dateOfBirth);
            const count = entries.filter((e) => e.friendId === f.id).length;
            return (
              <article key={f.id} className="card-surface overflow-hidden">
                <div className="gradient-brand h-2 w-full" />
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <span className="gradient-brand flex size-14 shrink-0 items-center justify-center rounded-2xl font-display text-lg font-bold text-primary-foreground">
                      {initials(f)}
                    </span>
                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-bold">{friendFullName(f)}</h3>
                      <p className="font-hand text-lg text-violet">“{f.nickname}”</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="secondary" className="rounded-full">
                      {genderLabel[f.gender]}
                    </Badge>
                    <Badge variant="outline" className="rounded-full">
                      <NotebookText className="size-3" /> {count} slam{count === 1 ? "" : "s"}
                    </Badge>
                    {days !== null && (
                      <Badge className="rounded-full">
                        <Cake className="size-3" />{" "}
                        {days === 0 ? "Birthday today!" : `${days} days to birthday`}
                      </Badge>
                    )}
                  </div>

                  <dl className="mt-4 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="size-4 shrink-0" />
                      <dd className="truncate">{f.email}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="size-4 shrink-0" />
                      <dd>{f.phone}</dd>
                    </div>
                  </dl>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="rounded-full"
                      onClick={() => onViewSlams(f)}
                    >
                      View slams
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="rounded-full"
                      onClick={() => onEditFriend(f)}
                    >
                      <Pencil className="size-4" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="rounded-full text-destructive hover:text-destructive"
                      onClick={() => remove(f)}
                    >
                      <Trash2 className="size-4" /> Delete
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
