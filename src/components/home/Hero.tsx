/**
 * Hero — the front door.
 *
 * One grid with explicit placement, so a single <Image> serves both
 * arrangements instead of the photo being rendered twice and hidden by CSS.
 *
 *   mobile (< lg)                desktop (>= lg)
 *   +---------------------+      +-----------------+--------+
 *   | name  (spans 2)     |      | name            |        |
 *   | role+summary | photo|      | role + summary  | photo  |
 *   | buttons (spans 2)   |      | buttons         |        |
 *   +---------------------+      +-----------------+--------+
 *
 * The photo column is 36% on mobile so it scales with the viewport rather than
 * sitting at a fixed width on a 320px screen, and a fixed 260px from `lg`.
 *
 * Headline is 40px on mobile and 52px from `sm` — one of exactly three headline
 * sizes used site-wide. The paragraph is capped at ~62 characters per line for
 * readability, and steps down to 15px on mobile where its column is narrower.
 */

import Image from "next/image";
import { profile } from "@/data/profile";
import { ArrowUpRight, Download } from "@/components/ui/Icon";
import { RoleRotator } from "@/components/home/RoleRotator";

export function Hero() {
  return (
    <section
      className="grid grid-cols-[minmax(0,1fr)_36%] items-start gap-x-4 pt-14 pb-4
                 lg:grid-cols-[1fr_260px] lg:items-center lg:gap-x-8"
    >
      <h1 className="col-span-2 col-start-1 row-start-1 max-w-[24ch] text-[40px] leading-[1.02] font-bold tracking-[0.01em] text-text sm:text-[52px] lg:col-span-1">
        {profile.name}
      </h1>

      <div className="col-start-1 row-start-2 mt-5 min-w-0">
        <RoleRotator roles={profile.roles} />

        <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-muted lg:mt-5 lg:text-[16px]">
          {profile.summary}
        </p>
      </div>

      {/* Two equal columns on a phone, auto width from `sm` up.
          The wireframe shows the buttons side by side. At their desktop size
          (14px text, 20px padding) the pair needs 370px, but a 375px phone only
          has 335px to give — so on mobile they shrink to 13px text with 12px
          padding and share the row evenly. That keeps them side by side at any
          width instead of collapsing to a stack below some breakpoint. */}
      <div className="col-span-2 col-start-1 row-start-3 mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center lg:col-span-1 lg:mt-8">
        <a
          href="#projects"
          className="hover-zoom-sm inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-[var(--radius-btn)] border-2 border-accent bg-accent px-3 py-2.5 text-[13px] font-semibold text-ink shadow-[4px_4px_0_0_var(--color-border)] sm:gap-2 sm:px-5 sm:text-[14px]"
        >
          View projects
          <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </a>
        <a
          href="/resume"
          className="hover-zoom-sm inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-[var(--radius-btn)] border-2 border-border px-3 py-2.5 text-[13px] font-semibold text-text shadow-[4px_4px_0_0_var(--color-accent)] sm:gap-2 sm:px-5 sm:text-[14px]"
        >
          Download CV
          <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
        </a>
      </div>

      {/* Frame follows the photo's own ratio (3:4, a standard formal-photo
          format) rather than forcing it into a square. `object-cover` on a
          square frame had to cut 241px off the height of a 1024x1365 portrait,
          which took the top of the head with it. To go back to a square frame,
          change this to `aspect-square` — the photo would need cropping to 1:1
          first. On desktop the photo spans the three text rows and is centred;
          on mobile it sits beside the role line and description. */}
      <div className="hover-zoom col-start-2 row-start-2 mt-5 w-full overflow-hidden rounded-[var(--radius-card)] border-2 border-border bg-surface shadow-[4px_4px_0_0_var(--color-accent)] lg:row-span-3 lg:row-start-1 lg:mt-0">
        <div className="relative aspect-[3/4] w-full">
          <Image
            src="/profile.jpg"
            alt={`${profile.name} — profile photo`}
            fill
            sizes="(max-width: 1023px) 36vw, 260px"
            className="object-cover object-center"
            priority
          />
        </div>
      </div>
    </section>
  );
}
