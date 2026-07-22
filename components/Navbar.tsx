"use client";

import { useEffect, useRef, useState } from "react";
import { handleNavClick } from "@/lib/scroll";
import { AerospecWordmark } from "@/components/AerospecWordmark";

const NAV_LINKS = [
  { href: "#problem", label: "Problem" },
  { href: "#product", label: "Product" },
  { href: "#impact", label: "Impact" },
  { href: "#industries", label: "Industries" },
  { href: "#why-us", label: "Why us" },
  { href: "#team", label: "Team" },
  { href: "#journey", label: "Journey" },
];

function BoldWaveLabel({ text }: { text: string }) {
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const containerRect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;

    letterRefs.current.forEach((el) => {
      if (!el) return;
      const letterRect = el.getBoundingClientRect();
      const letterCenter = letterRect.left - containerRect.left + letterRect.width / 2;
      const distance = Math.abs(mouseX - letterCenter);
      el.style.fontWeight = distance < 10 ? "800" : distance < 20 ? "700" : "";
    });
  };

  const handleMouseLeave = () => {
    letterRefs.current.forEach((el) => {
      if (el) el.style.fontWeight = "";
    });
  };

  return (
    <span
      className="inline-block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            letterRefs.current[i] = el;
          }}
          className="inline-block"
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-8 pt-8 sm:px-10 sm:pt-10 lg:px-16">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between gap-3">
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, "#top")}
          className={`flex h-10 items-center rounded-md px-3 transition-all duration-300 ${
            scrolled
              ? "bg-white/40 shadow-sm ring-1 ring-white/50 backdrop-blur-xl"
              : "bg-transparent"
          }`}
        >
          <AerospecWordmark
            className={`h-[23px] w-auto translate-y-[2px] transition-colors duration-300 ${
              scrolled ? "text-ink" : "text-white"
            }`}
          />
        </a>

        <ul
          className={`hidden h-10 items-center gap-1 rounded-md px-3 shadow-sm ring-1 backdrop-blur-xl transition-all duration-300 md:flex ${
            scrolled
              ? "bg-white/40 ring-white/50"
              : "bg-white/95 ring-black/5"
          }`}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="inline-block rounded-md px-4 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
              >
                <BoldWaveLabel text={link.label} />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, "#contact")}
          className={`hidden h-10 items-center rounded-md px-5 text-sm font-bold text-ink shadow-sm ring-1 backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] active:scale-95 md:flex ${
            scrolled
              ? "bg-white/40 ring-white/50 hover:bg-white/60"
              : "bg-white/95 ring-black/5 hover:bg-white"
          }`}
        >
          Contact us
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-md bg-white/95 shadow-sm ring-1 ring-black/5 backdrop-blur-md md:hidden"
        >
          <span
            className={`h-px w-5 bg-ink transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-5 bg-ink transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-[1600px] rounded-xl bg-white/95 px-6 py-4 shadow-sm ring-1 ring-black/5 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    setOpen(false);
                    handleNavClick(e, link.href);
                  }}
                  className="text-sm font-semibold text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={(e) => {
                  setOpen(false);
                  handleNavClick(e, "#contact");
                }}
                className="inline-block rounded-md bg-ink px-5 py-2.5 text-sm font-bold text-white transition-transform duration-200 active:scale-95"
              >
                Contact us
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
