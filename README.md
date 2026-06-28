# 🎬 Streamify — Netflix-Inspired Streaming Platform

> 🍿 A cinematic, fully responsive streaming web app built from scratch with pure HTML, CSS & JavaScript — no frameworks, no libraries, just clean code!

![Streamify Banner](img/Bckimgg.jpg)

---

## 🌟 Live Demo

🔗 [View Live Site](https://aditiyadavz.github.io/streamify/)

---

## ✨ Features

- 🎥 **Cinematic Landing Page** — Full-screen hero with animated background & smooth scroll
- 🔥 **Trending Now Section** — Horizontal scrollable content rows with hover effects
- 🔐 **User Authentication** — Login & Signup with localStorage (no backend needed!)
- 🎭 **Personalized Dashboard** — Netflix-style content rows after login
- 📱 **Fully Responsive** — Works beautifully on mobile, tablet & desktop
- ❓ **FAQ Accordion** — Smooth animated expand/collapse
- 🌐 **Language Selector** — English & Hindi support
- 🎨 **Stunning UI** — Dark cinematic theme with red accent & glassmorphism effects

---

## 📸 Screenshots

| Landing Page                | Dashboard                    |
| --------------------------- | ---------------------------- |
| ![Landing](img/Bckimgg.jpg) | ![Dashboard](img/banner.jpg) |

---

## 🛠️ Tech Stack

| Technology                                                                                               | Usage                      |
| -------------------------------------------------------------------------------------------------------- | -------------------------- |
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)                | Structure & Layout         |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)                   | Styling & Animations       |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | Interactivity & Auth Logic |

---

## 📁 Project Structure

```
streamify/
│
├── 📄 index.html          # Landing page
├── 📄 login.html          # Login page
├── 📄 signUp.html         # Sign up page
├── 📄 dashboard.html      # Main dashboard (after login)
├── 🎨 style.css           # All styles & animations
├── ⚡ script.js           # FAQ accordion & navbar logic
│
└── 📁 img/                # All images
    ├── 🖼️ Bckimgg.jpg     # Hero background
    ├── 🖼️ banner.jpg      # Dashboard banner
    ├── 🖼️ squid.jpg       # Squid Game
    ├── 🖼️ friends.jpg     # Friends
    ├── 🖼️ demon.jpg       # Demon Slayer
    └── 📁 YourNextWatch/  # Dashboard content images
```

---

## 🚀 Getting Started

### Option 1 — Open Locally

```bash
# 1. Clone the repo
git clone https://github.com/aditiyadavz/streamify.git

# 2. Open in browser
cd streamify
open index.html
```

### Option 2 — View Live

Just visit 👉 [aditiyadavz.github.io/streamify](https://aditiyadavz.github.io/streamify/)

---

## 🔐 How Auth Works

> No backend needed! Auth is handled entirely with `localStorage` 🧠

```
Sign Up  →  saves { name, email, password } to localStorage
Log In   →  checks credentials against localStorage
Dashboard →  reads currentUser from localStorage
Log Out  →  clears currentUser, redirects to index
```

---

## 📱 Pages Overview

| Page             | Description                                         |
| ---------------- | --------------------------------------------------- |
| `index.html`     | 🏠 Landing page with hero, trending, features & FAQ |
| `login.html`     | 🔐 Login form with localStorage validation          |
| `signUp.html`    | 📝 Sign up form with password confirmation          |
| `dashboard.html` | 🎬 Netflix-style content dashboard post-login       |

---

## 🎨 Design Highlights

- 🖤 **Dark cinematic theme** with `#0a0a0a` background
- 🔴 **Signature red accent** `#e50914` (Netflix-inspired)
- ✨ **Glassmorphism** on auth cards with `backdrop-filter: blur`
- 🎞️ **Smooth animations** — hero zoom, card hover scale, FAQ accordion
- 📐 **CSS Custom Properties** for consistent design tokens
- 🖱️ **Card hover effects** — scale up + reveal title & tag on hover

---

## 🌐 Deployment

Deployed on **GitHub Pages** 🚀

To deploy your own copy:

1. Fork this repo
2. Go to **Settings → Pages**
3. Set branch to `main` → Save
4. Live at `https://yourusername.github.io/streamify/`

---

## 🙋‍♀️ Author

**Aditi Yadav**

[![GitHub](https://img.shields.io/badge/GitHub-aditiyadavz-181717?style=flat&logo=github)](https://github.com/aditiyadavz)

---

## ⭐ Show Some Love

If you liked this project, please give it a **⭐ star** on GitHub — it means a lot! 🙏

---

> 🎬 _"Streamify — Because every story deserves a screen."_ 🍿
