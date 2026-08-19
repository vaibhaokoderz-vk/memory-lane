import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { mockSlamBooks, type Friend, type SlamBook } from "@/data/slamBookData";

const BOOKS_KEY = "dsb.books.v2";
const ACTIVE_KEY = "dsb.activeBook.v2";
const THEME_KEY = "dsb.theme.v2";

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 12);

export type SlamBookInput = Omit<
  SlamBook,
  "slamBookId" | "createdAt" | "updatedAt" | "friends"
>;
export type FriendInput = Omit<
  Friend,
  "friendId" | "slamBookId" | "createdAt" | "updatedAt"
>;

type Ctx = {
  hydrated: boolean;
  books: SlamBook[];
  activeBook: SlamBook | undefined;
  activeBookId: string;
  setActiveBookId: (id: string) => void;
  addBook: (b: SlamBookInput) => string;
  updateBook: (id: string, b: SlamBookInput) => void;
  deleteBook: (id: string) => void;
  addFriend: (bookId: string, f: FriendInput) => void;
  updateFriend: (bookId: string, friendId: string, f: FriendInput) => void;
  deleteFriend: (bookId: string, friendId: string) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const SlamBooksContext = createContext<Ctx | null>(null);

export function SlamBooksProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [books, setBooks] = useState<SlamBook[]>(mockSlamBooks);
  const [activeBookId, setActiveBookId] = useState<string>(
    mockSlamBooks[0]?.slamBookId ?? "",
  );
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = load(BOOKS_KEY, mockSlamBooks);
    setBooks(stored);
    const storedActive = load(ACTIVE_KEY, stored[0]?.slamBookId ?? "");
    setActiveBookId(
      stored.some((b) => b.slamBookId === storedActive)
        ? storedActive
        : (stored[0]?.slamBookId ?? ""),
    );
    setTheme(load<"light" | "dark">(THEME_KEY, "light"));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
  }, [books, hydrated]);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(ACTIVE_KEY, JSON.stringify(activeBookId));
  }, [activeBookId, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(THEME_KEY, JSON.stringify(theme));
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme, hydrated]);

  const addBook = useCallback((b: SlamBookInput) => {
    const now = new Date().toISOString();
    const slamBookId = uid();
    setBooks((prev) => [
      ...prev,
      { ...b, slamBookId, createdAt: now, updatedAt: now, friends: [] },
    ]);
    setActiveBookId(slamBookId);
    return slamBookId;
  }, []);

  const updateBook = useCallback((id: string, b: SlamBookInput) => {
    setBooks((prev) =>
      prev.map((p) =>
        p.slamBookId === id ? { ...p, ...b, updatedAt: new Date().toISOString() } : p,
      ),
    );
  }, []);

  const deleteBook = useCallback((id: string) => {
    setBooks((prev) => {
      const next = prev.filter((p) => p.slamBookId !== id);
      setActiveBookId((cur) => (cur === id ? (next[0]?.slamBookId ?? "") : cur));
      return next;
    });
  }, []);

  const addFriend = useCallback((bookId: string, f: FriendInput) => {
    const now = new Date().toISOString();
    setBooks((prev) =>
      prev.map((b) =>
        b.slamBookId === bookId
          ? {
              ...b,
              updatedAt: now,
              friends: [
                {
                  ...f,
                  friendId: uid(),
                  slamBookId: bookId,
                  createdAt: now,
                  updatedAt: now,
                },
                ...b.friends,
              ],
            }
          : b,
      ),
    );
  }, []);

  const updateFriend = useCallback(
    (bookId: string, friendId: string, f: FriendInput) => {
      const now = new Date().toISOString();
      setBooks((prev) =>
        prev.map((b) =>
          b.slamBookId === bookId
            ? {
                ...b,
                updatedAt: now,
                friends: b.friends.map((fr) =>
                  fr.friendId === friendId ? { ...fr, ...f, updatedAt: now } : fr,
                ),
              }
            : b,
        ),
      );
    },
    [],
  );

  const deleteFriend = useCallback((bookId: string, friendId: string) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.slamBookId === bookId
          ? { ...b, friends: b.friends.filter((fr) => fr.friendId !== friendId) }
          : b,
      ),
    );
  }, []);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    [],
  );

  const activeBook = books.find((b) => b.slamBookId === activeBookId) ?? books[0];

  const value = useMemo(
    () => ({
      hydrated,
      books,
      activeBook,
      activeBookId: activeBook?.slamBookId ?? "",
      setActiveBookId,
      addBook,
      updateBook,
      deleteBook,
      addFriend,
      updateFriend,
      deleteFriend,
      theme,
      toggleTheme,
    }),
    [
      hydrated,
      books,
      activeBook,
      addBook,
      updateBook,
      deleteBook,
      addFriend,
      updateFriend,
      deleteFriend,
      theme,
      toggleTheme,
    ],
  );

  return <SlamBooksContext.Provider value={value}>{children}</SlamBooksContext.Provider>;
}

export function useSlamBooks() {
  const ctx = useContext(SlamBooksContext);
  if (!ctx) throw new Error("useSlamBooks must be used inside SlamBooksProvider");
  return ctx;
}

export function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
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

export function friendsSince(date: string) {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}
