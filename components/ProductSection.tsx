"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ProductDemo } from "./ProductDemo";
import { Reveal } from "./Reveal";
import { useModalLock } from "@/lib/useModalLock";
import { scrollToSection } from "@/lib/scroll";

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

// `useLayoutEffect` is a no-op (with a dev warning) during SSR, so fall back to
// `useEffect` on the server; on the client it always resolves to the real
// `useLayoutEffect`. See the comment on the row-measuring effect below for why
// the synchronous timing matters here.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

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
  contentWidth,
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
  /** Fixed pixel width for the expanded title/description block, matching
   *  the panel's fully-expanded (EXPANDED_BASIS) width. Passing a fixed
   *  width here — instead of letting the block inherit the width of its
   *  (currently animating) flex-basis parent — means the text's wrap width
   *  never changes during the resize transition, so it can be revealed
   *  (via the column's overflow-hidden) as soon as it fades in without any
   *  visible reflow/jump. Undefined until measured (see
   *  useIsomorphicLayoutEffect below — this is set synchronously before the
   *  first paint, so in practice a real hover can never observe it
   *  undefined). The wrapper below anchors via `left-6` + this explicit
   *  width only (no `right-6`) so there's no competing constraint to
   *  resolve: the box's width is unambiguously this fixed value. */
  contentWidth?: number;
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

      {/* Expanded state: the number stays pinned at the top, at the same
          position it holds in the collapsed state, so it lines up with the
          "01"-style numbers on every other (still-collapsed) column.

          The title+description block is intentionally NOT anchored as one
          bottom-pinned flex group anymore — that was the original bug: a
          taller description pushed the title up away from where the
          collapsed word sits. Instead the block is pinned via `bottom-8`,
          the exact same 32px (py-8) inset the collapsed word's own bottom
          edge sits at — so the description's last line lands flush with
          where the word sits, rather than the title's top. Since every
          description wraps to exactly 2 lines at the expanded width, this
          block's height is constant across all six columns, so the title's
          top position ends up constant too as a side effect.

          Fade-in no longer waits for the 500ms flex-basis resize to
          finish: `contentWidth` locks this block's wrap width to the
          panel's fully-expanded width regardless of the panel's current
          (animating) width, so the text's line-wrapping never changes
          mid-resize — only how much of it is visible, via the column's
          overflow-hidden. That removes the need for the old delay. */}
      <div
        className={`absolute inset-0 flex flex-col px-6 pt-8 transition-opacity ease-out ${
          isHovered ? "opacity-100 duration-150" : "opacity-0 duration-150"
        }`}
      >
        <span className="text-2xl font-extrabold">{label}</span>
        <div
          className="absolute left-6 bottom-8"
          style={contentWidth ? { width: contentWidth } : undefined}
        >
          <h3 className="text-xl font-semibold leading-none">{title}</h3>
          <p className="mt-1 text-base text-white/80">
            {description}
            {cta && (
              <>
                {" "}
                <span className="inline-flex items-center gap-1 font-semibold whitespace-nowrap">
                  {cta}
                  <span
                    aria-hidden
                    className={`transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
                  >
                    →
                  </span>
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ProductSection() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedContentWidth, setExpandedContentWidth] = useState<number>();
  const rowRef = useRef<HTMLDivElement>(null);

  useModalLock(demoOpen, setDemoOpen);

  const openDemo = () => scrollToSection("product", () => setDemoOpen(true), 0);

  // Measure the accordion row's own (static) width so each column's
  // expanded title/description block can be given a fixed width matching
  // EXPANDED_BASIS, independent of any single column's currently-animating
  // flex-basis. See the contentWidth prop comment on AccordionColumn.
  //
  // This runs in useLayoutEffect (not useEffect) deliberately: useEffect
  // fires asynchronously after the browser paints, which leaves a real
  // (if brief) window after mount where contentWidth is still undefined —
  // during that window the wrapper's style is `undefined`, so it falls
  // back to being sized by its (unhovered, narrow) flex parent. If a hover
  // landed inside that window, `AccordionColumn` would render initially
  // without a fixed width and then "snap" to one once this effect finally
  // ran, i.e. exactly the squeeze-then-release bug this mechanism exists
  // to prevent. useLayoutEffect runs synchronously right after DOM
  // mutations but before paint, so contentWidth is always populated before
  // the browser ever shows a frame — and thus before any hover event could
  // possibly fire against it.
  useIsomorphicLayoutEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const CONTENT_PADDING_X = 24 * 2; // px-6 on each side of the expanded panel
    const measure = () => {
      setExpandedContentWidth(
        row.clientWidth * (EXPANDED_BASIS / 100) - CONTENT_PADDING_X
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    return () => observer.disconnect();
  }, []);

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
          ref={rowRef}
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
              contentWidth={expandedContentWidth}
            />
          ))}
          <AccordionColumn
            label="06"
            word="Explore"
            title="See it in action"
            description="Switch pollution sources and watch the composition breakdown update."
            color={DEMO_TILE_COLOR}
            cta="Launch demo"
            onClick={openDemo}
            isHovered={hoveredIndex === 5}
            isDimmed={hoveredIndex !== null && hoveredIndex !== 5}
            onHoverStart={() => setHoveredIndex(5)}
            onHoverEnd={() => {}}
            contentWidth={expandedContentWidth}
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
            onClick={openDemo}
            className="flex gap-4 py-6 text-left"
          >
            <span className="text-2xl font-extrabold" style={{ color: DEMO_TILE_COLOR }}>
              06
            </span>
            <div>
              <h3 className="text-lg font-semibold">See it in action</h3>
              <p className="mt-1 text-base leading-relaxed text-white/55">
                Switch pollution sources and watch the composition breakdown
                update.{" "}
                <span
                  className="inline-flex items-center gap-1 font-semibold whitespace-nowrap"
                  style={{ color: DEMO_TILE_COLOR }}
                >
                  Launch demo →
                </span>
              </p>
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
