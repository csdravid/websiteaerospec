"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1400;
const TICK_MS = 30;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

// Counts up from 0 to the target value when scrolled into view. `value` is
// parsed into a leading number (e.g. "4.2") and a trailing suffix (e.g.
// "M"); the number's own decimal places are preserved throughout the count.
export function InstrumentReadout({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const decimals = match?.[1].includes(".") ? match[1].split(".")[1].length : 0;
  const suffix = match ? match[2] : "";

  const [display, setDisplay] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    let interval: ReturnType<typeof setInterval> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const startTime = performance.now();
        interval = setInterval(() => {
          const progress = Math.min((performance.now() - startTime) / DURATION_MS, 1);
          setDisplay(target * easeOutCubic(progress));
          if (progress >= 1 && interval) clearInterval(interval);
        }, TICK_MS);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (interval) clearInterval(interval);
    };
  }, [target]);

  return (
    <span ref={spanRef} className={`tabular-nums ${className}`}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
