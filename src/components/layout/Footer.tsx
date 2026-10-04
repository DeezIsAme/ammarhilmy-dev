/**
 * Footer — mono logo, copyright, contact icons, availability pill.
 */

import Link from "next/link";
import { profile } from "@/data/profile";
import { ContactIconMark } from "@/components/ui/Icon";

export function Footer() {
  return (
    <footer className="mt-24 border-t-2 border-border">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[15px] font-bold text-text">
            AH<span className="cursor-blink text-accent">_</span>
          </span>
          <span className="text-[13px] text-muted">
            © {new Date().getFullYear()} {profile.name}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
            Reach me
          </span>
          {profile.contacts.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith("http") ? "_blank" : undefined}
              rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={contact.label}
              className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-btn)] border-2 border-border text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <ContactIconMark name={contact.icon} />
            </a>
          ))}
        </div>

        <Link
          href="/contact"
          className="inline-flex min-h-[44px] items-center gap-2 self-start rounded-full border-2 border-border px-3 py-1 sm:self-auto"
        >
          <span className="h-2 w-2 rounded-full bg-status" aria-hidden="true" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
            {profile.availability}
          </span>
        </Link>
      </div>
    </footer>
  );
}
