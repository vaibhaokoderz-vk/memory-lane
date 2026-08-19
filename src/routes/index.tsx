import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/slam/Navbar";
import { Hero } from "@/components/slam/Hero";
import { FriendsSection } from "@/components/slam/FriendsSection";
import { EntriesSection } from "@/components/slam/EntriesSection";
import { WriteSlamSection } from "@/components/slam/WriteSlamSection";
import { FriendFormDialog } from "@/components/slam/FriendFormDialog";
import type { Friend, SlamEntry } from "@/data/mockData";
import { SlamBookProvider } from "@/hooks/useSlamBook";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Digital Slam Book — Turn Bonds into Digital Memories" },
      {
        name: "description",
        content:
          "A modern digital slam book: collect friends, write scrapbook slam entries, and keep favourites, memories and secret messages forever.",
      },
      { property: "og:title", content: "Digital Slam Book — Keep Friendships Forever" },
      {
        property: "og:description",
        content:
          "Add friends, write multi-step slam entries, and save favourites, best memories and secret messages in a pastel digital keepsake.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <SlamBookProvider>
      <SlamBookPage />
    </SlamBookProvider>
  ),
});

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SlamBookPage() {
  const [query, setQuery] = useState("");
  const [friendDialogOpen, setFriendDialogOpen] = useState(false);
  const [editingFriend, setEditingFriend] = useState<Friend | null>(null);
  const [editingEntry, setEditingEntry] = useState<SlamEntry | null>(null);
  const [friendFilterId, setFriendFilterId] = useState<string | null>(null);

  const openAddFriend = () => {
    setEditingFriend(null);
    setFriendDialogOpen(true);
  };

  const openEditFriend = (f: Friend) => {
    setEditingFriend(f);
    setFriendDialogOpen(true);
  };

  const goWrite = () => {
    setEditingEntry(null);
    setTimeout(() => scrollTo("write"), 30);
  };

  const editEntry = (e: SlamEntry) => {
    setEditingEntry(e);
    setTimeout(() => scrollTo("write"), 30);
  };

  const viewSlams = (f: Friend) => {
    setFriendFilterId(f.id);
    setTimeout(() => scrollTo("entries"), 30);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        query={query}
        onQueryChange={setQuery}
        onAddFriend={openAddFriend}
        onWriteEntry={goWrite}
      />
      <main>
        <Hero onAddFriend={openAddFriend} onWriteEntry={goWrite} />
        <FriendsSection
          query={query}
          onAddFriend={openAddFriend}
          onEditFriend={openEditFriend}
          onViewSlams={viewSlams}
        />
        <EntriesSection
          query={query}
          friendFilterId={friendFilterId}
          onClearFilter={() => setFriendFilterId(null)}
          onEditEntry={editEntry}
        />
        <WriteSlamSection
          editing={editingEntry}
          onDone={() => {
            setEditingEntry(null);
            setTimeout(() => scrollTo("entries"), 30);
          }}
          onCancelEdit={() => setEditingEntry(null)}
        />
      </main>
      <footer className="border-t border-border/70 py-10 text-center text-sm text-muted-foreground">
        Made with 💜 — Digital Slam Book
      </footer>
      <FriendFormDialog
        open={friendDialogOpen}
        onOpenChange={setFriendDialogOpen}
        editing={editingFriend}
      />
    </div>
  );
}
