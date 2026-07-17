"use client";

import { useEffect, useRef, useState } from "react";

type Particle = {
  key: number;
  top: number;
  left: number;
  size: number;
  opacity: number;
  dx: number;
  dy: number;
  duration: number;
  delay: number;
};

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    key: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 2 + Math.random() * 3,
    opacity: 0.12 + Math.random() * 0.22,
    dx: (Math.random() - 0.5) * 44,
    dy: (Math.random() - 0.5) * 44,
    duration: 6 + Math.random() * 7,
    delay: Math.random() * 6,
  }));
}

const RADIUS = 140;
const STRENGTH = 42;

export function ParticleField() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const basePositions = useRef<{ x: number; y: number }[]>([]);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    setParticles(generateParticles(48));
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || particles.length === 0) return;

    const computeBasePositions = () => {
      const rect = container.getBoundingClientRect();
      basePositions.current = particles.map((p) => ({
        x: (p.left / 100) * rect.width,
        y: (p.top / 100) * rect.height,
      }));
    };
    computeBasePositions();

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onWindowLeave = (e: MouseEvent) => {
      if (!e.relatedTarget) mouse.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("resize", computeBasePositions);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("mouseout", onWindowLeave);

    let rafId: number;
    const tick = () => {
      const { x: mx, y: my } = mouse.current;
      dotRefs.current.forEach((el, i) => {
        if (!el) return;
        const base = basePositions.current[i];
        if (!base) return;
        const dx = base.x - mx;
        const dy = base.y - my;
        const dist = Math.hypot(dx, dy);
        if (dist < RADIUS) {
          const force = (1 - dist / RADIUS) * STRENGTH;
          const angle = Math.atan2(dy, dx);
          el.style.transform = `translate(${Math.cos(angle) * force}px, ${Math.sin(angle) * force}px)`;
        } else {
          el.style.transform = "";
        }
      });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", computeBasePositions);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mouseout", onWindowLeave);
    };
  }, [particles]);

  return (
    <div ref={containerRef} aria-hidden className="absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={p.key}
          ref={(el) => {
            dotRefs.current[i] = el;
          }}
          className="absolute transition-transform duration-300 ease-out"
          style={{ top: `${p.top}%`, left: `${p.left}%` }}
        >
          <span
            className="block animate-particle-drift rounded-full bg-ink"
            style={
              {
                width: p.size,
                height: p.size,
                opacity: p.opacity,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                "--dx": `${p.dx}px`,
                "--dy": `${p.dy}px`,
              } as React.CSSProperties
            }
          />
        </div>
      ))}
    </div>
  );
}
