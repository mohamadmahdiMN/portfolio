import { useEffect, useMemo, useRef, useState, type ReactNode, type MouseEvent as RMEvent, type FormEvent } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useInView, useMotionValue } from "framer-motion";
import Lenis from "lenis";
import {
  Mail, Phone, MapPin, ArrowUpRight, ArrowRight, Zap,
  Code2, Monitor, Server, Database, Copy, Check, Menu, X,
  Sparkles, Terminal, GraduationCap, Languages as LangIcon, Globe, ChevronUp, ChevronLeft, ChevronRight, ExternalLink, Download,
} from "lucide-react";
import { profile, techMarquee, skillGroups, projects, timeline } from "./data";

function GithubIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12v3.15c0 .3.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

/* ---------- helpers ---------- */
const TYPED_WORDS = ["Full-Stack Engineer", "React & Next.js Specialist", "Realtime Systems Builder", "WordPress Developer", "AI-Native Vibe Coder"];

function useTyping(words: string[], speed = 70, pause = 1400) {
  const [text, setText] = useState("");
  const [wi, setWi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[wi % words.length];
    let t: number;
    if (!del && text.length < word.length) {
      t = window.setTimeout(() => setText(word.slice(0, text.length + 1)), speed);
    } else if (!del && text.length === word.length) {
      t = window.setTimeout(() => setDel(true), pause);
    } else if (del && text.length > 0) {
      t = window.setTimeout(() => setText(word.slice(0, text.length - 1)), 35);
    } else if (del && text.length === 0) {
      setDel(false); setWi((v) => v + 1);
    }
    return () => clearTimeout(t);
  }, [text, del, wi, words, speed, pause]);
  return text;
}

function Counter({ to, suffix = "", duration = 1.6 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0; const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function Reveal({ children, delay = 0, y = 28, className = "" }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

let spotTick = false;
function spotlight(e: RMEvent<HTMLElement>) {
  if (spotTick) return;
  spotTick = true;
  const el = e.currentTarget as HTMLElement;
  const x = e.clientX; const y = e.clientY;
  requestAnimationFrame(() => {
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${x - r.left}px`);
    el.style.setProperty("--my", `${y - r.top}px`);
    spotTick = false;
  });
}

function SectionHead({ kicker, title, desc }: { kicker: string; title: string; desc?: string }) {
  return (
    <div className="max-w-3xl">
      <Reveal>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono2 uppercase tracking-[0.2em] text-cyan-300">
          <Sparkles size={12} /> {kicker}
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display mt-4 text-3xl sm:text-5xl font-bold leading-[1.05] tracking-tight">{title}</h2>
      </Reveal>
      {desc && <Reveal delay={0.15}><p className="mt-4 text-slate-400 leading-relaxed">{desc}</p></Reveal>}
    </div>
  );
}

/* ---------- cool custom cursor (desktop only, GPU-friendly) ---------- */
function CoolCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [viewing, setViewing] = useState(false);
  const [pressed, setPressed] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t || !("closest" in t)) return;
      setViewing(!!t.closest('[data-cursor="view"]'));
      setHovering(!!t.closest("a,button,input,textarea,select,[data-cursor]"));
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      {/* trailing glow ring */}
      <motion.div aria-hidden
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[95] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ scale: viewing ? 2.1 : hovering ? 1.5 : 1, opacity: viewing ? 0.95 : 0.7 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="grid place-items-center rounded-full border"
          style={{
            width: 40, height: 40,
            borderColor: viewing ? "rgba(34,211,238,0.9)" : "rgba(255,255,255,0.35)",
            background: viewing ? "rgba(34,211,238,0.12)" : "rgba(255,255,255,0.04)",
            boxShadow: viewing ? "0 0 32px rgba(34,211,238,0.45)" : "none",
          }}>
          {viewing && <span className="font-mono2 text-[8px] font-bold tracking-widest text-cyan-200">VIEW</span>}
        </motion.div>
      </motion.div>
      {/* instant dot */}
      <motion.div aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[95] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ scale: pressed ? 0.6 : hovering ? 0.7 : 1 }}
          className="rounded-full bg-cyan-300"
          style={{ width: 7, height: 7, boxShadow: "0 0 12px rgba(34,211,238,0.9)" }}
        />
      </motion.div>
    </>
  );
}

/* ---------- app ---------- */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [termIdx, setTermIdx] = useState(0);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sentVia, setSentVia] = useState<"form" | "email" | null>(null);
  const formspreeId = (import.meta.env as unknown as Record<string, string | undefined>).VITE_FORMSPREE_FORM_ID;
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const typed = useTyping(TYPED_WORDS);
  const marqueeItems = useMemo(() => [...techMarquee, ...techMarquee], []);
  const termProject = projects[termIdx % projects.length];

  // Auto-rotate terminal project showcase (paused when tab hidden)
  useEffect(() => {
    if (loading) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setTermIdx((v) => (v + 1) % projects.length);
    }, 4500);
    return () => clearInterval(id);
  }, [loading]);

  // Lenis smooth scroll — tuned for perf (lerp + raf cleanup)
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  // Escape closes modal / mobile menu; lock background scroll while modal is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setActiveProject(null); setMenuOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeProject ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeProject]);

  // Preloader counter
  useEffect(() => {
    let v = 0;
    const id = window.setInterval(() => {
      v += Math.floor(Math.random() * 14) + 4;
      if (v >= 100) { v = 100; clearInterval(id); setTimeout(() => setLoading(false), 450); }
      setProgress(v);
    }, 110);
    return () => clearInterval(id);
  }, []);

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(profile.email); } catch { /* noop */ }
    setCopied(true); setTimeout(() => setCopied(false), 1600);
  };

  const go = (id: string) => {
    setMenuOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Real submit: Formspree when VITE_FORMSPREE_FORM_ID is set,
  // otherwise opens the visitor's mail app with everything pre-filled (nothing is lost).
  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    setSendError(null);
    if (!formspreeId) {
      const subject = encodeURIComponent(`Portfolio inquiry from ${formName}`);
      const body = encodeURIComponent(`${formMsg}\n\n— ${formName} (${formEmail})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setSentVia("email");
      setSent(true);
      return;
    }
    setSending(true);
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: formName, email: formEmail, message: formMsg }),
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      setSentVia("form");
      setSent(true);
    } catch {
      setSendError("Couldn't reach the form service — your message is preserved. Email me directly instead.");
    } finally {
      setSending(false);
    }
  };

  const iconFor = (k: string) => {
    if (k === "monitor") return <Monitor size={18} />;
    if (k === "code") return <Code2 size={18} />;
    if (k === "server") return <Server size={18} />;
    if (k === "globe") return <Globe size={18} />;
    if (k === "sparkles") return <Sparkles size={18} />;
    return <Database size={18} />;
  };

  return (
    <div className="min-h-screen bg-[#06070b] text-slate-100 selection:bg-cyan-400">
      <CoolCursor />
      {/* scroll progress */}
      <motion.div style={{ scaleX: bar }} className="fixed top-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-cyan-400 via-violet-400 to-lime-300 z-[80]" />

      {/* ---------- PRELOADER ---------- */}
      <AnimatePresence>
        {loading && (
          <motion.div exit={{ opacity: 0, filter: "blur(8px)" }} transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#06070b]">
            <div className="font-mono2 text-xs tracking-[0.35em] text-cyan-300 uppercase">Compiling portfolio</div>
            <div className="font-display mt-3 text-7xl sm:text-8xl font-bold tabular-nums">{progress}<span className="text-2xl text-slate-500">%</span></div>
            <div className="mt-6 h-[3px] w-64 overflow-hidden rounded-full bg-white/10">
              <div className="h-full bg-gradient-to-r from-cyan-400 to-violet-400 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-4 font-mono2 text-[11px] text-slate-500">react · tailwind · framer-motion · lenis</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- NAV ---------- */}
      <header className="fixed top-0 inset-x-0 z-[70]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mt-3 flex items-center justify-between rounded-2xl border border-white/10 bg-[#0c0e14]/80 px-4 py-3 backdrop-blur-xl shadow-2xl">
            <button onClick={() => go("#top")} className="flex items-center gap-3 group">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 font-display font-bold text-black">{profile.initials}</span>
              <span className="text-left leading-tight">
                <span className="block font-display font-bold text-sm">{profile.short}</span>
                <span className="block font-mono2 text-[10px] text-emerald-300"><span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" />open to work</span>
              </span>
            </button>
            <nav className="hidden md:flex items-center gap-1 text-sm text-slate-300">
              {[["#about", "About"], ["#skills", "Skills"], ["#work", "Work"], ["#journey", "Journey"], ["#contact", "Contact"]].map(([href, label]) => (
                <button key={href} onClick={() => go(href)} className="rounded-lg px-3 py-2 hover:bg-white/10 hover:text-white transition">{label}</button>
              ))}
              <a href={profile.github} target="_blank" rel="noreferrer" className="ml-2 inline-flex items-center gap-2 rounded-xl bg-white text-black px-4 py-2 font-semibold hover:bg-cyan-300 transition">
                <GithubIcon size={16} /> Hire me <ArrowUpRight size={15} />
              </a>
            </nav>
            <button className="md:hidden rounded-lg border border-white/10 p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
          <AnimatePresence>
            {menuOpen && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                className="md:hidden mt-2 rounded-2xl border border-white/10 bg-[#0c0e14]/95 backdrop-blur-xl p-2">
                {[["#about", "About"], ["#skills", "Skills"], ["#work", "Work"], ["#journey", "Journey"], ["#contact", "Contact"]].map(([href, label]) => (
                  <button key={href} onClick={() => go(href)} className="block w-full text-left rounded-xl px-4 py-3 hover:bg-white/10">{label}</button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ---------- HERO ---------- */}
      <section id="top" className="relative overflow-hidden pt-32 sm:pt-40 pb-10">
        <div className="absolute inset-0 grid-bg" />
        <div className="glow-orb absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-cyan-500/40" />
        <div className="glow-orb absolute top-10 -right-32 h-[520px] w-[520px] rounded-full bg-violet-600/40" />
        <div className="glow-orb absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full bg-lime-400/20" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
            <div>
              <Reveal>
                <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
                  <span className="rounded-full bg-emerald-400/15 border border-emerald-300/30 text-emerald-300 px-2 py-0.5 font-mono2 text-[11px]">● OPEN TO WORK</span>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="font-display mt-6 text-[2.7rem] leading-[0.95] sm:text-7xl font-bold tracking-tight">
                  {profile.name.split(" ").slice(0, 2).join(" ")}<br />
                  <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-lime-200 bg-clip-text text-transparent">{profile.name.split(" ").slice(2).join(" ")}</span>
                </h1>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-4 font-mono2 text-cyan-300 text-lg sm:text-xl h-8">
                  <span className="text-slate-500">&gt;_</span> {typed}<span className="terminal-blink">▍</span>
                </div>
                <p className="mt-3 max-w-xl text-slate-400 leading-relaxed">{profile.tagline}</p>
              </Reveal>
              <Reveal delay={0.22}>
                <div className="mt-7 flex flex-wrap gap-3">
                  <button onClick={() => go("#work")} className="group inline-flex items-center gap-2 rounded-2xl bg-white text-black px-6 py-3.5 font-bold hover:bg-cyan-300 transition-all hover:-translate-y-0.5 shadow-[0_0_40px_rgba(34,211,238,0.35)]">
                    View my work <ArrowRight size={17} className="group-hover:translate-x-1 transition" />
                  </button>
                  <button onClick={copyEmail} className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold hover:bg-white/10 transition-all hover:-translate-y-0.5">
                    {copied ? <Check size={17} className="text-emerald-300" /> : <Copy size={17} />} {copied ? "Email copied!" : "Copy email"}
                  </button>
                  <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold hover:bg-white/10 transition">
                    <GithubIcon size={17} /> GitHub
                  </a>
                  <a href="/Mohamad-Mahdi-Mehralian-CV.pdf" download="Mohamad-Mahdi-Mehralian-CV.pdf" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold hover:bg-white/10 transition-all hover:-translate-y-0.5">
                    <Download size={17} /> Download CV
                  </a>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-9 grid grid-cols-3 max-w-md gap-4">
                  {[{ v: 7, s: "", l: "live projects" }, { v: 20, s: "+", l: "core technologies" }, { v: 100, s: "%", l: "typescript mindset" }].map((s, i) => (
                    <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="font-display text-2xl sm:text-3xl font-bold"><Counter to={s.v} suffix={s.s} /></div>
                      <div className="text-xs text-slate-500 mt-1">{s.l}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* terminal card */}
            <Reveal delay={0.2} y={40}>
              <div className="relative">
                <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-cyan-500/30 via-violet-500/20 to-lime-300/20 blur-2xl" />
                <div onMouseMove={spotlight} className="spotlight-card glass relative rounded-3xl overflow-hidden">
                  <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3.5 bg-black/30">
                    <span className="h-3 w-3 rounded-full bg-rose-400" /><span className="h-3 w-3 rounded-full bg-amber-300" /><span className="h-3 w-3 rounded-full bg-emerald-400" />
                    <span className="ml-3 font-mono2 text-xs text-slate-400 flex items-center gap-2"><Terminal size={13} /> mahdi@dev — zsh</span>
                  </div>
                  <div className="p-5 font-mono2 text-[13px] leading-7">
                    <div><span className="text-emerald-300">$</span> <span className="text-slate-300">whoami --hireable</span></div>
                    <div className="text-slate-400">→ <span className="text-white font-semibold">“{profile.role}”</span></div>
                    <div className="text-slate-500">→ stack: <span className="text-cyan-300">{profile.stack} · WordPress · AI workflow</span></div>
                    {/* swappable project showcase */}
                    <div className="mt-3 rounded-xl bg-black/50 border border-white/10 p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-[11px] uppercase tracking-widest text-slate-500">featured build — {termIdx + 1}/{projects.length}</div>
                        <div className="flex gap-1.5">
                          <button aria-label="previous project" onClick={() => setTermIdx((v) => (v - 1 + projects.length) % projects.length)} className="rounded-md border border-white/10 p-1 hover:bg-white/10 transition"><ChevronLeft size={13} /></button>
                          <button aria-label="next project" onClick={() => setTermIdx((v) => (v + 1) % projects.length)} className="rounded-md border border-white/10 p-1 hover:bg-white/10 transition"><ChevronRight size={13} /></button>
                        </div>
                      </div>
                      <AnimatePresence mode="wait">
                        <motion.div key={termProject.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                          <button onClick={() => setActiveProject(termProject.id)} className="mt-1 text-left w-full group/term">
                            <span className="font-bold" style={{ color: termProject.accent }}>{termProject.name}</span>
                            <span className="text-slate-400"> — {termProject.subtitle}</span>
                            <span className="ml-1 inline-block text-slate-500 group-hover/term:text-white transition">↗</span>
                          </button>
                          <div className="mt-1 text-slate-300 text-[12px] leading-6 line-clamp-2">{termProject.points[0]}</div>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {termProject.stack.slice(0, 4).map((s) => (
                              <span key={s} className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[11px] text-slate-300">{s}</span>
                            ))}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                      <div className="mt-3 flex gap-1.5">
                        {projects.map((p, i) => (
                          <button key={p.id} aria-label={`show ${p.name}`} onClick={() => setTermIdx(i)}
                            className={`h-1.5 rounded-full transition-all ${i === termIdx ? "w-6" : "w-1.5 bg-white/20 hover:bg-white/40"}`}
                            style={i === termIdx ? { background: termProject.accent } : undefined} />
                        ))}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-slate-400"><MapPin size={13} className="text-rose-300" /> {profile.location}</div>
                    <div className="flex items-center gap-2 text-slate-400"><Mail size={13} className="text-cyan-300" /> {profile.email}</div>
                  </div>
                  <div className="border-t border-white/10 p-4 flex gap-3 bg-black/20">
                    <button onClick={() => go("#contact")} className="flex-1 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-400 text-black font-bold py-2.5 text-sm hover:opacity-90 transition">$ hire mohamad-mahdi --now</button>
                    <a href={profile.github} target="_blank" rel="noreferrer" className="rounded-xl border border-white/15 px-4 py-2.5 text-sm hover:bg-white/10 transition inline-flex items-center gap-2"><GithubIcon size={15} /> repos</a>
                  </div>
                </div>
                <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -top-6 -right-4 rounded-2xl border border-white/10 bg-[#0c0e14]/90 px-4 py-3 backdrop-blur-xl shadow-2xl">
                  <div className="font-mono2 text-[11px] text-slate-400">uptime</div>
                  <div className="font-display font-bold text-emerald-300">ships to prod ⚡</div>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* marquee — memoized list, GPU transform only */}
        <div className="relative mt-14 border-y border-white/10 bg-white/[0.02] py-4 overflow-hidden mask-fade-x">
          <div className="flex w-max animate-marquee gap-3 pr-3 will-change-transform">
            {marqueeItems.map((t, i) => (
              <span key={i} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300 whitespace-nowrap">
                <Zap size={13} className="text-cyan-300" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- ABOUT BENTO ---------- */}
      <section id="about" className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 scroll-mt-24">
        <SectionHead kicker="about.exe" title="An engineer who thinks in systems, designs in pixels." desc="Computer Engineering senior. I don't just build UI — I architect the realtime pipes, queues, containers and schemas behind it." />
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          <Reveal className="md:col-span-2">
            <div onMouseMove={spotlight} className="spotlight-card glass rounded-3xl p-7 h-full">
              <div className="font-mono2 text-xs text-slate-500 uppercase tracking-widest">profile</div>
              <p className="mt-3 text-lg leading-relaxed text-slate-200">
                I built a <span className="text-cyan-300 font-semibold">real-time collaborative IDE</span> with CRDT-based conflict-free sync, a <span className="text-violet-300 font-semibold">queue-driven sandbox</span> that executes untrusted code inside hardened Docker containers, and a <span className="text-lime-200 font-semibold">monorepo e-commerce platform</span> on Next.js, NestJS/Express, PostgreSQL and Prisma.
              </p>
              <p className="mt-3 text-slate-400">Strong in distributed real-time architecture, secure API design, and container hardening — with a frontend obsession for motion, performance and craft. I also ship <span className="text-sky-300 font-semibold">WordPress sites</span> (live demo on Pantheon below) and work <span className="text-amber-200 font-semibold">AI-native</span>: Copilot, Cursor, ChatGPT, Claude + vibe-coding with production discipline.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Distributed realtime", "Secure APIs", "Container hardening", "Design systems", "Motion / UX", "WordPress", "AI workflow / Vibe-coding"].map((c) => (
                  <span key={c} className="rounded-full bg-cyan-400/10 border border-cyan-300/20 text-cyan-200 px-3 py-1 text-xs">{c}</span>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="grid gap-4">
            <Reveal delay={0.1}>
              <div className="glass rounded-3xl p-6">
                <div className="flex items-center gap-2 text-sm font-semibold"><GraduationCap size={16} className="text-violet-300" /> Education</div>
                <div className="mt-2 text-sm text-slate-300">{profile.education}</div>
                <div className="mt-1 font-mono2 text-[11px] text-slate-500">{profile.focus}</div>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="glass rounded-3xl p-6">
                <div className="flex items-center gap-2 text-sm font-semibold"><LangIcon size={16} className="text-lime-300" /> Languages & presence</div>
                <div className="mt-2 text-sm text-slate-300">{profile.languages}</div>
                <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-400"><Globe size={13} /> {profile.location}</div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <a href={profile.github} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 bg-white/5 py-2 hover:bg-white/10 transition text-xs inline-flex items-center justify-center gap-1"><GithubIcon size={13} /> GitHub</a>
                  <a href={`mailto:${profile.email}`} className="rounded-xl border border-white/10 bg-white/5 py-2 hover:bg-white/10 transition text-xs inline-flex items-center justify-center gap-1"><Mail size={13} /> Email</a>
                  <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="rounded-xl border border-white/10 bg-white/5 py-2 hover:bg-white/10 transition text-xs inline-flex items-center justify-center gap-1"><Phone size={13} /> Call</a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- SKILLS ---------- */}
      <section id="skills" className="relative border-t border-white/10 bg-white/[0.015] scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
          <SectionHead kicker="stack.sys" title="A full-stack arsenal, frontend-strong." desc="What I'd bring to your product team — React + this site's own stack (Vite, Tailwind, Motion, Lenis), plus WordPress and an AI-native workflow to ship faster without cutting corners." />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillGroups.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.07}>
                <div onMouseMove={spotlight} className="spotlight-card glass rounded-3xl p-6 h-full group hover:-translate-y-1.5 transition-transform duration-300">
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 border border-white/10 text-cyan-200">{iconFor(g.icon)}</span>
                    <span className="font-mono2 text-xs text-slate-500">{g.level}%</span>
                  </div>
                  <h3 className="font-display mt-4 font-bold text-lg">{g.title}</h3>
                  <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${g.level}%` }} viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-lime-300" />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {g.skills.map((s) => (
                      <span key={s} className="rounded-lg border border-white/10 bg-black/30 px-2.5 py-1 text-xs text-slate-300 hover:border-cyan-300/40 hover:text-white transition">{s}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PROJECTS ---------- */}
      <section id="work" className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 scroll-mt-24">
        <SectionHead kicker="selected work" title="Proof, not promises." desc="Everything from my GitHub — React SaaS, realtime systems, vanilla JS, and a live WordPress build. Click any card for details." />
        <div className="mt-10 grid lg:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.08}>
              <button onClick={() => setActiveProject(p.id)} onMouseMove={spotlight} data-cursor="view"
                className="spotlight-card glass group w-full cursor-pointer text-left rounded-3xl p-7 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
                style={{ boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08)` }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-mono2 text-[11px] uppercase tracking-[0.2em]" style={{ color: p.accent }}>{p.repo}</div>
                    <h3 className="font-display mt-2 text-2xl sm:text-3xl font-bold">{p.name}</h3>
                    <div className="text-slate-400 text-sm mt-1">{p.subtitle}</div>
                  </div>
                  <div className="shrink-0 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-center">
                    <div className="font-display font-bold" style={{ color: p.accent }}>{p.metric}</div>
                    <div className="text-[10px] text-slate-500 leading-tight">{p.metricLabel}</div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 6).map((s) => (
                    <span key={s} className="rounded-md bg-white/5 border border-white/10 px-2 py-1 text-[11px] text-slate-300">{s}</span>
                  ))}
                  {p.stack.length > 6 && <span className="text-[11px] text-slate-500 px-1 py-1">+{p.stack.length - 6} more</span>}
                </div>
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-lime-300/30 bg-lime-300/10 px-3 py-1.5 text-xs font-semibold text-lime-200 hover:bg-lime-300/20 transition">
                    <Globe size={12} /> Live: WordPress on Pantheon <ExternalLink size={11} />
                  </a>
                )}
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  <span className="rounded-full px-0 group-hover:px-1 transition-all">Explore case study</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-black group-hover:bg-cyan-300 transition"><ArrowUpRight size={16} /></span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {/* modal */}
        <AnimatePresence>
          {activeProject && (() => {
            const p = projects.find((x) => x.id === activeProject)!;
            return (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[90] grid place-items-center p-4 bg-black/70 backdrop-blur-md" onClick={() => setActiveProject(null)}>
                <motion.div initial={{ y: 40, scale: 0.97, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 20, scale: 0.98, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0c0e14] p-7 sm:p-9 shadow-2xl max-h-[85vh] overflow-y-auto">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-mono2 text-[11px] uppercase tracking-widest" style={{ color: p.accent }}>{p.repo}</div>
                      <h3 className="font-display text-3xl font-bold mt-1">{p.name}</h3>
                      <div className="text-slate-400 text-sm">{p.subtitle}</div>
                    </div>
                    <button onClick={() => setActiveProject(null)} className="rounded-lg border border-white/10 p-2 hover:bg-white/10"><X size={16} /></button>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">{p.stack.map((s) => <span key={s} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-300">{s}</span>)}</div>
                  <ul className="mt-5 space-y-3">
                    {p.points.map((pt, idx) => (
                      <li key={idx} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.accent }} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href={`https://github.com/${p.repo}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white text-black px-5 py-2.5 text-sm font-bold hover:bg-cyan-300 transition"><GithubIcon size={15} /> Open repository <ExternalLink size={13} /></a>
                    {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-lime-300/30 bg-lime-300/10 text-lime-200 px-5 py-2.5 text-sm font-bold hover:bg-lime-300/20 transition"><Globe size={15} /> Live WordPress demo <ExternalLink size={13} /></a>}
                    <button onClick={() => setActiveProject(null)} className="rounded-xl border border-white/15 px-5 py-2.5 text-sm hover:bg-white/10 transition">Close</button>
                  </div>
                </motion.div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </section>

      {/* ---------- JOURNEY ---------- */}
      <section id="journey" className="border-t border-white/10 bg-white/[0.015] scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 grid lg:grid-cols-[0.9fr_1.1fr] gap-10">
          <div>
            <SectionHead kicker="journey.log" title="From CS fundamentals to distributed frontends." />
            <Reveal delay={0.15}>
              <div className="mt-6 glass rounded-3xl p-6 font-mono2 text-[13px] leading-7 text-slate-300">
                <div><span className="text-slate-500">$</span> cat education.txt</div>
                <div className="text-white">{profile.education}</div>
                <div className="text-slate-500">{profile.focus}</div>
                <div className="mt-2"><span className="text-slate-500">$</span> cat contact.txt</div>
                <div>{profile.email} · {profile.phone}</div>
              </div>
            </Reveal>
          </div>
          <div className="relative pl-6 border-l border-white/10 space-y-6">
            {timeline.map((t, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="relative">
                  <span className="absolute -left-[31px] top-1 h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.9)]" />
                  <div className="font-mono2 text-[11px] uppercase tracking-widest text-cyan-300">{t.year}</div>
                  <div className="font-display font-bold text-lg mt-1">{t.title}</div>
                  <div className="text-sm text-violet-200/80">{t.org}</div>
                  <div className="text-sm text-slate-400 mt-1 leading-relaxed">{t.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CONTACT ---------- */}
      <section id="contact" className="relative overflow-hidden scroll-mt-24">
        <div className="glow-orb absolute top-0 left-1/2 -translate-x-1/2 h-[420px] w-[720px] rounded-full bg-violet-600/30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
          <div className="glass rounded-[32px] p-8 sm:p-14 grid lg:grid-cols-2 gap-10 overflow-hidden">
            <div>
              <Reveal>
                <div className="font-mono2 text-xs uppercase tracking-[0.25em] text-lime-300">ping me — response &lt; 24h</div>
                <h2 className="font-display mt-3 text-4xl sm:text-6xl font-bold leading-[0.95] tracking-tight">Let's build<br />something <span className="bg-gradient-to-r from-cyan-300 to-lime-200 bg-clip-text text-transparent">real-time.</span></h2>
                <p className="mt-4 text-slate-400 max-w-md">I'm looking for a full-stack or frontend role where craft matters. If you're a CTO who loves systems + pixels, let's talk.</p>
              </Reveal>
              <div className="mt-6 space-y-3 text-sm">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 hover:border-cyan-300/40 transition"><Mail size={16} className="text-cyan-300" /> {profile.email}</a>
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 hover:border-cyan-300/40 transition"><Phone size={16} className="text-violet-300" /> {profile.phone}</a>
                <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 hover:border-cyan-300/40 transition"><GithubIcon size={16} className="text-lime-200" /> {profile.githubHandle} <ArrowUpRight size={14} className="ml-auto text-slate-500" /></a>
                <a href="/Mohamad-Mahdi-Mehralian-CV.pdf" download="Mohamad-Mahdi-Mehralian-CV.pdf" className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 hover:border-cyan-300/40 transition"><Download size={16} className="text-cyan-300" /> Download CV <ArrowUpRight size={14} className="ml-auto text-slate-500" /></a>
              </div>
            </div>
            <Reveal delay={0.12}>
              <div className="rounded-3xl border border-white/10 bg-black/40 p-6 sm:p-8">
                {!sent ? (
                  <form onSubmit={submitForm} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <label className="block"><span className="text-xs font-mono2 text-slate-500 uppercase">name</span>
                        <input required value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Ada Lovelace" className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan-300/60 placeholder:text-slate-600" /></label>
                      <label className="block"><span className="text-xs font-mono2 text-slate-500 uppercase">email</span>
                        <input required type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} placeholder="cto@company.com" className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan-300/60 placeholder:text-slate-600" /></label>
                    </div>
                    <label className="block"><span className="text-xs font-mono2 text-slate-500 uppercase">message</span>
                      <textarea required rows={5} value={formMsg} onChange={(e) => setFormMsg(e.target.value)} placeholder="Hi Mahdi — we need a full-stack engineer who can own realtime collab. Are you open for a chat?" className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan-300/60 placeholder:text-slate-600 resize-none" /></label>
                    {sendError && (
                      <div className="rounded-xl border border-rose-300/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
                        {sendError} <a className="underline" href={`mailto:${profile.email}`}>{profile.email}</a>
                      </div>
                    )}
                    <button disabled={sending} className="group w-full rounded-xl bg-gradient-to-r from-cyan-400 via-violet-400 to-lime-300 text-black font-bold py-3.5 hover:opacity-90 transition inline-flex items-center justify-center gap-2 disabled:opacity-60">
                      {sending ? "Sending…" : "Send transmission"} <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                    </button>
                    <div className="font-mono2 text-[11px] text-slate-600 text-center">
                      {formspreeId ? "delivered straight to my inbox · no spam" : "no backend key set — opens your mail app pre-filled · nothing is lost"}
                    </div>
                  </form>
                ) : (
                  <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                    <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-400/15 border border-emerald-300/30"><Check size={22} className="text-emerald-300" /></div>
                    <h3 className="font-display text-2xl font-bold mt-4">{sentVia === "email" ? "Check your email app ✉️" : "Message sent ⚡"}</h3>
                    <p className="text-slate-400 text-sm mt-2">{sentVia === "email" ? <>I pre-filled everything — just hit send in your mail app.<br />Prefer to write manually? <a className="text-cyan-300 underline" href={`mailto:${profile.email}`}>{profile.email}</a></> : <>Thanks! I'll reply within 24h.<br />Prefer email? <a className="text-cyan-300 underline" href={`mailto:${profile.email}`}>{profile.email}</a></>}</p>
                    <button onClick={() => { setSent(false); setSentVia(null); }} className="mt-5 rounded-xl border border-white/15 px-5 py-2.5 text-sm hover:bg-white/10 transition">Send another</button>
                  </motion.div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 font-display font-bold text-black text-sm">{profile.initials}</span>
            <div className="text-sm text-slate-400">© 2026 {profile.name} · Crafted with React, Tailwind & obsession.</div>
          </div>
          <div className="flex items-center gap-2">
            <a href={profile.github} target="_blank" rel="noreferrer" className="rounded-lg border border-white/10 p-2.5 hover:bg-white/10 transition"><GithubIcon size={16} /></a>
            <a href={`mailto:${profile.email}`} className="rounded-lg border border-white/10 p-2.5 hover:bg-white/10 transition"><Mail size={16} /></a>
            <button onClick={() => go("#top")} className="rounded-lg border border-white/10 p-2.5 hover:bg-white/10 transition" aria-label="back to top"><ChevronUp size={16} /></button>
          </div>
        </div>
      </footer>
    </div>
  );
}
