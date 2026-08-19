import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  mockEntries,
  mockFriends,
  type Friend,
  type SlamEntry,
} from "@/data/mockData";

const FRIENDS_KEY = "dsb.friends.v1";
const ENTRIES_KEY = "dsb.entries.v1";
const THEME_KEY = "dsb.theme.v1";

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

const uid = () => Math.random().toString(36).slice(2, 10);

type Ctx = {
  hydrated: boolean;
  friends: Friend[];
  entries: SlamEntry[];
  addFriend: (f: Omit<Friend, "id">) => void;
  updateFriend: (id: string, f: Omit<Friend, "id">) => void;
  deleteFriend: (id: string) => void;
  addEntry: (e: Omit<SlamEntry, "id" | "createdAt">) => void;
  updateEntry: (id: string, e: Omit<SlamEntry, "id" | "createdAt">) => void;
  deleteEntry: (id: string) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const SlamBookContext = createContext<Ctx | null>(null);

export function SlamBookProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [friends, setFriends] = useState<Friend[]>(mockFriends);
  const [entries, setEntries] = useState<SlamEntry[]>(mockEntries);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setFriends(load(FRIENDS_KEY, mockFriends));
    setEntries(load(ENTRIES_KEY, mockEntries));
    setTheme(load<"light" | "dark">(THEME_KEY, "light"));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(FRIENDS_KEY, JSON.stringify(friends));
  }, [friends, hydrated]);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
  }, [entries, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(THEME_KEY, JSON.stringify(theme));
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme, hydrated]);

  const addFriend = useCallback((f: Omit<Friend, "id">) => {
    setFriends((prev) => [{ ...f, id: uid() }, ...prev]);
  }, []);

  const updateFriend = useCallback((id: string, f: Omit<Friend, "id">) => {
    setFriends((prev) => prev.map((p) => (p.id === id ? { ...f, id } : p)));
  }, []);

  const deleteFriend = useCallback((id: string) => {
    setFriends((prev) => prev.filter((p) => p.id !== id));
    setEntries((prev) => prev.filter((e) => e.friendId !== id));
  }, []);

  const addEntry = useCallback((e: Omit<SlamEntry, "id" | "createdAt">) => {
    setEntries((prev) => [
      { ...e, id: uid(), createdAt: new Date().toISOString() },
      ...prev,
    ]);
  }, []);

  const updateEntry = useCallback((id: string, e: Omit<SlamEntry, "id" | "createdAt">) => {
    setEntries((prev) => prev.map((p) => (p.id === id ? { ...p, ...e } : p)));
  }, []);

  const deleteEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    [],
  );

  const value = useMemo(
    () => ({
      hydrated,
      friends,
      entries,
      addFriend,
      updateFriend,
      deleteFriend,
      addEntry,
      updateEntry,
      deleteEntry,
      theme,
      toggleTheme,
    }),
    [
      hydrated,
      friends,
      entries,
      addFriend,
      updateFriend,
      deleteFriend,
      addEntry,
      updateEntry,
      deleteEntry,
      theme,
      toggleTheme,
    ],
  );

  return <SlamBookContext.Provider value={value}>{children}</SlamBookContext.Provider>;
}

export function useSlamBook() {
  const ctx = useContext(SlamBookContext);
  if (!ctx) throw new Error("useSlamBook must be used inside SlamBookProvider");
  return ctx;
}

export function friendFullName(f: Friend) {
  return `${f.firstName} ${f.lastName}`.trim();
}

export function initials(f: Friend) {
  return `${f.firstName[0] ?? ""}${f.lastName[0] ?? ""}`.toUpperCase();
}

export function daysUntilBirthday(dob: string) {
  if (!dob) return null;
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let next = new Date(today.getFullYear(), d.getMonth(), d.getDate());
  if (next < today) next = new Date(today.getFullYear() + 1, d.getMonth(), d.getDate());
  return Math.round((next.getTime() - today.getTime()) / 86400000);
}
