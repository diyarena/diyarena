"use client";

import { useEffect, useState } from "react";
import { kindLabel, SLIDESHOW_DISCLAIMER, type Slide } from "@/lib/slides";

// The slideshow plays INSIDE the laptop screen: slides sit behind the mockup image, whose screen area is transparent.
// SCREEN is the screen's position as a percentage of public/brand/laptop-hand.webp (858 x 928).
const SCREEN = { left: 9.56, top: 2.37, width: 81.0, height: 46.98 };
const INTERVAL = 4800;

export function LaptopSlideshow({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  const n = slides.length;

  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(q.matches);
    update();
    q.addEventListener("change", update);
    return () => q.removeEventListener("change", update);
  }, []);

  const playing = n > 1 && !hover && !userPaused && !reduce;
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), INTERVAL);
    return () => clearInterval(t);
  }, [playing, n]);

  const go = (d: number) => setI((x) => (x + d + n) % n);
  const s = slides[i];
  const btn = "grid h-10 w-10 place-items-center rounded-full border border-[#E6E6E4] bg-white text-[#111] hover:bg-[#F1F1EF]";

  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="overflow-hidden rounded-3xl bg-gradient-to-b from-white via-[#F4F2FA] to-[#D9D6E8] px-4 pt-8 sm:px-10">
        <div className="relative mx-auto w-full max-w-[720px]" style={{ aspectRatio: "858 / 928" }}>
          <div
            className="absolute overflow-hidden bg-black"
            style={{ left: `${SCREEN.left}%`, top: `${SCREEN.top}%`, width: `${SCREEN.width}%`, height: `${SCREEN.height}%`, borderRadius: "0.8% / 1.4%" }}
          >
            {slides.map((x, k) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={x.src}
                src={x.src}
                alt={k === i ? x.alt : ""}
                aria-hidden={k !== i}
                loading={k === 0 ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:transition-none"
                style={{ opacity: k === i ? 1 : 0 }}
              />
            ))}
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/laptop-hand.webp" alt="" aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
        </div>
      </div>

      <div className="mt-6 text-center">
        <span className="inline-block rounded-full bg-[#F1F1EF] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#242424]">{kindLabel[s.kind]}</span>
        <p className="mt-2 text-xl font-semibold text-[#111]" aria-live={playing ? "off" : "polite"}>{s.caption}</p>
        <p className="mx-auto mt-1 max-w-2xl text-sm text-[#6B6B68]">{s.source}</p>
      </div>

      {n > 1 && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <button type="button" className={btn} onClick={() => go(-1)} aria-label="Previous slide">&#8249;</button>
          <button type="button" className={btn} onClick={() => setUserPaused((p) => !p)} aria-label={userPaused || reduce ? "Play slideshow" : "Pause slideshow"}>
            {userPaused || reduce ? "\u25B6" : "\u275A\u275A"}
          </button>
          <button type="button" className={btn} onClick={() => go(1)} aria-label="Next slide">&#8250;</button>
          <div className="ml-2 flex gap-1.5" role="group" aria-label="Choose slide">
            {slides.map((x, k) => (
              <button key={x.src} type="button" onClick={() => setI(k)} aria-label={`Show slide ${k + 1} of ${n}`} aria-current={k === i} className={`h-2.5 rounded-full transition-all ${k === i ? "w-6 bg-[#111]" : "w-2.5 bg-[#E6E6E4]"}`} />
            ))}
          </div>
        </div>
      )}
      <p className="mx-auto mt-5 max-w-2xl text-center text-xs text-[#6B6B68]">{SLIDESHOW_DISCLAIMER}</p>
    </div>
  );
}
