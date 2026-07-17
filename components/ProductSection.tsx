"use client";

import { useEffect, useState } from "react";
import { ProductDemo } from "./ProductDemo";
import { Reveal } from "./Reveal";

const FEATURES = [
  {
    label: "01",
    word: "Real-Time",
    title: "Near-real-time spectroscopy",
    description:
      "Infrared spectroscopy of particulate matter, delivered in near-real-time. It's the first instrument of its kind.",
    color: "#5d30f7",
  },
  {
    label: "02",
    word: "Tracing",
    title: "Automated source tracing",
    description:
      "It automatically identifies pollutants, quantifies them, and traces their source.",
    color: "#6d28d9",
  },
  {
    label: "03",
    word: "All-In-One",
    title: "One instrument, not a lab",
    description:
      "Cost-effective and self-contained. No additional instruments or dedicated lab setup required.",
    color: "#7e22ce",
  },
  {
    label: "04",
    word: "Automatic",
    title: "No expert analysis needed",
    description:
      "Automated analysis cuts the labor and time normally spent on expert-driven composition studies.",
    color: "#9333ea",
  },
  {
    label: "05",
    word: "Patented",
    title: "Protected technology",
    description:
      "The AIR Monitor is protected under two separate patents covering its measurement and analysis approach.",
    color: "#a21caf",
  },
];

const DEMO_TILE_COLOR = "#c026d3";

const COLUMN_COUNT = 6;
const EXPANDED_BASIS = 34;
const COLLAPSED_BASIS = (100 - EXPANDED_BASIS) / (COLUMN_COUNT - 1);
const RESTING_BASIS = 100 / COLUMN_COUNT;
const ACCORDION_EASE = "cubic-bezier(0.4,0,0.2,1)";

function AccordionColumn({
  label,
  word,
  title,
  description,
  color,
  cta,
  onClick,
  isHovered,
  isDimmed,
  onHoverStart,
  onHoverEnd,
}: {
  label: string;
  word: string;
  title: string;
  description: string;
  color: string;
  cta?: string;
  onClick?: () => void;
  isHovered: boolean;
  isDimmed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const basis = isHovered ? EXPANDED_BASIS : isDimmed ? COLLAPSED_BASIS : RESTING_BASIS;

  return (
    <div
      onClick={onClick}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      style={{
        backgroundColor: color,
        flexBasis: `${basis}%`,
        transitionProperty: "flex-basis",
        transitionDuration: "500ms",
        transitionTimingFunction: ACCORDION_EASE,
      }}
      className={`relative grow-0 shrink-0 overflow-hidden text-white ${onClick ? "cursor-pointer" : ""}`}
    >
      {/* Collapsed state: number + big upright word */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-between px-3 py-8 transition-opacity ease-out ${
          isHovered ? "opacity-0 duration-150" : "opacity-100 duration-200 delay-200"
        }`}
      >
        <span className="text-2xl font-extrabold">{label}</span>
        <h3 className="text-center text-3xl font-extrabold leading-tight tracking-tight lg:text-4xl">
          {word}
        </h3>
      </div>

      {/* Expanded state: full content */}
      <div
        className={`absolute inset-0 flex flex-col justify-end p-6 transition-opacity ease-out ${
          isHovered ? "opacity-100 duration-300 delay-200" : "opacity-0 duration-150"
        }`}
      >
        <span className="text-sm font-semibold uppercase tracking-wider text-white/80">
          {label}
        </span>
        <h3 className="mt-2 text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-base leading-relaxed text-white/80">
          {description}
        </p>
        {cta && (
          <span className="mt-3 inline-flex w-fit items-center gap-2 text-sm font-semibold">
            {cta}
            <span
              aria-hidden
              className={`transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
            >
              →
            </span>
          </span>
        )}
      </div>
    </div>
  );
}

export function ProductSection() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!demoOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDemoOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [demoOpen]);

  return (
    <section id="product" className="relative z-[3] flex min-h-screen flex-col justify-center bg-ink px-8 py-20 text-white sm:px-10 lg:px-16">
      <Reveal className="mx-auto w-full max-w-[1600px]">
        <div className="max-w-2xl">
          <p className="text-base font-semibold uppercase tracking-wider text-accent-bright">
            The solution
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            The AIR Monitor
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/60">
            One patented instrument replaces a room full of equipment and a
            team of specialists. It turns particulate matter into
            actionable, source-level data.
          </p>
        </div>

        {/* Desktop: interactive hover-expanding column accordion */}
        <div
          className="mt-14 hidden h-[420px] gap-1 overflow-hidden md:flex"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {FEATURES.map((feature, i) => (
            <AccordionColumn
              key={feature.label}
              label={feature.label}
              word={feature.word}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              isHovered={hoveredIndex === i}
              isDimmed={hoveredIndex !== null && hoveredIndex !== i}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => {}}
            />
          ))}
          <AccordionColumn
            label="06"
            word="Explore"
            title="See it in action"
            description="Switch pollution sources and watch the composition breakdown update."
            color={DEMO_TILE_COLOR}
            cta="Launch demo"
            onClick={() => setDemoOpen(true)}
            isHovered={hoveredIndex === 5}
            isDimmed={hoveredIndex !== null && hoveredIndex !== 5}
            onHoverStart={() => setHoveredIndex(5)}
            onHoverEnd={() => {}}
          />
        </div>

        {/* Mobile: simple stacked list, no hover needed */}
        <div className="mt-14 flex flex-col divide-y divide-white/10 border-y border-white/10 md:hidden">
          {FEATURES.map((feature) => (
            <div key={feature.label} className="flex gap-4 py-6">
              <span className="text-2xl font-extrabold" style={{ color: feature.color }}>
                {feature.label}
              </span>
              <div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-1 text-base leading-relaxed text-white/55">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setDemoOpen(true)}
            className="flex gap-4 py-6 text-left"
          >
            <span className="text-2xl font-extrabold" style={{ color: DEMO_TILE_COLOR }}>
              06
            </span>
            <div>
              <h3 className="text-lg font-semibold">See it in action</h3>
              <p className="mt-1 text-base leading-relaxed text-white/55">
                Switch pollution sources and watch the composition breakdown
                update.
              </p>
              <span
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: DEMO_TILE_COLOR }}
              >
                Launch demo →
              </span>
            </div>
          </button>
        </div>
      </Reveal>

      {demoOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setDemoOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-ink p-8 ring-1 ring-white/10 sm:p-10"
          >
            <button
              type="button"
              onClick={() => setDemoOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center text-xl text-white/50 hover:text-white"
            >
              ✕
            </button>
            <ProductDemo />
          </div>
        </div>
      )}
    </section>
  );
}
