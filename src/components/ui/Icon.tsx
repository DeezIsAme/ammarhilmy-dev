/**
 * Icons — small inline SVGs, no icon library.
 *
 * These were originally imported from `lucide-react`. Two reasons they are
 * inlined instead:
 *   1. The library was reaching a client bundle for a handful of icons.
 *   2. Nine icons do not justify a dependency that has to be updated forever.
 *
 * Every icon is a plain <svg> sized by CSS. `aria-hidden` is set on the SVG and
 * the accessible name comes from surrounding text or the parent's aria-label.
 */

import type { ContactIcon } from "@/data/profile";

type IconProps = { className?: string };

const base = (className: string) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className,
  "aria-hidden": true as const,
});

/* ---------- UI icons (stroke) ---------- */

export const ArrowUpRight = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base(className)}>
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
);

export const ArrowRight = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base(className)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ArrowLeft = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base(className)}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
);

export const Download = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base(className)}>
    <path d="M12 3v12M7 11l5 5 5-5M5 21h14" />
  </svg>
);

export const ExternalLink = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base(className)}>
    <path d="M14 4h6v6M20 4l-8 8M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </svg>
);

export const FileText = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base(className)}>
    <path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7zM14 3v4h4M9 13h6M9 17h4" />
  </svg>
);

/* ---------- Brand icons (filled) ---------- */

export const Mail = ({ className = "h-4 w-4" }: IconProps) => (
  <svg {...base(className)} strokeWidth={1.8}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const GitHub = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 .5C5.73.5.9 5.33.9 11.6c0 4.9 3.17 9.06 7.57 10.53.55.1.75-.24.75-.53v-1.9c-3.08.67-3.73-1.3-3.73-1.3-.5-1.29-1.23-1.63-1.23-1.63-1-.69.08-.68.08-.68 1.11.08 1.7 1.14 1.7 1.14.99 1.69 2.59 1.2 3.22.92.1-.72.39-1.2.7-1.48-2.46-.28-5.05-1.23-5.05-5.48 0-1.21.43-2.2 1.14-2.98-.11-.28-.49-1.4.11-2.92 0 0 .93-.3 3.05 1.14a10.5 10.5 0 0 1 5.56 0c2.12-1.44 3.05-1.14 3.05-1.14.6 1.52.22 2.64.11 2.92.71.78 1.14 1.77 1.14 2.98 0 4.26-2.6 5.2-5.07 5.47.4.35.76 1.03.76 2.08v3.08c0 .29.2.64.76.53a11.1 11.1 0 0 0 7.56-10.53C23.1 5.33 18.27.5 12 .5z" />
  </svg>
);

export const LinkedIn = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
  </svg>
);

export const WhatsApp = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.15-.15.32-.37.47-.55.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.07 2.88 1.22 3.08.15.2 2.1 3.36 5.1 4.58 2.99 1.22 3.06.82 3.61.77.55-.05 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35zM12.05 21.8h-.01a9.8 9.8 0 0 1-4.99-1.37l-.36-.21-3.71.97.99-3.62-.23-.37a9.78 9.78 0 0 1-1.5-5.22c0-5.41 4.41-9.81 9.83-9.81a9.75 9.75 0 0 1 6.94 2.88 9.72 9.72 0 0 1 2.88 6.94c0 5.41-4.42 9.81-9.84 9.81zM20.5 3.49A11.75 11.75 0 0 0 12.05 0C5.55 0 .26 5.28.26 11.78c0 2.08.54 4.1 1.58 5.89L.16 24l6.5-1.7a11.76 11.76 0 0 0 5.39 1.37h.01c6.5 0 11.79-5.28 11.79-11.78 0-3.15-1.23-6.11-3.45-8.34z" />
  </svg>
);

/* ---------- Dispatch used by contact cards and the footer ---------- */

export function ContactIconMark({ name, className }: { name: ContactIcon; className?: string }) {
  switch (name) {
    case "mail":
      return <Mail className={className} />;
    case "linkedin":
      return <LinkedIn className={className} />;
    case "github":
      return <GitHub className={className} />;
    case "whatsapp":
      return <WhatsApp className={className} />;
  }
}
