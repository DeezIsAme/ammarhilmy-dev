/**
 * Topbar — the ONLY floating element on this site.
 *
 * A reference site stacked four simultaneous floating layers and its nav dock
 * ended up covering the project cards. One sticky bar is the whole budget.
 *
 * Layout across breakpoints:
 *   - under `sm` — monogram on the left, Download CV on the right, nothing else.
 *     The nav links are hidden because four text links plus a button do not fit
 *     a phone without wrapping or shrinking below a comfortable tap target.
 *   - `sm` and up — monogram, then the nav, then the button.
 *
 * The monogram reads "AMMAR" and is set in the ZZZ System face, subset to the
 * three letters it needs. Uppercase is forced in the markup rather than left to
 * `text-transform`, because that face renders lowercase as full capitals anyway
 * — being explicit keeps the intent readable in the source.
 *
 * The status dot uses a fixed green: it is a semantic status colour, not part
 * of the six-token palette, and it must read as "available" in every palette.
 */

"use client";

import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { profile } from "@/data/profile";
import { site } from "@/data/site";
import { Download } from "@/components/ui/Icon";
import { NavLink } from "@/components/layout/NavLink";
import { animateScrollTo } from "@/lib/scroll";

export function Topbar() {
  const router = useRouter();
  const pathname = usePathname();

  /**
   * Clicking the monogram returns to the top of the page, animated.
   *
   * On a sub-route that is genuinely a navigation, so the router handles it and
   * the new page starts at the top. On the homepage the page is already there,
   * so we animate the scroll ourselves — letting Next.js re-navigate would
   * discard the current scroll position and the movement would never be seen.
   */
  function handleMonogramClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }

    if (pathname !== "/") {
      return; // let the router navigate normally
    }

    event.preventDefault();
    animateScrollTo(0);
    // Drop any section hash so the address bar matches where we actually are.
    window.history.replaceState(null, "", "/");
  }

  return (
    <header className="sticky top-0 z-40 border-b-2 border-border bg-base/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-4 py-2 sm:gap-4 sm:px-5">

        <a
          href="/"
          onClick={handleMonogramClick}
          aria-label={`${profile.name} — back to top`}
          className="monogram inline-flex min-h-[44px] shrink-0 items-center text-[15px] text-text transition-colors hover:text-accent sm:text-[17px]"
        >
          AMMAR
        </a>

        <nav aria-label="Main" className="hidden items-center gap-6 sm:flex">
          {site.nav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              className="inline-flex min-h-[44px] items-center px-1 text-[14px] text-muted transition-colors hover:text-accent"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Slightly smaller on phones so it does not crowd the monogram;
            unchanged from `sm` up, which is the size the request settled on. */}
        <a
          href="/cv/ammar-hilmy-ramzy-cv.pdf"
          download
          className="hover-zoom-sm inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-[var(--radius-btn)] border-2 border-accent bg-accent px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.04em] text-ink shadow-[3px_3px_0_0_var(--color-border)] sm:gap-2 sm:px-4 sm:text-[12px] sm:tracking-[0.06em] sm:shadow-[4px_4px_0_0_var(--color-border)]"
        >
          Download CV
          <Download className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
