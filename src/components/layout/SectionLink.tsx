/**
 * SectionLink — a "see the full page" link at the end of a homepage section.
 *
 * The topbar now scrolls to sections rather than navigating to routes, so the
 * detail pages (/about, /certifications) would otherwise have no inbound link
 * anywhere on the site — reachable only by typing a URL. This component keeps
 * them discoverable while leaving the topbar purely in-page.
 */

import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icon";

interface SectionLinkProps {
  href: string;
  label: string;
}

export function SectionLink({ href, label }: SectionLinkProps) {
  return (
    <div className="mt-6">
      <Link
        href={href}
        className="inline-flex min-h-[44px] items-center gap-2 font-mono text-[12px] uppercase tracking-wider text-accent hover:underline"
      >
        {label}
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </div>
  );
}
