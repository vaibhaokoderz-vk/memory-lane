# Memory Lane Journal

Create a modern, aesthetic, and fully functional Single Page Application (SPA) in React (Tailwind CSS, Lucide Icons, Shadcn UI components) for a "Digital Slam Book".

⚠️ Note: Backend integration is postponed. Implement everything with local state / mock data / localStorage persistence so all features work standalone right out of the box.

---

### 🎨 Visual Theme & Vibe:

- Aesthetic: Modern digital scrapbook / memory journal with smooth pastel gradient accents (violet, rose, amber), rounded cards (rounded-2xl), soft borders, and floating blur effects.

- Clean typography, micro-interactions, dark/light theme switch support.

---

### 📄 Layout & Sections (Single Page Architecture):

1. **Header / Navbar**:

   - Brand logo with icon ("DigitalSlamBook 📖")

   - Smooth-scroll tabs: Home, Friends, Slam Entries, Write a Slam

   - Quick Action Buttons: "+ Add Friend" (opens modal), "+ Write Entry" (opens form)

   - Search bar to instantly filter friends and slam memories.

2. **Hero / Landing Section**:

   - Catchy Headline: "Lock Your Friendships & Memories in a Digital Keepsake"

   - Subtitle: "A digital slam book to keep your favorite bonds, secrets, and moments forever."

   - Dynamic Stat Cards (calculated from local state):

     * Total Friends count

     * Total Slam Entries count

     * Memories Logged

   - Quick-action interactive banners.

3. **Friends Section (CRUD with Mock Data)**:

   - Initial pre-filled mock list of 3-4 friends with realistic data:

     * Fields: firstName, lastName, nickname, email, phone, gender (MALE/FEMALE/OTHER), dateOfBirth.

   - Beautiful friend cards with avatar generator / initials, gender badge, birthday countdown, and quick contact details.

   - Actions per card:

     * Edit Friend (opens pre-filled modal)

     * Delete Friend (removes from state with confirm toast)

     * "View Slams" (filters slam entries by this friend)

   - "Add Friend" Modal with full form validation.

4. **Slam Book Entries Section (Scrapbook Display)**:

   - Interactive polaroid/card gallery for slam entries containing:

     * Friend Name & Nickname given

     * Favorites Grid: Favorite Color (with color swatch), Food, Song/Music, Hobby, Movie, Role Model

     * Emotional Sentiments: "Best memory together", "What I like about you", "Secret Message / Note" (with hide/reveal toggle)

     * Date created tag

   - Card Actions: View Full Details Modal, Edit Entry, Delete Entry, Download/Export Card preview.

5. **Interactive Multi-Step "Write a Slam" Form**:

   - Step 1: Select Friend (Dropdown containing all friends currently in state)

   - Step 2: Nicknames & Personality

   - Step 3: Favorites (Color picker, Food, Hobby, Song, Movie, Role Model)

   - Step 4: Heartfelt Notes (Best Memory, What makes you special, Secret message)

   - On Submit: Appends new entry to local state/localStorage, shows success toast notification, and navigates back to entries gallery.

---

### 💾 Mock Data Architecture:

- Store initial dummy data in `/src/data/mockData.js` or React Context / LocalStorage hook.

- Ensure all create/update/delete operations instantly update the UI reactively without page reloads.

- Include Toast alerts (Sonner / React Hot Toast) for all actions (e.g., "Friend added successfully!", "Slam entry saved!").

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/319f50a2-ae74-42f5-a1ce-3927d3e73e5f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
