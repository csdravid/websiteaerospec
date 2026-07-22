"use client";

import { useEffect, useRef, useState } from "react";

export type SectorId = "gov" | "industry" | "research" | "health";

export type SectorStat = {
  eyebrow: string;
  prefix: string;
  value: number;
  decimals: number;
  suffix: string;
  sub: string;
  footnote: string;
};

const MORPH_MS = 650;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function IndustryGraphic({
  activeId,
  stat,
  className = "",
  staticMode = false,
  subMinHeight,
}: {
  activeId: SectorId;
  stat: SectorStat;
  className?: string;
  /** Renders the final shape/values with no morph or count-up animation.
   *  Used for the offscreen copies IndustriesSection measures to pin the
   *  section's height — those never change sector, so animating them would
   *  just be wasted timers running forever underneath the visible page. */
  staticMode?: boolean;
  /** Pins the support sentence to the tallest of the 4 sectors' wrapped
   *  height, so all four sectors render at the same total block height
   *  instead of the shorter ones leaving dead space below a shared outer
   *  minHeight. Measured by IndustriesSection off the `data-sub` element in
   *  its offscreen copies. */
  subMinHeight?: number;
}) {
  const mountedRef = useRef(false);

  const [content, setContent] = useState({
    eyebrow: stat.eyebrow,
    sub: stat.sub,
    footnote: stat.footnote,
  });
  const [value, setValue] = useState(staticMode ? stat.value : 0);
  const [fading, setFading] = useState(false);

  // Swap the readout text with a brief fade, then count the headline number
  // up from zero — on first mount too, matching the instrument-reading feel
  // used elsewhere on the site.
  useEffect(() => {
    if (staticMode) return;
    let fadeTimer: ReturnType<typeof setTimeout> | undefined;
    let countInterval: ReturnType<typeof setInterval> | undefined;

    const startCount = () => {
      setContent({
        eyebrow: stat.eyebrow,
        sub: stat.sub,
        footnote: stat.footnote,
      });
      setValue(0);
      const start = performance.now();
      countInterval = setInterval(() => {
        const progress = Math.min((performance.now() - start) / MORPH_MS, 1);
        setValue(stat.value * easeOutCubic(progress));
        if (progress >= 1 && countInterval) clearInterval(countInterval);
      }, 30);
    };

    if (mountedRef.current) {
      setFading(true);
      fadeTimer = setTimeout(() => {
        setFading(false);
        startCount();
      }, 160);
    } else {
      mountedRef.current = true;
      startCount();
    }

    return () => {
      clearTimeout(fadeTimer);
      clearInterval(countInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  return (
    <div className={`w-[380px] max-w-full ${className}`}>
      <span
        className="text-lg font-semibold uppercase tracking-wider text-accent-bright transition-opacity duration-150"
        style={{ opacity: fading ? 0 : 1 }}
      >
        {content.eyebrow}
      </span>
      <div
        className="mt-4 text-7xl font-semibold leading-none tracking-tight tabular-nums text-white transition-opacity duration-150"
        style={{ opacity: fading ? 0 : 1 }}
      >
        {stat.prefix}
        {value.toFixed(stat.decimals)}
        {stat.suffix}
      </div>
      <p
        data-sub
        className="mt-4 max-w-[30ch] text-xl leading-relaxed text-white/60 transition-opacity duration-150"
        style={{ opacity: fading ? 0 : 1, minHeight: subMinHeight }}
      >
        {content.sub}
      </p>
      <p
        className="mt-4 text-sm tracking-wide text-white/30 transition-opacity duration-150"
        style={{ opacity: fading ? 0 : 1 }}
      >
        {content.footnote}
      </p>
    </div>
  );
}
