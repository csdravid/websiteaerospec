"use client";

import { useEffect, useState } from "react";

const CATEGORIES = [
  { id: "organic", label: "Organic carbon", color: "#3987e5" },
  { id: "black", label: "Black carbon", color: "#008300" },
  { id: "sulfates", label: "Sulfates", color: "#d55181" },
  { id: "nitrates", label: "Nitrates", color: "#c98500" },
  { id: "metals", label: "Trace metals", color: "#199e70" },
] as const;

const SCENARIOS = [
  {
    id: "traffic",
    label: "Traffic exhaust",
    values: { organic: 30, black: 38, sulfates: 8, nitrates: 20, metals: 4 },
  },
  {
    id: "wildfire",
    label: "Wildfire smoke",
    values: { organic: 52, black: 25, sulfates: 10, nitrates: 8, metals: 5 },
  },
  {
    id: "industrial",
    label: "Industrial",
    values: { organic: 20, black: 12, sulfates: 34, nitrates: 8, metals: 26 },
  },
  {
    id: "construction",
    label: "Construction dust",
    values: { organic: 25, black: 8, sulfates: 12, nitrates: 15, metals: 40 },
  },
] as const;

export function ProductDemo() {
  const [activeId, setActiveId] = useState<(typeof SCENARIOS)[number]["id"]>(
    SCENARIOS[0].id,
  );
  const scenario = SCENARIOS.find((s) => s.id === activeId)!;

  // Bars start at 0 on mount (i.e. whenever the modal opens, since this
  // component unmounts on close) and draw in to their real values a frame
  // later, so the reading appears to be taken rather than shown pre-filled.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 20);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <p className="text-base font-semibold uppercase tracking-wider text-accent-bright">
        See it in action
      </p>
      <h3 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
        Source composition, identified automatically
      </h3>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-white/60">
        Illustrative AIR Monitor output. Switch sources and watch the
        composition breakdown update.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {SCENARIOS.map((s) => (
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
            {s.label}
          </button>
        ))}
      </div>

      <div className="mt-10 flex max-w-3xl flex-col gap-5">
        {CATEGORIES.map((cat) => {
          const value = scenario.values[cat.id];
          return (
            <div key={cat.id} className="flex items-center gap-4">
              <span className="w-36 shrink-0 text-base text-white/70">
                {cat.label}
              </span>
              <div className="h-2.5 flex-1 bg-white/10">
                <div
                  className="h-2.5 rounded-r-[4px] transition-all duration-500 ease-out"
                  style={{
                    width: `${ready ? value : 0}%`,
                    backgroundColor: cat.color,
                  }}
                />
              </div>
              <span className="w-12 shrink-0 text-right text-base font-semibold tabular-nums text-white">
                {value}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
