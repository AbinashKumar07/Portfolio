# Abinash Kumar — Portfolio & Resume Website

Official portfolio website of **Abinash Kumar** — Content Strategist, Narrative Architect, and Published Author of *"Human Psychology & Behaviour"*.

---

## 🌟 Highlights & Features

- **Responsive Design**: Clean, modern glassmorphic interface with fluid responsive layouts for mobile, tablet, and desktop.
- **Theme Converter (Dark / Light Switch)**: Interactive sun ➔ half moon toggle switch with persistent theme state in `localStorage`.
- **Interactive Portfolio Grid**: Direct redirection links for 8 live web portals:
  - [OrganizeTrip](https://www.organizetrip.com/)
  - [FeedFashion](https://feedfashion.com/)
  - [TheVougeClub](https://thevougeclub.com/)
  - [Europefeeds](https://europefeeds.com/)
  - [2MinuteRead](https://2minuteread.com/)
  - [FlauntChic](https://flauntchic.com/)
  - [DressGlamour](https://dressglamour.com/)
  - [BlogsBuddy](https://blogsbuddy.com/)
- **Published Book Spotlight**: Expandable interactive accordion for *"Human Psychology & Behaviour"* with Linktree integration.
- **Verified Credentials & Lightbox**: Interactive preview modals for FEA & UnlockDiscounts certificates.
- **Dedicated Resume Page (`resume.html`)**: Complete curriculum vitae with experience timeline, education, skills, and 1-click print/PDF styling.
- **Direct Contact & Copy-to-Clipboard**: Quick email copy button with toast feedback for `abinash.kumar231113@gmail.com`.

---

## 🚀 Quick Start (Local Setup)

No build tools or heavy dependencies required. Simply open `index.html` in any modern browser, or run a lightweight local server:

```bash
# Using Python
python -m http.server 8080

# Using Node.js (npx serve)
npx serve .
```

Open your browser at `http://localhost:8080`.

---

## 🌐 Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g. `portfolio-website` or `<your-username>.github.io`).
2. Push this codebase:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Abinash Kumar Portfolio & Resume Website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. Go to **Settings ➔ Pages** in your GitHub repository, set the source to the `main` branch (root `/`), and click **Save**.
4. Your website will be live at `https://<your-username>.github.io/<repo-name>/`!

---

## 📁 File Structure

```text
├── index.html              # Main landing page & portfolio
├── resume.html             # Dedicated interactive resume page
├── css/
│   └── styles.css          # Master stylesheet with theme variables & responsive rules
├── js/
│   └── main.js             # Theme switcher, modals, filters, and interactivity
└── assets/
    ├── profile.png         # Portrait photo
    ├── book_cover.png      # Cover of "Human Psychology & Behaviour"
    └── certificates/       # High-res verified credential images
```

---

© 2026 Abinash Kumar. All rights reserved.
