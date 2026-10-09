/**
 * Smooth scroll, shared by the header navigation and the monogram.
 *
 * Why this exists rather than `scroll-behavior: smooth`:
 *
 *   The CSS property was already set, and it does animate. The problem is that
 *   Chrome caps its duration — a 5,000px jump takes about the same time as a
 *   300px hop, so long distances read as a hard cut rather than a movement.
 *   This animates the scroll itself with a duration that scales with distance.
 *
 * Behaviour:
 *   - duration grows with distance, clamped so it never feels slow
 *   - eased, not linear
 *   - aborts the moment the visitor takes over — the page must never fight the
 *     person using it. Listening for wheel/touchstart alone is not enough:
 *     dragging the scrollbar or pressing Space moves the page without firing
 *     either, so the real test is divergence — we know where we last put the
 *     page, and if it is no longer there, someone else moved it.
 *   - under `prefers-reduced-motion: reduce` it jumps straight there
 */

/** Scroll animation timing, in ms. Short hops stay snappy; long jumps get room. */
const MIN_DURATION = 380;
const MAX_DURATION = 950;
/** Pixels of travel that maps to the longest duration. */
const FULL_DISTANCE = 4000;
/** Below this many pixels the jump is imperceptible; skip the animation. */
const NEGLIGIBLE = 2;
/** How far the page may drift before we assume someone else is scrolling. */
const DRIFT_TOLERANCE = 3;

/** easeInOutCubic — slow to leave, slow to arrive. */
function ease(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function durationFor(distance: number): number {
  return Math.min(
    MAX_DURATION,
    MIN_DURATION + (distance / FULL_DISTANCE) * (MAX_DURATION - MIN_DURATION)
  );
}

/**
 * Animate the window to `destination` (absolute scrollY, in pixels).
 * Under reduced motion the page jumps there with no animation.
 */
export function animateScrollTo(destination: number): void {
  const start = window.scrollY;
  const distance = Math.abs(destination - start);

  if (prefersReducedMotion() || distance < NEGLIGIBLE) {
    window.scrollTo({ top: destination, behavior: "instant" });
    return;
  }

  const duration = durationFor(distance);

  let cancelled = false;
  let expected = start;

  const onScroll = () => {
    if (Math.abs(window.scrollY - expected) > DRIFT_TOLERANCE) cancelled = true;
  };
  const cancel = () => {
    cancelled = true;
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("wheel", cancel, { passive: true });
  window.addEventListener("touchstart", cancel, { passive: true });
  window.addEventListener("keydown", cancel);

  function cleanup() {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
    window.removeEventListener("keydown", cancel);
  }

  const startTime = performance.now();

  function step(now: number) {
    if (cancelled) {
      cleanup();
      return;
    }

    const progress = Math.min(1, (now - startTime) / duration);
    expected = start + (destination - start) * ease(progress);
    // "instant" each frame: without it the CSS scroll-behavior would try to
    // smooth every one of these writes and the motion would stutter.
    window.scrollTo({ top: expected, behavior: "instant" });

    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      cleanup();
    }
  }

  window.requestAnimationFrame(step);
}

/** How long the sticky header has to come off a scroll target's position. */
export function headerOffset(element: HTMLElement): number {
  // `scroll-mt-*` on the sections supplies this; read it rather than hard-code.
  const margin = parseFloat(getComputedStyle(element).scrollMarginTop);
  return Number.isFinite(margin) ? margin : 0;
}
