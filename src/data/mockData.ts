export type Gender = "MALE" | "FEMALE" | "OTHER";

export type Friend = {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  email: string;
  phone: string;
  gender: Gender;
  dateOfBirth: string; // yyyy-mm-dd
};

export type SlamEntry = {
  id: string;
  friendId: string;
  nicknameGiven: string;
  personality: string;
  favoriteColor: string;
  favoriteFood: string;
  favoriteSong: string;
  favoriteHobby: string;
  favoriteMovie: string;
  roleModel: string;
  bestMemory: string;
  whatILike: string;
  secretMessage: string;
  createdAt: string; // ISO
};

export const mockFriends: Friend[] = [
  {
    id: "f1",
    firstName: "Aarav",
    lastName: "Sharma",
    nickname: "Ari",
    email: "aarav.sharma@gmail.com",
    phone: "+91 98220 41123",
    gender: "MALE",
    dateOfBirth: "1999-09-14",
  },
  {
    id: "f2",
    firstName: "Meera",
    lastName: "Iyer",
    nickname: "Mimi",
    email: "meera.iyer@outlook.com",
    phone: "+91 90210 77345",
    gender: "FEMALE",
    dateOfBirth: "2000-03-02",
  },
  {
    id: "f3",
    firstName: "Rohan",
    lastName: "Deshmukh",
    nickname: "Ro",
    email: "rohan.d@yahoo.in",
    phone: "+91 87670 12908",
    gender: "MALE",
    dateOfBirth: "1998-12-25",
  },
  {
    id: "f4",
    firstName: "Sana",
    lastName: "Kapoor",
    nickname: "Sunny",
    email: "sana.kapoor@gmail.com",
    phone: "+91 99887 55210",
    gender: "FEMALE",
    dateOfBirth: "2001-06-19",
  },
];

export const mockEntries: SlamEntry[] = [
  {
    id: "s1",
    friendId: "f1",
    nicknameGiven: "Chai Buddy",
    personality: "Calm on the outside, absolute chaos in a group chat.",
    favoriteColor: "#8b5cf6",
    favoriteFood: "Misal Pav",
    favoriteSong: "Kabira — Tochi Raina",
    favoriteHobby: "Late night guitar",
    favoriteMovie: "Interstellar",
    roleModel: "His grandfather",
    bestMemory: "That 2 AM terrace conversation about everything and nothing.",
    whatILike: "You listen like nothing else in the world matters.",
    secretMessage: "You were the reason I didn't drop out that semester. Thank you.",
    createdAt: "2026-02-11T10:20:00.000Z",
  },
  {
    id: "s2",
    friendId: "f2",
    nicknameGiven: "Sunshine",
    personality: "Loud laugh, softest heart, terrible at keeping surprises.",
    favoriteColor: "#f43f5e",
    favoriteFood: "Cold coffee & fries",
    favoriteSong: "Sunflower — Post Malone",
    favoriteHobby: "Sketching strangers",
    favoriteMovie: "La La Land",
    roleModel: "Her mom",
    bestMemory: "Getting drenched in the first monsoon rain outside the library.",
    whatILike: "You make ordinary Tuesdays feel like festivals.",
    secretMessage: "I still have the paper crane you folded for me in 2019.",
    createdAt: "2026-04-06T08:05:00.000Z",
  },
  {
    id: "s3",
    friendId: "f3",
    nicknameGiven: "Captain",
    personality: "Plans everything, follows nothing, somehow always wins.",
    favoriteColor: "#f59e0b",
    favoriteFood: "Butter chicken",
    favoriteSong: "Viva La Vida — Coldplay",
    favoriteHobby: "Street cricket",
    favoriteMovie: "3 Idiots",
    roleModel: "MS Dhoni",
    bestMemory: "Winning the inter-college final with 2 balls to spare.",
    whatILike: "You show up. Always. Without being asked.",
    secretMessage: "You're the brother I got to choose.",
    createdAt: "2026-06-23T15:45:00.000Z",
  },
];
