"use client";

import { useEffect, useRef, useState } from "react";

// A stylized IR absorption trace: a flat baseline with a few sharp downward
// peaks, evoking the wavenumber scans the AIR Monitor actually produces —
// not a decorative wave.
const PATH =
  "M0,50 L120,50 L134,18 L142,82 L152,50 L280,50 L296,10 L306,90 L318,50 L430,50 L444,30 L452,70 L462,50 L600,50";

export function SpectralTrace({ className = "" }: { className?: string }) {
  const pathRef = useRef<SVGPathElement>(null);
  const [drawn, setDrawn] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    const length = el.getTotalLength();
    el.style.strokeDasharray = `${length}`;
    el.style.strokeDashoffset = `${length}`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => setDrawn(true));
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      viewBox="0 0 600 100"
      preserveAspectRatio="none"
      aria-hidden
      className={className}
    >
      <path
        ref={pathRef}
        d={PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        onTransitionEnd={() => setSettled(true)}
        style={{ strokeDashoffset: drawn ? 0 : undefined }}
        className={`transition-[stroke-dashoffset] duration-[1800ms] ease-out ${
          settled ? "animate-spectral-jitter" : ""
        }`}
      />
    </svg>
  );
}
