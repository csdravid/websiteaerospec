"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IndustryGraphic, type SectorId } from "./IndustryGraphic";
import { Reveal } from "./Reveal";

// `useLayoutEffect` is a no-op (with a dev warning) during SSR, so fall back
// to `useEffect` on the server; on the client it always resolves to the real
// `useLayoutEffect`. See the comment on the height-measuring effect below —
// same technique ProductSection.tsx uses for its own "content height changes
// as you switch state" fix.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

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
    stat: {
      eyebrow: "Compliance cost",
      prefix: "",
      value: 83,
      decimals: 0,
      suffix: "%",
      sub: "lower cost to reach WHO / EU-grade monitoring density across a regional network",
      footnote: "Placeholder",
    },
  },
  {
    id: "industry",
    tab: "Industry",
    label: "02",
    title: "Industrial sectors",
    description:
      "Continuous on-site monitoring catches abnormal emissions before they become fines, and verifies filters and scrubbers are actually working. Portable, self-cleaning, and available on lease. No lab, no capex.",
    outcomes: [
      "Continuous compliance and early anomaly detection",
      "Fewer fines, less downtime",
      "ESG and sustainability data that holds up to scrutiny",
    ],
    stat: {
      eyebrow: "Risk exposure",
      prefix: "$",
      value: 4.8,
      decimals: 1,
      suffix: "M",
      sub: "average annual cost of undetected exceedances: fines plus unplanned downtime",
      footnote: "Placeholder",
    },
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
    stat: {
      eyebrow: "Data resolution",
      prefix: "",
      value: 15,
      decimals: 0,
      suffix: " min",
      sub: "between readings, versus up to a week for lab-based sampling",
      footnote: "Placeholder",
    },
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
    stat: {
      eyebrow: "Disease burden",
      prefix: "",
      value: 12.5,
      decimals: 1,
      suffix: "%",
      sub: "of deaths worldwide now linked to air pollution exposure",
      footnote: "Placeholder",
    },
  },
] as const;

type Sector = (typeof SECTORS)[number];

// The label/title/description/outcomes/graphic row, shared between the one
// visible copy and the four offscreen copies used purely for height
// measurement (see the effect in IndustriesSection below) — so both are
// guaranteed to lay out identically and wrap text at the same widths.
function SectorRow({ sector }: { sector: Sector }) {
  return (
    <div className="grid gap-6 md:grid-cols-[auto_1fr] md:gap-10">
      <span className="text-2xl font-extrabold text-accent-bright">
        {sector.label}
      </span>
      <div className="max-w-2xl">
        <h3 className="text-2xl font-semibold md:text-3xl">{sector.title}</h3>
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
  );
}

export function IndustriesSection() {
  const [activeId, setActiveId] = useState<SectorId>(SECTORS[0].id);
  const sector = SECTORS.find((s) => s.id === activeId)!;

  // The tallest of the 4 sectors' content, so switching tabs never changes
  // this section's rendered height (different title/description/stat
  // lengths would otherwise wrap to different numbers of lines and shift
  // everything below the section). Measured off 4 offscreen copies — one
  // per sector — rather than tracked from whichever tabs a visitor happens
  // to click, so the reserved height is correct from the very first paint.
  const measureRefs = useRef<Partial<Record<SectorId, HTMLDivElement | null>>>(
    {}
  );
  const [rowHeight, setRowHeight] = useState<number>();

  // Same idea, applied narrowly to just the stat readout's support sentence:
  // its wrapped height differs per sector (some run 2 lines, some 3), so
  // without a fixed height the readout's total block height would vary — and
  // since the readout is vertically centered in the row, that would shift
  // the eyebrow (its first line) up/down as you switch tabs. Pinning only
  // that sentence's height to the tallest variant makes every sector's total
  // block height identical, uniformly, without padding the rest of the
  // block with dead space.
  const subMeasureRefs = useRef<Partial<Record<SectorId, HTMLDivElement | null>>>(
    {}
  );
  const [subHeight, setSubHeight] = useState<number>();

  useIsomorphicLayoutEffect(() => {
    const measure = () => {
      const heights = SECTORS.map(
        (s) => measureRefs.current[s.id]?.offsetHeight ?? 0
      );
      setRowHeight(Math.max(...heights));
      const subHeights = SECTORS.map(
        (s) =>
          subMeasureRefs.current[s.id]?.querySelector<HTMLElement>(
            "[data-sub]"
          )?.offsetHeight ?? 0
      );
      setSubHeight(Math.max(...subHeights));
    };
    measure();
    const observer = new ResizeObserver(measure);
    SECTORS.forEach((s) => {
      const el = measureRefs.current[s.id];
      if (el) observer.observe(el);
      const subEl = subMeasureRefs.current[s.id];
      if (subEl) observer.observe(subEl);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="industries" className="relative z-[3] flex min-h-screen flex-col justify-center bg-ink px-8 py-20 text-white sm:px-10 lg:px-16">
      <Reveal className="mx-auto w-full max-w-[1600px] lg:grid lg:grid-cols-2">
        <div>
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

          <div className="relative mt-14">
            <div style={{ minHeight: rowHeight }}>
              <SectorRow sector={sector} />
            </div>

            {/* Offscreen: one static copy per sector, absolutely positioned so
                they never affect visible layout, purely to measure the
                tallest possible content height (see effect above). */}
            <div
              aria-hidden
              className="invisible absolute inset-x-0 top-0 -z-10"
            >
              {SECTORS.map((s) => (
                <div
                  key={s.id}
                  ref={(el) => {
                    measureRefs.current[s.id] = el;
                  }}
                >
                  <SectorRow sector={s} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden lg:flex lg:items-center lg:justify-center">
          <IndustryGraphic
            activeId={activeId}
            stat={sector.stat}
            staticMode={false}
            subMinHeight={subHeight}
          />

          {/* Offscreen: one static copy per sector, purely to measure the
              tallest possible support-sentence height (see effect above). */}
          <div aria-hidden className="invisible absolute -z-10">
            {SECTORS.map((s) => (
              <div
                key={s.id}
                ref={(el) => {
                  subMeasureRefs.current[s.id] = el;
                }}
              >
                <IndustryGraphic activeId={s.id} stat={s.stat} staticMode />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
