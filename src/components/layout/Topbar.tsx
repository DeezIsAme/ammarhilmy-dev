/**
 * Topbar — the ONLY floating element on this site.
 *
 * A reference site stacked four simultaneous floating layers and its nav dock
 * ended up covering the project cards. One sticky bar is the whole budget.
 *
 * The status dot uses a fixed green: it is a semantic status colour, not part
 * of the six-token palette, and it must read as "available" in every palette.
 */

import Link from "next/link";
import { site } from "@/data/site";
import { Download } from "@/components/ui/Icon";

export function Topbar() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-border bg-base/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-2">

        <nav aria-label="Main" className="hidden items-center gap-6 sm:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-[44px] items-center px-1 text-[14px] text-muted transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href="/cv/ammar-hilmy-ramzy-cv.pdf"
          download
          className="inline-flex min-h-[44px] items-center gap-2 rounded-[var(--radius-btn)] border-2 border-accent bg-accent px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-ink shadow-[4px_4px_0_0_var(--color-border)] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--color-border)]"
        >
          Download CV
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
