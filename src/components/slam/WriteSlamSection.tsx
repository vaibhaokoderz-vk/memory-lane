import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { SlamEntry } from "@/data/mockData";
import { friendFullName, useSlamBook } from "@/hooks/useSlamBook";

type Draft = Omit<SlamEntry, "id" | "createdAt">;

const emptyDraft: Draft = {
  friendId: "",
  nicknameGiven: "",
  personality: "",
  favoriteColor: "#8b5cf6",
  favoriteFood: "",
  favoriteSong: "",
  favoriteHobby: "",
  favoriteMovie: "",
  roleModel: "",
  bestMemory: "",
  whatILike: "",
  secretMessage: "",
};

const steps = ["Friend", "Personality", "Favorites", "Notes"];

export function WriteSlamSection({
  editing,
  onDone,
  onCancelEdit,
}: {
  editing: SlamEntry | null;
  onDone: () => void;
  onCancelEdit: () => void;
}) {
  const { friends, addEntry, updateEntry } = useSlamBook();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editing) {
      const { id: _id, createdAt: _c, ...rest } = editing;
      setDraft(rest);
      setStep(0);
      setError("");
    }
  }, [editing]);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const canContinue = useMemo(() => {
    if (step === 0) return !!draft.friendId;
    if (step === 1) return draft.nicknameGiven.trim().length > 0;
    return true;
  }, [step, draft]);

  const next = () => {
    if (!canContinue) {
      setError(step === 0 ? "Pick a friend to continue" : "Give them a nickname");
      return;
    }
    setError("");
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const submit = () => {
    if (!draft.friendId || !draft.nicknameGiven.trim()) {
      setError("Friend and nickname are required");
      setStep(draft.friendId ? 1 : 0);
      return;
    }
    if (editing) {
      updateEntry(editing.id, draft);
      toast.success("Slam entry updated!");
    } else {
      addEntry(draft);
      toast.success("Slam entry saved!");
    }
    setDraft(emptyDraft);
    setStep(0);
    onDone();
  };

  const text = (
    key: keyof Draft,
    label: string,
    placeholder: string,
    long = false,
  ) => (
    <div className="space-y-1.5">
      <Label htmlFor={key}>{label}</Label>
      {long ? (
        <Textarea
          id={key}
          rows={3}
          value={draft[key] as string}
          placeholder={placeholder}
          onChange={(e) => set(key, e.target.value as never)}
          className="rounded-xl"
        />
      ) : (
        <Input
          id={key}
          value={draft[key] as string}
          placeholder={placeholder}
          onChange={(e) => set(key, e.target.value as never)}
          className="rounded-xl"
        />
      )}
    </div>
  );

  return (
    <section id="write" className="relative overflow-hidden py-16">
      <div className="gradient-hero absolute inset-0 -z-10 opacity-70" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground backdrop-blur">
            <Sparkles className="size-3.5 text-violet" /> {editing ? "Editing entry" : "Four quick steps"}
          </span>
          <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
            Write a slam
          </h2>
          <p className="mt-2 text-muted-foreground">
            Fill it like the paper slam books — honestly and a little dramatically.
          </p>
        </div>

        <div className="card-surface mt-10 bg-card/90 p-6 backdrop-blur sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold">
              Step {step + 1} of {steps.length} · {steps[step]}
            </p>
            {editing && (
              <Button
                size="sm"
                variant="ghost"
                className="rounded-full"
                onClick={() => {
                  setDraft(emptyDraft);
                  setStep(0);
                  onCancelEdit();
                }}
              >
                <X className="size-4" /> Cancel edit
              </Button>
            )}
          </div>
          <Progress value={((step + 1) / steps.length) * 100} className="mt-3" />

          <div className="mt-6 space-y-4">
            {step === 0 && (
              <div className="space-y-1.5">
                <Label>Select friend</Label>
                <Select
                  value={draft.friendId}
                  onValueChange={(v) => set("friendId", v)}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Who is this slam for?" />
                  </SelectTrigger>
                  <SelectContent>
                    {friends.map((f) => (
                      <SelectItem key={f.id} value={f.id}>
                        {friendFullName(f)} · {f.nickname}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {friends.length === 0 && (
                  <p className="text-xs text-muted-foreground">
                    Add a friend first — the dropdown reads from your friends list.
                  </p>
                )}
              </div>
            )}

            {step === 1 && (
              <>
                {text("nicknameGiven", "Nickname you give them", "Chai Buddy")}
                {text(
                  "personality",
                  "Their personality in one line",
                  "Calm outside, chaos in the group chat.",
                  true,
                )}
              </>
            )}

            {step === 2 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="favoriteColor">Favorite color</Label>
                  <div className="flex items-center gap-3">
                    <input
                      id="favoriteColor"
                      type="color"
                      value={draft.favoriteColor}
                      onChange={(e) => set("favoriteColor", e.target.value)}
                      className="size-11 cursor-pointer rounded-xl border border-border bg-transparent"
                    />
                    <Input
                      value={draft.favoriteColor}
                      onChange={(e) => set("favoriteColor", e.target.value)}
                      className="rounded-xl"
                    />
                  </div>
                </div>
                {text("favoriteFood", "Favorite food", "Misal Pav")}
                {text("favoriteHobby", "Favorite hobby", "Late night guitar")}
                {text("favoriteSong", "Favorite song / music", "Kabira")}
                {text("favoriteMovie", "Favorite movie", "Interstellar")}
                {text("roleModel", "Role model", "Their grandfather")}
              </div>
            )}

            {step === 3 && (
              <>
                {text("bestMemory", "Best memory together", "That 2 AM terrace talk…", true)}
                {text("whatILike", "What makes you special", "You listen like nothing else matters.", true)}
                {text("secretMessage", "Secret message / note", "Something only they should read.", true)}
              </>
            )}

            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <div className="mt-8 flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              className="rounded-full"
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
            >
              <ArrowLeft className="size-4" /> Back
            </Button>
            {step < steps.length - 1 ? (
              <Button className="rounded-full" onClick={next}>
                Continue <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button className="rounded-full" onClick={submit}>
                <Check className="size-4" /> {editing ? "Save changes" : "Save slam entry"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
