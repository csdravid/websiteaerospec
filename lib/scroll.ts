import type { MouseEvent } from "react";

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function smoothScrollTo(targetY: number, duration = 1400) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  const startTime = performance.now();

  function step() {
    const progress = Math.min((performance.now() - startTime) / duration, 1);
    window.scrollTo(0, startY + diff * easeInOutCubic(progress));
    if (progress < 1) setTimeout(step, 16);
  }

  step();
}

// Sections are `position: sticky`, so once scrolled past, they stay "stuck"
// at top:0 for the rest of the page (that's what drives the card-stack
// effect) — which means getBoundingClientRect()/offsetTop no longer reflect
// their true document position. Sum sibling heights instead, which reflects
// each section's own box size and isn't affected by sticky positioning.
function getStaticTop(el: HTMLElement) {
  let top = 0;
  let node = el.previousElementSibling as HTMLElement | null;
  while (node) {
    top += node.offsetHeight;
    node = node.previousElementSibling as HTMLElement | null;
  }
  return top;
}

export function handleNavClick(e: MouseEvent<HTMLAnchorElement>, href: string) {
  const id = href.replace("#", "");
  const target = document.getElementById(id);
  if (!target) return;
  e.preventDefault();
  smoothScrollTo(getStaticTop(target));
  history.pushState(null, "", href);
}

export function scrollToSection(
  id: string,
  onComplete?: () => void,
  duration = 1400,
) {
  const target = document.getElementById(id);
  if (!target) {
    onComplete?.();
    return;
  }
  const y = getStaticTop(target);
  if (duration <= 0) {
    window.scrollTo(0, y);
    onComplete?.();
    return;
  }
  smoothScrollTo(y, duration);
  if (onComplete) setTimeout(onComplete, duration);
}
