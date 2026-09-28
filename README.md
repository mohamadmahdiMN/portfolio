# ⚡ Mohamad Mahdi Mehralian — Portfolio

> Personal portfolio of a **Full-Stack Engineer** (React · Next.js · TypeScript).
> Dark, Awwwards-style bento layout with buttery motion — designed to impress CTOs.

![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

**Live demo:** _(deploy to Vercel and paste the URL here)_

## ✨ Highlights

- **Cinematic preloader** — 0–100% compile counter with blur-out exit
- **Interactive terminal hero** — auto-rotating project showcase with prev/next + dots, live typing effect
- **Bento grid** — about, education, stats, and 6 animated skill groups (Frontend, Languages, Backend, Data & Systems, WordPress, AI Workflow)
- **Case-study modals** — 13 real projects (Bazargah marketplace, Aegis AI incident-response, DevPair CRDT IDE, Marketplace monorepo, Gatherly, LaunchGate, Kube Engine, Accountability AI SaaS, games, WordPress on Pantheon)
- **Custom cursor** — spring-trailing glow ring that morphs into a `VIEW` badge over projects (desktop only)
- **Working contact form** — Formspree delivery when configured, mail-app fallback otherwise — a message is never lost
- **Download CV** — one-page resume PDF with clickable links, served from `public/`

## 🛠️ Stack

| Layer | Choice |
|---|---|
| Build | Vite 8 + React 18 + TypeScript (strict) |
| Styling | Tailwind CSS v4, custom theme + keyframes |
| Motion | Framer Motion, Lenis smooth scroll |
| Icons | Lucide (brand icons as inline SVG) |
| Backend | None — fully static, deploys anywhere |

## 🚀 Run it

```bash
npm install
npm run dev      # local dev
npm run build    # type-check + production build → dist/
npm run preview  # serve the production build locally
```

## ✉️ Contact form (optional, 2 min)

Works out of the box via the visitor's mail app. For direct-to-inbox delivery:

1. Create a free form at https://formspree.io/forms
2. Copy `.env.example` to `.env` and set `VITE_FORMSPREE_FORM_ID`
3. Restart `npm run dev`

## 📄 Download CV

The CV buttons download `public/Mohamad-Mahdi-Mehralian-CV.pdf` directly —
a one-page replica of the resume with clickable links (portfolio link first).
Regenerate it from the script after editing the content (needs `pip install fpdf2`).

## 📁 Structure

```
src/
  App.tsx    # sections: hero/terminal, about, skills, work + modal, journey, contact
  data.ts    # ALL content (profile, skills, projects, timeline) — edit here
  index.css  # Tailwind v4 theme, keyframes, spotlight, reduced-motion
public/
  Mohamad-Mahdi-Mehralian-CV.pdf  # downloadable resume (portfolio link first)
```

## ⚡ Performance

- `content-visibility` on below-fold sections · rAF-throttled spotlight · memoized marquee
- Vendor/motion code-split chunks (app JS ≈ 21 KB gzip) · `prefers-reduced-motion` support
- Zero images, system-feel fonts with `display=swap`

## 📬 Contact

- Email: mehralianmohamadmahdi82@gmail.com
- GitHub: https://github.com/mohamadmahdiMN
- WordPress demo: https://dev-mohamadmahdi-portfolio.pantheonsite.io/
