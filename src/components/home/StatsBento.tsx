/**
 * StatsBento — four verified figures plus the profile photo.
 *
 * This is the fastest credibility block on the site: a reader learns GPA,
 * project count, credential count, and experience count without reading a
 * paragraph. All four come from data files, never hard-coded here.
 *
 * The photo cell uses object-cover in a fixed aspect box so the current
 * landscape image and a future portrait image both fill correctly with no
 * layout change.
 */

import Image from "next/image";
import { stats } from "@/data/stats";
import { StatCard } from "@/components/ui/StatCard";

export function StatsBento() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} stat={stat} />
      ))}

      <div className="col-span-2 overflow-hidden rounded-[var(--radius-card)] border-2 border-border bg-surface shadow-[4px_4px_0_0_var(--color-accent)]">
        <div className="relative aspect-[16/6] w-full">
          <Image
            src="/profile.png"
            alt={`${"Ammar Hilmy Ramzy"} — profile photo`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
            priority
          />
        </div>
      </div>
    </div>
  );
}
