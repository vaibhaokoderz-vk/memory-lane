# Memory Lane

Digital Slam Book — Beautiful Light & Dark Theme

Build a beautiful, modern, friendly and easy-to-use Digital Slam Book web application.

The application should feel:

Simple • Beautiful • Emotional • Modern • Attractive • Comfortable

The UI must be understandable for everyone while maintaining a premium visual identity.

1. TECHNOLOGY

Use ONLY:

React.js

JavaScript

HTML / JSX

Plain CSS

Use:

React Hooks

React Router

JavaScript ES6+

CSS3

Fetch API or Axios

DO NOT USE:

TypeScript

Tailwind CSS

Bootstrap

Material UI

Chakra UI

Ant Design

Other UI frameworks

2. LIGHT + DARK MODE

Implement a complete Light Mode / Dark Mode system.

Place a theme toggle button in the main navigation.

Example:

☀️ Light
🌙 Dark


Prefer a compact icon toggle:

☀️  ─── 🌙


The toggle must be easy to understand.

When clicked:

Light Mode
     ↕
Dark Mode


Change the entire application theme smoothly.

Do NOT change the application's brand identity between modes.

3. THEME COLORS

Create CSS variables in:

styles/global.css


Use CSS variables for the entire design system.

LIGHT MODE

:root {
    --color-primary: #E85D75;
    --color-primary-hover: #D94D66;

    --color-secondary: #8B7EC8;
    --color-accent: #FFB38A;

    --color-background: #FFF9F5;
    --color-surface: #FFFFFF;
    --color-surface-soft: #FFF1F3;

    --color-text: #29252A;
    --color-text-secondary: #6F6870;

    --color-border: #E9DDE0;

    --color-success: #5BAE7A;
    --color-warning: #E7A84B;
    --color-danger: #D95368;

    --shadow-soft: 0 8px 30px rgba(50, 30, 40, 0.08);
}


DARK MODE

[data-theme="dark"] {
    --color-primary: #FF7189;
    --color-primary-hover: #FF8298;

    --color-secondary: #A99BE8;
    --color-accent: #FFB58F;

    --color-background: #17151A;
    --color-surface: #242027;
    --color-surface-soft: #2D2730;

    --color-text: #F8F3F5;
    --color-text-secondary: #BEB6BD;

    --color-border: #3A333C;

    --color-success: #70C58E;
    --color-warning: #F0B85A;
    --color-danger: #FF7189;

    --shadow-soft: 0 8px 30px rgba(0, 0, 0, 0.25);
}


Use these variables throughout the application.

DO NOT hardcode colors repeatedly inside individual components.

4. COLOR DESIGN PRINCIPLE

The primary brand color is:

Rose Pink

The secondary brand color is:

Soft Lavender

The supporting accent is:

Warm Peach

These three colors should create the identity of the Slam Book.

However:

Do NOT make the entire website pink.

Use:

Neutral backgrounds

Rose for important actions

Lavender for secondary elements

Peach for decorative highlights

The interface should remain elegant.

5. LIGHT MODE VISUAL STYLE

Light mode should feel:

Warm

Bright

Friendly

Fresh

Comfortable

Emotional

Main background:

Warm Ivory


Cards:

White


Primary buttons:

Rose


Decorative elements:

Lavender + Peach


Example:

┌────────────────────────────────────┐
│ 💖 SlamBook                         │
│                                    │
│ Your Memories.                     │
│ Your Friends. Your Story.          │
│                                    │
│ [ Create My Slam Book ]            │
│                                    │
│        📖 Memory Book              │
└────────────────────────────────────┘


6. DARK MODE VISUAL STYLE

Dark mode should NOT simply invert the light theme.

It should feel:

Cozy

Elegant

Calm

Premium

Comfortable at night

Use:

Background → Deep Charcoal
Surface → Soft Dark Purple
Primary → Soft Rose
Secondary → Lavender
Accent → Peach


Avoid pure black #000000.

Avoid extremely bright neon colors.

Example:

┌────────────────────────────────────┐
│ 💖 SlamBook                         │
│                                    │
│ Your Memories.                     │
│ Your Friends. Your Story.          │
│                                    │
│ [ Create My Slam Book ]            │
│                                    │
│        📖 Memory Book              │
└────────────────────────────────────┘


The same layout should remain familiar in both modes.

7. THEME TOGGLE UX

Create a reusable:

ThemeToggle.jsx


Example:

┌──────────────┐
│ ☀️     🌙    │
└──────────────┘


When switching:

Smooth color transition

No page reload

Preserve current page

Preserve current form data

Preserve application state

Use:

transition:
    background-color 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease;


Do NOT animate every element excessively.

8. REMEMBER USER THEME

Save the user's theme preference in:

localStorage


Example:

localStorage.setItem("theme", "dark");


When the application opens again, restore the selected theme.

If no preference exists, optionally respect the user's system preference.

9. ACCESSIBLE THEME TOGGLE

The toggle must include:

Accessible label

Keyboard support

Focus state

Tooltip

Example:

Switch to dark mode


and:

Switch to light mode


Do not rely only on icons.

10. NAVIGATION

Create a clean navigation bar.

Desktop:

💖 SlamBook

Home
My Slam Book
Friends

                         + Add Friend
                         ☀️ / 🌙
                         👤


Use the primary Rose color only for important actions.

11. BUTTON DESIGN

Create a consistent button system.

Primary

[ Create My Slam Book ]


Rose background.

Secondary

[ View Friends ]


Light surface with border.

Outline

[ Edit Memory ]


Transparent background.

Danger

[ Delete ]


Use danger color carefully.

Buttons should have:

Clear labels

Comfortable padding

Rounded corners

Hover state

Active state

Focus state

Disabled state

Avoid giant pill-shaped buttons everywhere.

12. CARD DESIGN

Cards should use:

background: var(--color-surface);
border: 1px solid var(--color-border);
box-shadow: var(--shadow-soft);


Cards should feel soft and elegant.

Use moderate border radius.

Do NOT make every element look like a floating card.

13. FRIEND CARD

Example:

┌───────────────────────────┐
│                           │
│         👤 PHOTO          │
│                           │
│       Rahul Patil         │
│         "Rahul"           │
│                           │
│  Always there for me 💖   │
│                           │
│       View Memory →       │
└───────────────────────────┘


Light:

White surface + soft shadow.

Dark:

Dark purple-gray surface + subtle shadow.

14. HOME PAGE

Hero:

Your Memories.
Your Friends.
Your Story. 💖


Subtitle:

Create your digital Slam Book
and keep your favorite memories forever.


Buttons:

[ Create My Slam Book ]
[ View My Friends ]


Visual:

A beautiful digital memory book surrounded by subtle:

Hearts

Polaroids

Small notes

Decorative shapes

Keep decoration minimal.

15. DASHBOARD

Show:

Good morning, Vaibhao! 👋

Ready to add another memory?


Stats:

👥 12 Friends

💖 28 Memories

⭐ 5 Favorites


Then:

Recent Friends


and:

Quick Actions


Do not overload the dashboard.

16. MY SLAM BOOK

Create the most visually memorable page.

Show:

📖 My Slam Book

Vaibhao Kamble
"Vaibhu"

Software Developer


Sections:

About Me

Hobbies

Favorite Things

Dreams

Memories

Use subtle scrapbook styling.

17. FRIENDS

Title:

My Friends 💖


Search:

🔍 Search your friends...


Filters:

All
Male
Female
Recent


Use responsive friend cards.

18. ADD FRIEND

Create:

Add a Friend 💌

Tell us a little about someone special.


Sections:

About Your Friend

Name

Nickname

Gender

Birthday

Friendship

How did you meet?

First impression

Best memory

Favorites

Favorite food

Favorite movie

Favorite song

Favorite hobby

A Little More

Best quality

Funny habit

Message

Use friendly placeholders and validation.

19. FRIEND DETAILS

Create an emotional but simple memory page.

← Back to Friends

Rahul Patil
"Rahul"

⭐ One of my favorite people


Sections:

💬 How We Met

✨ First Impression

📸 Best Memory

🍕 Favorite Food

🎵 Favorite Song

💖 Message


20. DUMMY DATA

Create:

src/data/dummyData.js


Include:

1 user Slam Book

8 friends

Multiple memories

Use realistic names and information.

The UI must be completely populated when the project starts.

Do NOT show empty screens during initial development.

21. API READY

Create:

src/services/api.js


Functions:

getSlamBook()
getFriends()
getFriendById(id)
createFriend(friend)
updateFriend(id, friend)
deleteFriend(id)


Initially use dummy data.

Keep the architecture ready for the existing Spring Boot REST API.

22. RESPONSIVE DESIGN

Support:

320px
375px
768px
1024px
1440px+


Desktop:

3–4 friend cards per row.

Tablet:

2 cards per row.

Mobile:

1 card per row.

Navigation must adapt beautifully.

23. ACCESSIBILITY

Ensure:

Good contrast in BOTH themes

Keyboard navigation

Focus states

Semantic HTML

Accessible forms

Accessible theme toggle

Alt text

Reduced motion

Never use color alone to communicate an error.

24. DESIGN SYSTEM

Create reusable CSS variables for:

Colors
Spacing
Typography
Border radius
Shadows
Transitions


Example:

:root {
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 40px;

    --radius-sm: 8px;
    --radius-md: 14px;
    --radius-lg: 20px;

    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
}


25. FINAL EXPERIENCE

The final application should communicate:

       SIMPLE
          +
       BEAUTIFUL
          +
       FRIENDLY
          +
       EMOTIONAL
          +
       MODERN
          +
     LIGHT / DARK
          │
          ▼
    DIGITAL SLAM BOOK


The user should immediately understand:

Where am I?

What can I do?

How do I add a friend?

How do I view a memory?

How do I change the theme?

26. FINAL RULE

Prioritize usability over decoration.

The design should be attractive enough to impress users, but simple enough that a first-time user can navigate it without instructions.

Use the same visual identity in Light and Dark modes.

The Light/Dark toggle must be visible, intuitive, accessible and persistent.

Do not make the application look like an admin panel.

Make it feel like a beautiful personal friendship application that people would genuinely enjoy using.

Build it with clean React components, JavaScript, semantic HTML/JSX and well-organized plain CSS.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e094ed26-4f76-472f-8592-988fe5b7a631).

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
