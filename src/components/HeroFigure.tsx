import { site } from "@/lib/site";

// Decorative hero art: a floating, seated figure with light flowing to the head.
// Pure SVG + CSS (see globals.css). No JavaScript, and motion stops for reduced-motion users.

const rays = [
  { d: "M20 30 Q110 40 178 148", dur: "2.6s", delay: "0s" },
  { d: "M200 8 Q196 70 200 126", dur: "2.2s", delay: "0.4s" },
  { d: "M380 30 Q290 40 222 148", dur: "2.8s", delay: "0.8s" },
  { d: "M6 150 Q80 120 168 160", dur: "2.4s", delay: "1.2s" },
  { d: "M394 150 Q320 120 232 160", dur: "3s", delay: "0.2s" },
  { d: "M10 250 Q90 200 172 184", dur: "2.7s", delay: "0.6s" },
  { d: "M390 250 Q310 200 228 184", dur: "2.5s", delay: "1s" },
  { d: "M100 8 Q140 80 186 132", dur: "2.9s", delay: "1.4s" },
  { d: "M300 8 Q260 80 214 132", dur: "2.3s", delay: "0.3s" },
];

const stars = [
  [60, 90], [340, 100], [40, 210], [360, 220], [150, 40], [255, 36],
];

export function HeroFigure() {
  const img = site.heroImage;
  // Move the light rays so they meet the head of the realistic character.
  const dy = img ? (img.headY / 100) * 400 - 170 : 0;
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[460px]">
      <svg viewBox="0 0 400 400" className="h-auto w-full overflow-visible" fill="none">
        <defs>
          <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F5B83D" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#F5B83D" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g transform={`translate(0 ${dy})`}>
        <circle cx="200" cy="170" r="95" fill="url(#heroGlow)" className="hero-glow" />

        {rays.map((r) => (
          <g key={r.d}>
            <path d={r.d} stroke="#E8A317" strokeOpacity="0.18" strokeWidth="1" strokeLinecap="round" />
            <path
              d={r.d}
              stroke="#E8A317"
              strokeWidth="1.8"
              strokeLinecap="round"
              className="hero-ray"
              style={{ animationDuration: r.dur, animationDelay: r.delay }}
            />
          </g>
        ))}
        </g>

        {stars.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2" fill="#E8A317" className="hero-twinkle" style={{ animationDelay: `${i * 0.5}s` }} />
        ))}

        <ellipse cx="200" cy="370" rx="70" ry="7" fill="#E6E6E4" className="hero-shadow" />

        {!img && (
        <g className="hero-float">
          {/* head and torso */}
          <circle cx="200" cy="170" r="26" fill="#111" />
          <path d="M176 206 Q200 196 224 206 L234 304 Q200 332 166 304 Z" fill="#111" />
          {/* arms resting on knees */}
          <path d="M178 214 Q148 250 150 292" stroke="#111" strokeWidth="12" strokeLinecap="round" />
          <path d="M222 214 Q252 250 250 292" stroke="#111" strokeWidth="12" strokeLinecap="round" />
          <circle cx="150" cy="294" r="8" fill="#111" />
          <circle cx="250" cy="294" r="8" fill="#111" />
          {/* crossed legs */}
          <path d="M128 304 Q175 338 234 314" stroke="#111" strokeWidth="16" strokeLinecap="round" />
          <path d="M272 304 Q225 338 166 314" stroke="#111" strokeWidth="16" strokeLinecap="round" />
          {/* light arriving at the mind */}
          <circle cx="200" cy="150" r="4" fill="#F5B83D" className="hero-glow" />
        </g>
        )}
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
