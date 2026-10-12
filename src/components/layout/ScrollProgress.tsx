/**
 * ScrollProgress — a thin bar on the header's bottom edge showing how far down
 * the page the visitor has read.
 *
 * Behaviour, as specified:
 *   - on a fresh load, at the top, nothing is visible
 *   - as soon as scrolling starts, the bar grows from the left edge
 *   - at the very bottom of the page it spans the full width
 *
 * Implementation notes:
 *
 *   No React state. A scroll handler that calls setState would re-render the
 *   header on every frame of every scroll. The bar is written straight to the
 *   DOM through a ref instead, and the scroll listener is passive and coalesced
 *   through requestAnimationFrame so at most one write happens per frame.
 *
 *   No CSS transition either. A transition would lag behind the finger, and a
 *   scroll indicator's whole job is to track the scroll exactly. That also means
 *   there is nothing for `prefers-reduced-motion` to switch off — the bar is
 *   direct feedback on a gesture the visitor is already making, not decoration
 *   playing on its own.
 *
 *   The maximum is recomputed on every update rather than cached, so a page
 *   whose height changes after load (an image settling, a filter narrowing the
 *   project list) still reports the right fraction. It is also recomputed when
 *   the route changes, because a client-side navigation swaps the content and
 *   resets the scroll position.
 *
 *   A page shorter than the viewport cannot scroll, so there is no progress to
 *   show and the bar stays hidden rather than sitting permanently at 100%.
 */

"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!barRef.current) return;

    let frame = 0;

    function update() {
      frame = 0;

      // Re-read the ref inside the frame callback rather than capturing it:
      // the closure outlives the effect body, so a captured node could be
      // stale, and TypeScript is right to refuse the narrowing there.
      const bar = barRef.current;
      if (!bar) return;

      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;

      if (max <= 0) {
        bar.style.opacity = "0";
        bar.style.transform = "scaleX(0)";
        return;
      }

      // Clamped: iOS rubber-banding reports a negative scrollY at the top and
      // an overshoot past the bottom.
      const ratio = Math.min(1, Math.max(0, window.scrollY / max));

      // Nothing at the very top — the request is that the bar is invisible
      // until the visitor actually starts scrolling.
      bar.style.opacity = ratio > 0 ? "1" : "0";
      bar.style.transform = `scaleX(${ratio})`;
    }

    function schedule() {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] overflow-hidden"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-accent"
        style={{ transform: "scaleX(0)", opacity: 0 }}
      />
    </div>
  );
}
