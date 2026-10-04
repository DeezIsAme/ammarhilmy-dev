/**
 * Hero — the front door. One <h1>, a rotating role line, a positioning
 * sentence, and two calls to action.
 *
 * Headline size is 56px: one of exactly three headline sizes used site-wide.
 * The paragraph is capped at ~62 characters per line for readability.
 */

import { ArrowUpRight, Download } from "@/components/ui/Icon";
import { profile } from "@/data/profile";
import { RoleRotator } from "@/components/home/RoleRotator";

export function Hero() {
  return (
    <section className="pt-14 pb-4">
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
    </section>
  );
}
