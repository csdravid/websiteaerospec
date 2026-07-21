"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

const SECTORS = [
  {
    id: "gov",
    tab: "Government",
    label: "01",
    title: "Governments & public agencies",
    description:
      "National monitoring networks spend fortunes on lab procedures just to trace where pollution came from. AIRMon deploys as a distributed network, finding emission hotspots and tracking long-range transport in near-real-time.",
    outcomes: [
      "Evidence-based policy instead of assumptions",
      "Faster, cheaper monitoring networks",
      "Built-in alignment with WHO and EU air-quality standards",
    ],
  },
  {
    id: "industry",
    tab: "Industry",
    label: "02",
    title: "Industrial sectors",
    description:
      "Continuous on-site monitoring catches abnormal emissions before they become fines, and verifies filters and scrubbers are actually working. Portable, self-cleaning, and available on lease — no lab, no capex.",
    outcomes: [
      "Continuous compliance and early anomaly detection",
      "Fewer fines, less downtime",
      "ESG and sustainability data that holds up to scrutiny",
    ],
  },
  {
    id: "research",
    tab: "Research",
    label: "03",
    title: "Research & academia",
    description:
      "Sampling, analysis, and interpretation in one compact system, delivering readings every 15 minutes to 2 hours instead of once a week from a lab. Already validated in field campaigns by EPFL and Nagoya University.",
    outcomes: [
      "Unprecedented temporal resolution for research data",
      "Simpler field logistics, fewer devices to calibrate",
      "Comparable data across sites and long-term studies",
    ],
  },
  {
    id: "health",
    tab: "Healthcare",
    label: "04",
    title: "Healthcare, insurance & public",
    description:
      "Pollution data means little until it's tied to health outcomes. The upcoming AeroSpec Cloud platform maps particle sources directly to disease burden, accessible via API for cities, hospitals, and insurers.",
    outcomes: [
      "Evidence linking pollution sources to health outcomes",
      "Smarter city planning and targeted interventions",
      "Data-driven models for prevention and insurance",
    ],
  },
] as const;

export function IndustriesSection() {
  const [activeId, setActiveId] = useState<(typeof SECTORS)[number]["id"]>(
    SECTORS[0].id,
  );
  const sector = SECTORS.find((s) => s.id === activeId)!;

  return (
    <section id="industries" className="relative z-[3] flex min-h-screen flex-col justify-center bg-ink px-8 py-20 text-white sm:px-10 lg:px-16">
      <Reveal className="mx-auto w-full max-w-[1600px]">
        <p className="text-base font-semibold uppercase tracking-wider text-accent-bright">
          Industries
        </p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
          Built for whoever has to answer for the air.
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/60">
          Air pollution isn&apos;t a single-sector problem, so the AIR
          Monitor isn&apos;t a single-sector instrument.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {SECTORS.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={activeId === s.id}
              onClick={() => setActiveId(s.id)}
              className={`rounded-md px-4 py-2 text-base font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-95 ${
                activeId === s.id
                  ? "bg-white text-ink"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {s.tab}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 border-t border-white/10 pt-8 md:grid-cols-[auto_1fr] md:gap-10">
          <span className="text-2xl font-extrabold text-accent-bright">
            {sector.label}
          </span>
          <div className="max-w-2xl">
            <h3 className="text-2xl font-semibold md:text-3xl">
              {sector.title}
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
              {sector.description}
            </p>
            <ul className="mt-6 flex flex-col gap-2">
              {sector.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="flex gap-2 text-base leading-relaxed text-white/75"
                >
                  <span aria-hidden className="text-accent-bright">
                    →
                  </span>
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
