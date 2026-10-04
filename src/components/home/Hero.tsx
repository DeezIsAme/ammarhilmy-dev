/**
 * Hero — the front door.
 *
 * Layout: a two-column grid on desktop (text, then a 260px photo), collapsing to
 * one column on mobile with the photo first. One <h1>, a rotating role line, a
 * positioning sentence, and two calls to action.
 *
 * Headline size is 56px on desktop — one of exactly three headline sizes used
 * site-wide. The paragraph is capped at ~62 characters per line for readability.
 *
 * The photo uses object-cover inside a fixed square box, so a portrait or a
 * landscape file both fill correctly with no layout change.
 */

import Image from "next/image";
import { profile } from "@/data/profile";
import { ArrowUpRight, Download } from "@/components/ui/Icon";
import { RoleRotator } from "@/components/home/RoleRotator";

export function Hero() {
  return (
    <section className="grid items-center gap-8 pt-14 pb-4 lg:grid-cols-[1fr_260px]">
      <div>
        <h1 className="max-w-[18ch] text-[40px] leading-[0.95] font-bold tracking-tight text-text sm:text-[56px]">
          {profile.name}
        </h1>

        <div className="mt-5">
          <RoleRotator roles={profile.roles} />
        </div>

        <p className="mt-5 max-w-[62ch] text-[16px] leading-relaxed text-muted">
          {profile.summary}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-[var(--radius-btn)] border-2 border-accent bg-accent px-5 py-2.5 text-[14px] font-semibold text-ink shadow-[4px_4px_0_0_var(--color-border)] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--color-border)]"
          >
            View projects
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="/resume"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-[var(--radius-btn)] border-2 border-border px-5 py-2.5 text-[14px] font-semibold text-text shadow-[4px_4px_0_0_var(--color-accent)] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--color-accent)]"
          >
            Download CV
            <Download className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="order-first w-[180px] shrink-0 overflow-hidden rounded-[var(--radius-card)] border-2 border-border bg-surface shadow-[4px_4px_0_0_var(--color-accent)] lg:order-last lg:w-full">
        <div className="relative aspect-square w-full">
          <Image
            src="/profile.jpg"
            alt={`${profile.name} — profile photo`}
            fill
            sizes="260px"
            className="object-cover object-center"
            priority
          />
        </div>
      </div>
    </section>
  );
}
