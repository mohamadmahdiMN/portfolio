export const profile = {
  name: "Mohamad Mahdi Mehralian",
  short: "Mahdi Mehralian",
  initials: "MM",
  role: "Full-Stack Engineer / Frontend Engineer",
  stack: "React · Next.js · TypeScript",
  tagline: "I ship production-grade real-time systems end to end — collaborative IDEs, hardened execution sandboxes, full-stack commerce, and WordPress sites. AI-native workflow: I vibe-code with Copilot, Cursor, ChatGPT & Claude without losing engineering rigor.",
  email: "mehralianmohamadmahdi82@gmail.com",
  phone: "+98 992 451 1728",
  github: "https://github.com/mohamadmahdiMN",
  githubHandle: "github.com/mohamadmahdiMN",
  wordpressDemo: "https://dev-mohamadmahdi-portfolio.pantheonsite.io/",
  location: "Based in Iran",
  languages: "English C1 · Persian Native",
  education: "B.S. Computer Engineering — Islamic Azad University, Najafabad · Expected 2026",
  focus: "distributed systems · data structures & algorithms · database design · software architecture",
};

export const techMarquee = [
  "TypeScript", "React", "Next.js App Router", "Vite", "Tailwind CSS", "Framer Motion", "Lenis",
  "Node.js", "NestJS", "Socket.io", "Yjs CRDTs", "BullMQ", "Redis Pub/Sub",
  "PostgreSQL", "Prisma", "Docker Hardening", "Supabase", "Vercel",
  "WordPress", "AI Workflow", "Vibe Coding",
];

export const skillGroups = [
  {
    title: "Frontend",
    icon: "monitor",
    level: 95,
    skills: ["Next.js (App Router)", "React", "Vite", "Tailwind CSS", "Framer Motion", "Lenis Smooth Scroll", "Monaco Editor", "State Management", "Responsive Web Design"],
  },
  {
    title: "Languages",
    icon: "code",
    level: 93,
    skills: ["TypeScript", "JavaScript (ES6+)", "SQL", "HTML5", "CSS3"],
  },
  {
    title: "Backend & Realtime",
    icon: "server",
    level: 90,
    skills: ["Node.js", "NestJS", "Express.js", "RESTful APIs", "Socket.io", "JWT Auth"],
  },
  {
    title: "Data & Systems",
    icon: "database",
    level: 88,
    skills: ["PostgreSQL", "Prisma ORM", "Supabase", "Redis (Pub/Sub)", "Docker", "BullMQ", "Yjs (CRDTs)", "Git / GitHub / Vercel"],
  },
  {
    title: "WordPress & CMS",
    icon: "globe",
    level: 84,
    skills: ["WordPress", "Custom Themes", "Gutenberg / Elementor", "Pantheon Hosting", "SEO Basics", "Performance Tuning"],
  },
  {
    title: "AI Workflow",
    icon: "sparkles",
    level: 92,
    skills: ["ChatGPT", "Claude", "GitHub Copilot", "Cursor", "Vibe Coding", "Prompt Engineering", "AI-Assisted Debugging"],
  },
];

export type Project = {
  id: string;
  name: string;
  subtitle: string;
  repo: string;
  live?: string;
  stack: string[];
  points: string[];
  accent: string;
  metric: string;
  metricLabel: string;
};

export const projects: Project[] = [
  {
    id: "devpair",
    name: "DevPair",
    subtitle: "Real-Time Collaborative IDE & Execution Sandbox",
    repo: "mohamadmahdiMN/DevPair",
    stack: ["Next.js", "NestJS", "TypeScript", "Yjs CRDTs", "Socket.io", "BullMQ", "Redis", "Docker", "PostgreSQL", "Prisma"],
    points: [
      "Real-time collaborative editor with Yjs CRDTs over WebSockets — concurrent multi-user typing with conflict-free convergence, zero central locking.",
      "Async execution pipeline on BullMQ + Redis running untrusted code in isolated Docker containers: no-network namespace, memory/CPU ceilings, 5s timeout.",
      "Redis Pub/Sub adapter for NestJS gateways — horizontal scaling across stateless socket servers.",
    ],
    accent: "#22d3ee",
    metric: "CRDT",
    metricLabel: "conflict-free sync",
  },
  {
    id: "marketplace",
    name: "Modern Marketplace",
    subtitle: "Monorepo E-Commerce Platform",
    repo: "mohamadmahdiMN/marketplace",
    stack: ["Next.js", "Express.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind", "JWT"],
    points: [
      "Full-stack monorepo cleanly separating Next.js frontend from modular Express REST API.",
      "Secure JWT + bcrypt auth, dynamic category mapping, multipart upload handlers for listing media.",
      "Prisma type-safe queries + idempotent seeding scripts for reproducible test data.",
    ],
    accent: "#a78bfa",
    metric: "100%",
    metricLabel: "type-safe queries",
  },
  {
    id: "accountability",
    name: "Accountability AI",
    subtitle: "Automated Progress-Tracking SaaS",
    repo: "mohamadmahdiMN/accountability-ai",
    stack: ["Next.js App Router", "Supabase", "TypeScript", "Resend API", "Vercel Cron"],
    points: [
      "Email accountability SaaS on App Router — Supabase auth + relational persistence.",
      "Serverless CRON + Resend API for scheduled daily triggers and personalized goal reports.",
    ],
    accent: "#a3e635",
    metric: "24/7",
    metricLabel: "automated nudges",
  },
  {
    id: "endgame",
    name: "Assembly Endgame",
    subtitle: "Interactive Game Application",
    repo: "mohamadmahdiMN/assembly-endgame-guess-the-word-",
    stack: ["React", "JavaScript", "Tailwind CSS"],
    points: [
      "Word-guessing game with modern React state, custom hooks for conditional rendering, fully responsive UI.",
    ],
    accent: "#fb7185",
    metric: "60fps",
    metricLabel: "playful UI",
  },
  {
    id: "omnifood",
    name: "Omnifood",
    subtitle: "HTML / CSS / JS Landing Project",
    repo: "mohamadmahdiMN/omnifood-html-css-js-",
    stack: ["HTML5", "CSS3", "JavaScript"],
    points: [
      "Pixel-focused marketing site built with vanilla HTML, CSS and JS — responsive layout, smooth interactions.",
    ],
    accent: "#fbbf24",
    metric: "100%",
    metricLabel: "hand-written CSS",
  },
  {
    id: "resolvedesk",
    name: "ResolveDesk",
    subtitle: "TypeScript Support-Desk App",
    repo: "mohamadmahdiMN/resolvedesk",
    stack: ["TypeScript", "React", "Tailwind CSS"],
    points: [
      "Ticketing / help-desk style app in TypeScript — see repository for current implementation and roadmap.",
    ],
    accent: "#34d399",
    metric: "TS",
    metricLabel: "strongly typed",
  },
  {
    id: "wordpress-portfolio",
    name: "WordPress Portfolio",
    subtitle: "Custom WordPress Site on Pantheon",
    repo: "mohamadmahdiMN",
    live: "https://dev-mohamadmahdi-portfolio.pantheonsite.io/",
    stack: ["WordPress", "Pantheon", "Custom Theme", "SEO", "Responsive"],
    points: [
      "Designed and built a personal portfolio site in WordPress, hosted on Pantheon sandbox with custom theming.",
      "Live demo linked below — view-source friendly, performance-tuned, fully responsive.",
    ],
    accent: "#60a5fa",
    metric: "WP",
    metricLabel: "live on Pantheon",
  },
];

export const timeline = [
  {
    year: "2026 — Expected",
    title: "B.S. Computer Engineering",
    org: "Islamic Azad University, Najafabad",
    desc: "Focus: distributed systems, data structures & algorithms, database design, software architecture.",
  },
  {
    year: "2024 — 2025",
    title: "DevPair — Collaborative IDE + Sandbox",
    org: "Independent · System Design & Full-Stack Build",
    desc: "CRDT sync, queue-driven Docker execution, horizontally scalable sockets.",
  },
  {
    year: "2024",
    title: "Marketplace + Accountability AI + WordPress",
    org: "Independent · Next.js Full-Stack SaaS + CMS",
    desc: "Monorepo commerce with JWT + Prisma. SaaS with Supabase + Cron + Resend. WordPress portfolio on Pantheon.",
  },
  {
    year: "Now",
    title: "Open to Full-Stack Roles",
    org: "React · Next.js · TypeScript · WordPress · AI-native",
    desc: "Comfortable with all major AIs and vibe-coding — Copilot, Cursor, ChatGPT, Claude — with production discipline.",
  },
];
