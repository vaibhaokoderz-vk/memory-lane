export type Gender = "MALE" | "FEMALE" | "OTHER";

export type Friend = {
  friendId: string;
  slamBookId: string;
  friendName: string;
  relationship: string;
  friendshipRating: number; // 1..5
  bestFriend: boolean;
  friendshipDate: string; // YYYY-MM-DD
  message: string;
  songName: string;
  songArtist: string;
  songUrl: string;
  songDedication: string;
  memoryPhotoUrl: string;
  memoryText: string;
  createdAt: string;
  updatedAt: string;
};

export type SlamBook = {
  slamBookId: string;
  fullName: string;
  nickName: string;
  profilePhotoUrl: string;
  dateOfBirth: string; // YYYY-MM-DD
  gender: Gender;
  favoriteColor: string;
  hobbies: string[];
  aboutMe: string;
  createdAt: string;
  updatedAt: string;
  friends: Friend[];
};

const BOOK_ID = "sb-1";

export const mockSlamBooks: SlamBook[] = [
  {
    slamBookId: BOOK_ID,
    fullName: "Aarav Sharma",
    nickName: "Ari",
    profilePhotoUrl:
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=400&q=80",
    dateOfBirth: "1999-09-14",
    gender: "MALE",
    favoriteColor: "#8b5cf6",
    hobbies: ["Coding", "Photography", "Late-night guitar", "Road trips"],
    aboutMe:
      "Engineering student by day, terrace-philosopher by night. I collect polaroids, playlists and people who make ordinary Tuesdays feel like festivals.",
    createdAt: "2026-01-05T09:00:00.000Z",
    updatedAt: "2026-05-18T09:00:00.000Z",
    friends: [
      {
        friendId: "fr-1",
        slamBookId: BOOK_ID,
        friendName: "Meera Iyer",
        relationship: "Bestie",
        friendshipRating: 5,
        bestFriend: true,
        friendshipDate: "2016-06-12",
        message:
          "You are the only person who can read my silence and still reply with the right thing. Ten years of chaos and I'd sign up again.",
        songName: "Sunflower",
        songArtist: "Post Malone & Swae Lee",
        songUrl: "https://open.spotify.com/track/3KkXRkHbMCARz0aVfEt68P",
        songDedication: "Our monsoon-scooter-ride anthem. Volume always at 100.",
        memoryPhotoUrl:
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
        memoryText: "That night we drove to the hills just to watch the stars refuse to show up.",
        createdAt: "2026-02-11T10:20:00.000Z",
        updatedAt: "2026-02-11T10:20:00.000Z",
      },
      {
        friendId: "fr-2",
        slamBookId: BOOK_ID,
        friendName: "Rohan Deshmukh",
        relationship: "School Buddy",
        friendshipRating: 4,
        bestFriend: true,
        friendshipDate: "2011-04-03",
        message:
          "From bunking maths to building startups — you've been the constant chaos I trust the most.",
        songName: "Viva La Vida",
        songArtist: "Coldplay",
        songUrl: "https://open.spotify.com/track/1mea3bSkSGXuIRvnydlB5b",
        songDedication: "Played on loop the day we won the inter-college final.",
        memoryPhotoUrl:
          "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=800&q=80",
        memoryText: "Street cricket finals, two balls to spare, one broken window.",
        createdAt: "2026-03-02T12:00:00.000Z",
        updatedAt: "2026-03-02T12:00:00.000Z",
      },
      {
        friendId: "fr-3",
        slamBookId: BOOK_ID,
        friendName: "Sana Kapoor",
        relationship: "College Roommate",
        friendshipRating: 5,
        bestFriend: false,
        friendshipDate: "2018-08-20",
        message:
          "You taught me that a 3 AM cup of chai can fix almost anything. Thanks for never letting me spiral alone.",
        songName: "Kabira",
        songArtist: "Tochi Raina & Rekha Bhardwaj",
        songUrl: "https://open.spotify.com/track/6XVdBVy0dSjOZEjEZPMbmk",
        songDedication: "For every hostel-corridor singalong we pretended was a concert.",
        memoryPhotoUrl:
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
        memoryText: "Getting drenched in the first monsoon rain outside the library.",
        createdAt: "2026-04-06T08:05:00.000Z",
        updatedAt: "2026-04-06T08:05:00.000Z",
      },
      {
        friendId: "fr-4",
        slamBookId: BOOK_ID,
        friendName: "Dev Menon",
        relationship: "Colleague",
        friendshipRating: 3,
        bestFriend: false,
        friendshipDate: "2023-11-09",
        message:
          "Half mentor, half menace. Our deadline-night pizza debates are the best part of the job.",
        songName: "Instant Crush",
        songArtist: "Daft Punk",
        songUrl: "https://open.spotify.com/track/2cGxRwrMyEAp8dEbuZaVv6",
        songDedication: "Deploy-day soundtrack. Nothing ships without it.",
        memoryPhotoUrl:
          "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80",
        memoryText: "The 2 AM office launch we swore we'd never repeat (we did, twice).",
        createdAt: "2026-05-18T18:30:00.000Z",
        updatedAt: "2026-05-18T18:30:00.000Z",
      },
    ],
  },
];
