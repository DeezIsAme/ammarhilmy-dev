/**
 * ContactCards — the four ways to reach out.
 * Phone stays a WhatsApp link only; it is never embedded as machine-readable
 * data in the page (see the JSON-LD block in app/layout.tsx).
 */

import { profile } from "@/data/profile";
import { Card } from "@/components/ui/Card";
import { ContactIconMark } from "@/components/ui/Icon";

export function ContactCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {profile.contacts.map((contact) => (
        <Card key={contact.label} className="p-5">
          <a
            href={contact.href}
            target={contact.href.startsWith("http") ? "_blank" : undefined}
            rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex min-h-[44px] items-center gap-4"
          >
            <span
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-btn)] border-2 border-border text-accent"
              aria-hidden="true"
            >
              <ContactIconMark name={contact.icon} className="h-5 w-5" />
            </span>
            <span className="flex flex-col">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                {contact.label}
              </span>
              <span className="text-[15px] text-text">{contact.value}</span>
            </span>
          </a>
        </Card>
      ))}
    </div>
  );
}
