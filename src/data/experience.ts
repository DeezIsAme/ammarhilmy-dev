/**
 * Experience — exactly two organisations (WEB-PORTO-SPEC.md §6.4).
 *
 * Excluded by decision: Karang Taruna FORCA 22, and any Comifuro attendance
 * figure (the ~40,000 claim had only an X post and a verbal statement behind
 * it). Responsibilities are taken from IDEA.md §3.2 and must not be padded.
 */

export interface ExperienceRole {
  title: string;
  period: string;
}

export interface ExperienceEntry {
  org: string;
  /** Optional human-readable context, e.g. "Comic Frontier — 4 cycles". */
  context?: string;
  location: string;
  roles: ExperienceRole[];
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    org: "Language Development Center (Pusat Pengembangan Bahasa), UIN Jakarta",
    context: "Language testing operations",
    location: "Tangerang Selatan, Banten",
    roles: [
      { title: "Receptionist & IT Support", period: "September 2025 – December 2025" },
      { title: "Proctor", period: "November 2025 – December 2025" },
    ],
    bullets: [
      "Front-desk communication for 30+ inquiries per day, assisting students and external participants with clear, structured information delivery.",
      "Collaboration with internal staff to streamline administrative workflows for recurring operational tasks.",
      "Proctoring of language tests with dozens of participants per session, complying with testing procedures and minimising disruptions.",
      "Managing and maintaining 20+ participant records per test cycle, maintaining high data accuracy across every assessment cycle.",
      "Execution of multiple standardised test sessions per week, supporting operational flow and reporting.",
    ],
  },
  {
    org: "Comifuro (Comic Frontier)",
    context: "4 event cycles — Comifuro 19, 20, 21, 22",
    location: "Tangerang, Banten",
    roles: [{ title: "Ticketing Staff & Crowd Management", period: "November 2024 – May 2026" }],
    bullets: [
      "Entrance operations across large-scale event cycles: ticket validation, entry procedures, visitor belongings checks, and event-regulation compliance.",
      "Visitor inquiries and ticket-related issues handled directly, with timely resolution under pressure.",
      "Coordination with frontliner and cross-functional teams on crowd flow and operational issues.",
      "Communication with visitors from 5+ countries — cross-cultural communication and customer service.",
      "Adaptability to changing crowd conditions and unexpected operational challenges.",
    ],
  },
];
