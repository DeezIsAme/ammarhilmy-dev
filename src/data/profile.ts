/**
 * Profile — the single source of truth for identity and contact details.
 * Content rules live in WEB-PORTO-SPEC.md §6.8 and IDEA.md §2.
 */

export type ContactIcon = "mail" | "linkedin" | "github" | "whatsapp";

export interface Contact {
  label: string;
  value: string;
  href: string;
  icon: ContactIcon;
}

export interface Profile {
  name: string;
  headline: string;
  location: string;
  availability: string;
  /** One-line positioning statement shown in the hero. */
  summary: string;
  /**
   * Rotating role line. All three are honest: front-end is the verified
   * professional role; "Web Developer" is the wider verified skill set;
   * AI/embedded is verified project work framed as exploration.
   */
  roles: string[];
  contacts: Contact[];
}

export const profile: Profile = {
  name: "Ammar Hilmy Ramzy",
  headline: "Front-End Developer",
  location: "Tangerang Selatan, Banten, Indonesia",
  availability: "Open to work",
  summary:
    "Informatics Engineering graduate who builds accessible, responsive web interfaces with Laravel, Blade, Alpine.js, and Tailwind CSS — with project work in AI/LLM fine-tuning and embedded systems.",
  roles: ["Front-End Developer", "Web Developer", "AI & Embedded Explorer"],
  contacts: [
    {
      label: "Email",
      value: "ammarhilmy35@gmail.com",
      href: "mailto:ammarhilmy35@gmail.com",
      icon: "mail",
    },
    {
      label: "LinkedIn",
      value: "ammar-hilmy-ramzy",
      href: "https://linkedin.com/in/ammar-hilmy-ramzy-ab984424a/",
      icon: "linkedin",
    },
    {
      label: "GitHub",
      value: "DeezIsAme",
      href: "https://github.com/DeezIsAme",
      icon: "github",
    },
    {
      label: "WhatsApp",
      value: "Chat on WhatsApp",
      href: "https://wa.me/6282125367797",
      icon: "whatsapp",
    },
  ],
};
