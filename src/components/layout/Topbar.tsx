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
import { profile } from "@/data/profile";
import { site } from "@/data/site";

export function Topbar() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-border bg-base/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-2">
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center font-mono text-[15px] font-bold tracking-tight text-text"
          aria-label={`${profile.name} — home`}
        >
          AH<span className="cursor-blink text-accent">_</span>
        </Link>

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

        <span className="inline-flex min-h-[36px] items-center gap-2 rounded-full border-2 border-border px-3 py-1">
          <span
            className="h-2 w-2 rounded-full bg-status"
            aria-hidden="true"
          />
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
            {profile.availability}
          </span>
        </span>
      </div>
    </header>
  );
}
