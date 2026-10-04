/**
 * NavLink — an in-page anchor that also works from other routes.
 *
 * Why this exists at all: with a plain <Link href="/#about">, Next.js performs a
 * soft navigation. When the click comes from another route (/about, /projects)
 * the URL updates and the hash is set, but the browser never scrolls to the
 * target — the document was already loaded when the fragment was applied.
 *
 * Why not `scroll-behavior: smooth` alone:
 *
 *   The CSS property was already set, and it does animate. The problem is that
 *   Chrome caps its duration — a 5,000px jump to "contact" takes about the same
 *   time as a 300px hop, so long distances read as a hard cut rather than a
 *   movement. This component animates the scroll itself with a duration that
 *   scales with distance, so a long jump is still legible as travel.
 *
 * Behaviour:
 *   - duration grows with distance, clamped so it never feels slow
 *   - eased, not linear
 *   - aborts the moment the visitor scrolls or wheels themselves — the page must
 *     never fight the person using it
 *   - under prefers-reduced-motion it jumps straight there, no animation
 *   - with JavaScript disabled the href still resolves, so the link degrades to
 *     a normal navigation plus a browser fragment jump
 */

"use client";

import { useRouter, usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

/** How long the route has to mount before the target can be found. ~1.2s at 60fps. */
const LOOKUP_ATTEMPTS = 72;
const LOOKUP_FRAME_MS = 16;

/** Scroll animation timing, in ms. Short hops stay snappy; long jumps get room. */
const MIN_DURATION = 380;
const MAX_DURATION = 950;
/** Pixels of travel that maps to the longest duration. */
const FULL_DISTANCE = 4000;

/** easeInOutCubic — slow to leave, slow to arrive. */
function ease(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** The sticky header sits above the target, so its height has to come off. */
function headerOffset(element: HTMLElement): number {
  // scroll-mt-20 on the sections supplies this; read it rather than hard-code.
  const margin = parseFloat(getComputedStyle(element).scrollMarginTop);
  return Number.isFinite(margin) ? margin : 0;
}

interface NavLinkProps {
  href: string; // e.g. "/#projects"
  className?: string;
  children: ReactNode;
}

export function NavLink({ href, className, children }: NavLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [path, hash = ""] = href.split("#");
  const target = hash.replace("#", "");
  const targetPath = path === "" ? "/" : path;

  function animateTo(element: HTMLElement) {
    const start = window.scrollY;
    const destination = start + element.getBoundingClientRect().top - headerOffset(element);

    if (prefersReducedMotion()) {
      window.scrollTo({ top: destination, behavior: "instant" });
      return;
    }

    const distance = Math.abs(destination - start);
    const duration = Math.min(
      MAX_DURATION,
      MIN_DURATION + (distance / FULL_DISTANCE) * (MAX_DURATION - MIN_DURATION)
    );

    // Stop the moment the visitor takes over, so the animation never argues
    // with a manual scroll.
    //
    // Listening for wheel/touchstart alone is not enough: dragging the scrollbar
    // or pressing Space/PageDown moves the page without firing either. So the
    // real test is divergence — we know where we last put the page, and if it
    // is no longer there, someone else moved it.
    let cancelled = false;
    let expected = start;

    const onScroll = () => {
      if (Math.abs(window.scrollY - expected) > 3) cancelled = true;
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

  function scrollToTarget(attempt = 0) {
    const element = document.getElementById(target);

    if (!element) {
      // The destination route may still be mounting; keep looking for a moment.
      if (attempt < LOOKUP_ATTEMPTS) {
        window.setTimeout(() => scrollToTarget(attempt + 1), LOOKUP_FRAME_MS);
      }
      return;
    }

    animateTo(element);
    // Keep the address bar honest without triggering another navigation.
    window.history.replaceState(null, "", `/${target ? "#" + target : ""}`);
  }

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    // Let modified clicks (new tab, middle click, download) behave normally.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }

    event.preventDefault();
    scrollToTarget();

    if (pathname !== targetPath) {
      router.push(targetPath);
    }
  }

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
