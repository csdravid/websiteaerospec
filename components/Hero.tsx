"use client";

import { Reveal } from "./Reveal";
import { SpectralTrace } from "./SpectralTrace";
import { handleNavClick } from "@/lib/scroll";

function RotatingBadge() {
  return (
    <div className="absolute right-0 top-0 hidden h-24 w-24 items-center justify-center md:flex">
      <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slow">
        <defs>
          <path
            id="badge-circle"
            d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
          />
        </defs>
        <text fontSize="6.8" letterSpacing="1.2" className="fill-white/70">
          <textPath href="#badge-circle" startOffset="0%">
            AEROSPEC • AIR MONITOR • AEROSPEC • AIR MONITOR •
          </textPath>
        </text>
      </svg>
      <span className="absolute h-2 w-2 rounded-full bg-accent" />
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="sticky top-0 z-[1] flex min-h-screen flex-col bg-ink px-6 pb-10 pt-36 text-white sm:px-10 md:pt-44 lg:px-16">
      <div className="relative mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center">
        <RotatingBadge />
        <Reveal className="flex flex-col gap-8">
          <span className="inline-flex w-fit items-center rounded-md border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white/70">
            Patented aerosol analysis
          </span>

          <h1 className="text-6xl font-extrabold leading-[1.08] tracking-tight sm:text-7xl md:text-8xl lg:text-[6.5rem]">
            Holistic aerosol air pollution analysis to save{" "}
            <span className="text-accent">millions of lives</span>.
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
            The AIR Monitor is the first instrument to deliver near-real-time
            infrared spectroscopy of particulate matter. It identifies,
            quantifies, and traces pollution sources on its own, with no extra
            instruments or expert analysis needed.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="rounded-md bg-accent px-6 py-3 text-base font-bold text-white transition-all duration-200 hover:scale-[1.03] hover:bg-accent-strong active:scale-95"
            >
              Talk to us
            </a>
            <a
              href="#product"
              onClick={(e) => handleNavClick(e, "#product")}
              className="rounded-md bg-accent-soft px-6 py-3 text-base font-bold text-ink transition-all duration-200 hover:scale-[1.03] hover:bg-white active:scale-95"
            >
              Explore the AIR Monitor
            </a>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto mt-8 w-full max-w-[1600px]">
        <SpectralTrace className="h-8 w-full text-white/25" />
        <div className="flex flex-col gap-6 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base uppercase tracking-wider text-white/40">
            What makes it possible
          </p>
          <ul className="flex flex-wrap gap-x-10 gap-y-3 text-base font-medium text-white/70">
            <li>Near-real-time infrared spectroscopy</li>
            <li>Automatic source-tracing</li>
            <li>No expert analysis required</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
