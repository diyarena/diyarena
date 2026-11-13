import { site } from "@/lib/site";

// Hero scene: layered glass, a network of knowledge and tool streams, and the character.
// Pure SVG + CSS: light travels along each stream toward his head. Labels are typeset text, icons are simple generic glyphs.
// Motion stops for reduced-motion users; on small screens the network is simplified (see globals.css).

type Icon = "models" | "agents" | "apps" | "connect" | "social" | "video" | "automation" | "skills" | "work" | "web" | "create" | "biz";

const ICONS: Record<Icon, string> = {
  models: "M7 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z M9.5 9.5h5v5h-5z M9 2v3 M15 2v3 M9 19v3 M15 19v3 M2 9h3 M2 15h3 M19 9h3 M19 15h3",
  agents: "M6 9h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z M12 9V5 M9 13.5v1 M15 13.5v1 M2 13v3 M22 13v3",
  apps: "M4 4h6v6H4z M14 4h6v6h-6z M4 14h6v6H4z M14 14h6v6h-6z",
  connect: "M9 3v5 M15 3v5 M6 8h12v4a6 6 0 0 1-12 0z M12 18v3",
  social: "M8.3 10.9l7.4-3.8 M8.3 13.1l7.4 3.8 M6 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z M18 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z M18 15.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z",
  video: "M6 6h12a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3z M10 9.5v5l4.5-2.5z",
  automation: "M13 2L5 14h6l-1 8 8-12h-6z",
  skills: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z",
  work: "M4 8h16v11H4z M9 8V5h6v3 M4 13h16",
  web: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M3 12h18 M12 3c3 3 3 15 0 18 M12 3c-3 3-3 15 0 18",
  create: "M12 3a9 9 0 1 0 0 18c1.6 0 2-1 1.5-2s0-2 1.5-2h2a3 3 0 0 0 3-3A9 9 0 0 0 12 3z M7.5 11h.01 M10 7.5h.01 M14.5 7.5h.01",
  biz: "M4 20V10 M10 20V4 M16 20v-7 M2 20h20",
};

// x, y in a 600 x 600 scene. Labelled nodes are the main streams; the small ones are icon-only.
const nodes: { x: number; y: number; icon: Icon; label?: string; why: string }[] = [
  { x: 95, y: 75, icon: "models", label: "AI models", why: "AI models" },
  { x: 300, y: 38, icon: "agents", label: "AI agents", why: "AI agents" },
  { x: 505, y: 75, icon: "apps", label: "AI apps & web tools", why: "AI applications and web tools" },
  { x: 42, y: 215, icon: "skills", label: "Digital skills", why: "Digital skills" },
  { x: 558, y: 215, icon: "connect", label: "Connectors & plugins", why: "Connectors and plugins" },
  { x: 68, y: 385, icon: "social", label: "Social media", why: "Social media platforms" },
  { x: 532, y: 385, icon: "video", label: "YouTube & video", why: "YouTube and video creation" },
  { x: 545, y: 520, icon: "automation", label: "Automation", why: "Automation" },
  { x: 190, y: 108, icon: "work", why: "Productivity and business tools" },
  { x: 410, y: 108, icon: "web", why: "Web applications" },
  { x: 22, y: 310, icon: "create", why: "Digital creativity" },
  { x: 578, y: 310, icon: "biz", why: "Business tools" },
];

function stream(x: number, y: number, hx: number, hy: number) {
  const cx = x + (hx - x) * 0.45;
  const cy = hy + (y - hy) * 0.3;
  const len = Math.hypot(cx - hx, cy - hy) || 1;
  const ex = hx + ((cx - hx) / len) * 40; // stop at the edge of the head, not inside it
  const ey = hy + ((cy - hy) / len) * 40;
  return `M${x} ${y} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
}

export function HeroFigure() {
  const img = site.heroImage;
  const hx = 300;
  const hy = ((img?.headY ?? 31) / 100) * 600;
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[600px]">
      {site.heroBackdrop && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={site.heroBackdrop} alt="" className="absolute inset-0 h-full w-full rounded-[2rem] object-cover" />
      )}
      {!site.heroBackdrop && (
        <>
          <div className="glass-frost absolute left-[7%] top-[8%] h-[78%] w-[42%] -rotate-6 rounded-[3rem] border border-white/70 bg-white/25 backdrop-blur-md" />
          <div className="glass-frost absolute right-[7%] top-[8%] h-[78%] w-[42%] rotate-6 rounded-[3rem] border border-white/70 bg-white/25 backdrop-blur-md" />
        </>
      )}
      <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full overflow-visible" fill="none">
        <defs>
          <radialGradient id="headGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#CFE0FF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#9DB8FF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="glassFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#C9D8FF" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id="glassEdge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#B9C9F5" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <clipPath id="glassClip"><circle cx="300" cy="270" r="228" /></clipPath>
          <filter id="lightGlow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2.2" /></filter>
        </defs>

        {/* Drawn glassscape: curved translucent panels, a glass disc and a slow sheen */}
        {!site.heroBackdrop && (
          <g>
            <path d="M40 540 C16 290 120 100 300 44 L300 540 Z" fill="url(#glassFill)" stroke="url(#glassEdge)" strokeWidth="1.6" opacity="0.7" />
            <path d="M560 540 C584 290 480 100 300 44 L300 540 Z" fill="url(#glassFill)" stroke="url(#glassEdge)" strokeWidth="1.6" opacity="0.7" />
            <circle cx="300" cy="270" r="228" fill="url(#glassFill)" opacity="0.35" />
            <circle cx="300" cy="270" r="228" stroke="url(#glassEdge)" strokeWidth="2" />
            <circle cx="300" cy="270" r="206" stroke="#FFFFFF" strokeOpacity="0.7" strokeWidth="1" />
            <path d="M120 150 C150 100 210 62 270 52" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
            <path d="M486 420 C462 466 412 500 360 512" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
            <g clipPath="url(#glassClip)">
              <rect x="-80" y="0" width="150" height="600" fill="url(#sheen)" transform="skewX(-18)" className="glass-shimmer" />
            </g>
            <ellipse cx="300" cy="556" rx="190" ry="20" fill="#9DB8FF" opacity="0.18" />
          </g>
        )}

        <circle cx={hx} cy={hy} r="120" fill="url(#headGlow)" className="hero-glow" />

        {/* Streams: a faint guide line plus travelling light (two pulses on desktop, one on small screens) */}
        {nodes.map((n, i) => {
          const d = stream(n.x, n.y, hx, hy);
          const dur = `${(3.4 + (i % 5) * 0.45).toFixed(2)}s`;
          return (
            <g key={n.why} className={n.label ? "" : "net-minor"}>
              <path d={d} stroke="#9DB8FF" strokeOpacity="0.35" strokeWidth="1.2" strokeLinecap="round" />
              <g filter="url(#lightGlow)">
                <path d={d} pathLength={100} stroke="#7AA2FF" strokeWidth="3" strokeLinecap="round" className="net-flow" style={{ animationDuration: dur, animationDelay: `${(i * 0.37).toFixed(2)}s` }} />
                <path d={d} pathLength={100} stroke="#BBD0FF" strokeWidth="3" strokeLinecap="round" className="net-flow net-second" style={{ animationDuration: dur, animationDelay: `${(i * 0.37 + 1.7).toFixed(2)}s` }} />
              </g>
              <path d={d} pathLength={100} stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" className="net-flow" style={{ animationDuration: dur, animationDelay: `${(i * 0.37).toFixed(2)}s` }} />
            </g>
          );
        })}

        {/* Nodes: glass discs with a generic glyph and a typeset label */}
        {nodes.map((n, i) => {
          const r = n.label ? 24 : 16;
          const s = n.label ? 1 : 0.7;
          const anchor = n.x < 150 ? "start" : n.x > 450 ? "end" : "middle";
          const lx = anchor === "start" ? n.x - 22 : anchor === "end" ? n.x + 22 : n.x;
          return (
            <g key={n.why} className={`net-node ${n.label ? "" : "net-minor"}`} style={{ animationDelay: `${(i * 0.4).toFixed(1)}s` }}>
              <circle cx={n.x} cy={n.y} r={r} fill="#FFFFFF" fillOpacity="0.88" stroke="#C9D6F7" strokeWidth="1.2" style={{ filter: "drop-shadow(0 6px 10px rgba(60,80,160,0.18))" }} />
              <g transform={`translate(${n.x - 12 * s} ${n.y - 12 * s}) scale(${s})`}>
                <path d={ICONS[n.icon]} stroke="#111111" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              {n.label && (
                <text x={lx} y={n.y + 44} textAnchor={anchor} className="net-label" fontSize="15" fontWeight="600" fill="#242424" style={{ fontFamily: "inherit" }}>
                  {n.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      {img && (
        <div className="absolute inset-x-0 top-[24%] flex h-[68%] justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.src} alt="" className="hero-person h-full w-auto object-contain" />
        </div>
      )}
    </div>
  );
}
