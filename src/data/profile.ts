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
  /** Working arrangement, stated once and reused by the glance and contact pages. */
  workplace: string;
  /** One-line positioning statement shown in the hero. */
  summary: string;
  /**
   * Rotating role line. Both are honest: "Web Developer" is the verified
   * professional skill set; data & AI is verified project work framed as
   * enthusiasm rather than a claimed job title. The interface-level work is
   * stated in `glance` instead of being carried as a job title — see IDEA.md
   * §6 on role accuracy.
   */
  roles: string[];
  contacts: Contact[];
  /**
   * The introduction shown in the "At a glance" section.
   *
   * Deliberately factual rather than motivational. Every sentence here must be
   * traceable to IDEA.md §3; nothing is claimed as expertise that the projects
   * or the thesis do not evidence.
   */
  glance: {
    lead: string;
    paragraphs: string[];
    /** The three areas the work actually spans, labelled as areas worked across. */
    tracks: string[];
  };
}

export const profile: Profile = {
  name: "Ammar Hilmy Ramzy",
  headline: "Web Developer",
  location: "Tangerang Selatan, Banten, Indonesia",
  availability: "Open to work",
  workplace: "Open to on-site, hybrid, and remote arrangements",
  summary:
    "Informatics Engineering graduate who builds accessible, responsive web applications with Laravel, Blade, Alpine.js, and Tailwind CSS — with project work in AI/LLM fine-tuning and data.",
  roles: ["Web Developer", "Data & AI Enthusiast"],
  glance: {
    lead: "Web developer, four verified projects, three different problem domains.",
    paragraphs: [
      "I am an Informatics Engineering graduate from UIN Syarif Hidayatullah Jakarta. I build web applications in Laravel, Blade, Alpine.js, and Tailwind CSS. In both Laravel projects I worked on the interface layer alongside a backend teammate rather than owning the server side — and the server side is what I am working toward next.",
      "The projects below are the evidence. A cooperative financial system covering transactions, savings, and loans; a hackathon AI agent that streams its execution steps to a live workspace panel; a fine-tuned LLaMA 3.1 model for English test question generation, written up as an undergraduate thesis; and an ESP32 controller that reads sensors and drives a heater.",
      "Three of those sit outside web development, and that is deliberate. Building them taught me things the web stack alone would not: how a streaming protocol behaves when state gets messy, how a model's metrics actually describe its output, and how much of the work is deciding what the data is even allowed to say.",
    ],
    tracks: ["Web development", "AI / LLM", "Data engineering"],
  },
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
