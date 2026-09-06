import type { CSSProperties } from "react";
import { profile } from "./data";

/**
 * Print-only CV — an exact replica of the resume document.
 * Hidden on screen (see #cv-print in index.css), rendered via a portal
 * to document.body so @media print rules can hide #root without hiding this.
 * window.print() → "Save as PDF".
 */
export function CvPrint() {
  return (
    <div style={page}>
      <h1 style={{ fontSize: 30, margin: 0, letterSpacing: -0.5, fontWeight: 800 }}>Mohamad Mahdi Mehralian</h1>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#0f766e", marginTop: 2 }}>
        Full-Stack Engineer / Frontend Engineer (React · Next.js)
      </div>
      <div style={{ fontSize: 10.5, color: "#64748b", marginTop: 4, fontFamily: "monospace" }}>
        {profile.email} • {profile.phone} • {profile.githubHandle} • English C1 • Open to Remote
      </div>

      <h2 style={h2}>Profile</h2>
      <p style={p}>
        Computer Engineering senior and full-stack TypeScript engineer who ships production-grade systems end to end.
        Built a <strong>real-time collaborative IDE</strong> with CRDT-based conflict-free sync, a{" "}
        <strong>queue-driven sandbox</strong> that executes untrusted code inside hardened Docker containers, and a{" "}
        <strong>monorepo e-commerce platform</strong> on Next.js, NestJS/Express, PostgreSQL and Prisma. Strong in
        distributed real-time architecture, secure API design, and container hardening.
      </p>

      <h2 style={h2}>Technical skills</h2>
      <SkillRow label="Languages" skills={["TypeScript", "JavaScript (ES6+)", "SQL", "HTML5", "CSS3"]} />
      <SkillRow label="Frontend" skills={["Next.js (App Router)", "React", "Tailwind CSS", "Monaco Editor", "State Management", "Responsive Web Design"]} />
      <SkillRow label="Backend" skills={["Node.js", "NestJS", "Express.js", "RESTful APIs", "WebSockets (Socket.io)", "JWT Auth"]} />
      <SkillRow label="Data" skills={["PostgreSQL", "Prisma ORM", "Supabase", "Redis (Pub/Sub)"]} />
      <SkillRow label="Systems" skills={["Docker", "Container Hardening", "BullMQ", "Yjs (CRDTs)", "Git", "GitHub", "Vercel"]} />

      <h2 style={h2}>Featured projects</h2>
      <Project
        name="DevPair"
        subtitle="Real-Time Collaborative IDE & Execution Sandbox"
        repo="mohamadmahdiMN/DevPair"
        stack="Next.js · NestJS · TypeScript · Yjs (CRDTs) · Socket.io · BullMQ · Redis · Docker · PostgreSQL · Prisma"
        points={[
          ["Architected", "a real-time collaborative code editor using Yjs CRDTs over WebSockets, enabling concurrent multi-user typing with conflict-free state convergence and zero central locking."],
          ["Engineered", "an asynchronous execution pipeline on BullMQ and Redis that runs untrusted user code inside isolated Docker containers hardened with a disabled network namespace, enforced memory/CPU ceilings, and a 5-second execution timeout."],
          ["Configured", "a Redis Pub/Sub adapter for NestJS WebSocket gateways, allowing real-time socket sessions to scale horizontally across multiple stateless server instances."],
        ]}
      />
      <Project
        name="Modern Marketplace"
        subtitle="Monorepo E-Commerce Platform"
        repo="mohamadmahdiMN/marketplace"
        stack="Next.js · Express.js · TypeScript · Prisma ORM · PostgreSQL · Tailwind CSS · JWT"
        points={[
          ["Designed", "and deployed a full-stack e-commerce monorepo cleanly separating Next.js frontend services from a modular Express REST API backend."],
          ["Implemented", "secure JWT authentication with bcrypt password hashing, dynamic category mapping, and multipart file upload handlers for listing media."],
          ["Leveraged", "Prisma ORM for type-safe relational querying and authored idempotent seeding scripts to provision reproducible test listings and user schemas."],
        ]}
      />
      <Project
        name="Accountability AI"
        subtitle="Automated Progress-Tracking SaaS"
        repo="mohamadmahdiMN/accountability-ai"
        stack="Next.js (App Router) · Supabase · TypeScript · Resend API · Vercel Cron"
        points={[
          ["Developed", "an automated email accountability SaaS on the Next.js App Router, with Supabase handling authentication and relational data persistence."],
          ["Integrated", "serverless CRON jobs with the Resend API to dispatch scheduled daily progress triggers and personalized user goal reports."],
        ]}
      />
      <Project
        name="Assembly Endgame"
        subtitle="Interactive Game Application"
        repo="mohamadmahdiMN/assembly-endgame"
        stack="React · TypeScript · Tailwind CSS"
        points={[
          ["Built", "an interactive word-guessing game using modern React state management, custom hooks for conditional rendering logic, and a fully responsive UI."],
        ]}
      />

      <h2 style={h2}>Education</h2>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <strong style={{ fontSize: 14 }}>B.S. in Computer Engineering</strong>
        <span style={{ fontFamily: "monospace", fontSize: 11, color: "#64748b" }}>Expected 2026</span>
      </div>
      <div style={{ color: "#64748b", fontSize: 11.5 }}>
        Islamic Azad University, Najafabad Branch · Focus: distributed systems, data structures &amp; algorithms,
        database design, software architecture
      </div>
      <div style={{ color: "#64748b", fontSize: 11.5 }}>Languages: English (C1 Advanced) · Persian (Native)</div>
    </div>
  );
}

function SkillRow({ label, skills }: { label: string; skills: string[] }) {
  return (
    <div style={{ display: "flex", gap: 8, margin: "4px 0", alignItems: "baseline" }}>
      <span style={{ width: 92, flexShrink: 0, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", color: "#94a3b8", textTransform: "uppercase" }}>
        {label}
      </span>
      <span style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {skills.map((s) => (
          <span key={s} style={{ border: "1px solid #e2e8f0", background: "#f8fafc", borderRadius: 5, padding: "1px 7px", fontSize: 11 }}>
            {s}
          </span>
        ))}
      </span>
    </div>
  );
}

function Project({ name, subtitle, repo, stack, points }: { name: string; subtitle: string; repo: string; stack: string; points: [string, string][] }) {
  return (
    <div style={{ margin: "8px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
        <div style={{ fontSize: 14 }}>
          <strong>{name}</strong> <span style={{ color: "#475569" }}>— {subtitle}</span>
        </div>
        <span style={{ fontFamily: "monospace", fontSize: 10, color: "#0f766e", whiteSpace: "nowrap" }}>{repo}</span>
      </div>
      <div style={{ fontSize: 11, color: "#94a3b8", margin: "1px 0 3px" }}>{stack}</div>
      <ul style={{ margin: "2px 0 2px 18px", padding: 0 }}>
        {points.map(([lead, rest], i) => (
          <li key={i} style={{ marginBottom: 2 }}>
            <strong>{lead}</strong> {rest}
          </li>
        ))}
      </ul>
    </div>
  );
}

const page: CSSProperties = {
  fontFamily: "Inter, Arial, sans-serif",
  color: "#0f172a",
  background: "#fff",
  padding: "8px 4px",
  maxWidth: 780,
  margin: "0 auto",
  fontSize: 12,
  lineHeight: 1.55,
};

const h2: CSSProperties = {
  fontSize: 12,
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: "0.22em",
  color: "#0f766e",
  borderBottom: "1px solid #e2e8f0",
  paddingBottom: 3,
  margin: "14px 0 6px",
};

const p: CSSProperties = { margin: "4px 0" };
