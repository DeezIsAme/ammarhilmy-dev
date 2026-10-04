/**
 * Certifications — 11 featured + 5 additional = 16 entries (WEB-PORTO-SPEC.md §6.3).
 *
 * MANDATORY LABELLING (non-negotiable, from IDEA.md §3.4):
 *  - HCIA-Datacom is a COURSE CERTIFICATE. Never "Huawei Certified" or
 *    "Huawei Certification", and never listed as an HCIA certification.
 *  - CCNAv7 is a CERTIFICATE OF COURSE COMPLETION. Never the CCNA certification.
 *  - The GDSC credential is Web Development (Front-End) only.
 *
 * NEVER ADD (permanently dropped or ruled out):
 *  - AWS Academy Cloud Foundation        (account inaccessible after graduation)
 *  - GDSC UI/UX Designer                 (certificate never downloaded)
 *  - ETIC (EPT 470) and TOAFL (463)      (internal tests, credibility ruled out)
 *  - Data Science Landscape, Introduction to Tableau Desktop
 *    (sub-components of "Classifying Data Using IBM Granite", never listed alone)
 *
 * `scripts/guard-content.mjs` fails the build if any of these reach the output.
 */

export type CertificationTier = "featured" | "additional";

export interface Certification {
  name: string;
  issuer: string;
  /** Display string; years only where the exact date adds nothing. */
  date: string;
  tier: CertificationTier;
  /** Rendered visibly, not in a tooltip — used for the two mandatory caveats. */
  note?: string;
}

export const certifications: Certification[] = [
  // --- Featured -----------------------------------------------------------
  // Grouped by issuer, newest first. The order of issuers here drives the
  // grouping on the certifications section and page.
  {
    name: "Getting Started with Data",
    issuer: "IBM SkillsBuild",
    date: "2026",
    tier: "featured",
  },
  {
    name: "Classifying Data Using IBM Granite",
    issuer: "IBM SkillsBuild",
    date: "2026",
    tier: "featured",
  },
  {
    name: "Unleashing the Power of AI Agents",
    issuer: "IBM SkillsBuild",
    date: "2026",
    tier: "featured",
  },
  {
    name: "CCNAv7: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    date: "December 2023",
    tier: "featured",
    note: "Certificate of Course Completion — this is not the CCNA exam credential.",
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco",
    date: "September 2024",
    tier: "featured",
  },
  {
    name: "Network Defense",
    issuer: "Cisco",
    date: "December 2024",
    tier: "featured",
  },
  {
    name: "Network Support & Security",
    issuer: "Cisco",
    date: "December 2024",
    tier: "featured",
  },
  {
    name: "Endpoint Security",
    issuer: "Cisco",
    date: "December 2024",
    tier: "featured",
  },
  {
    name: "Database Design",
    issuer: "Oracle Academy",
    date: "January 2024",
    tier: "featured",
  },
  {
    name: "Database Programming with SQL",
    issuer: "Oracle Academy",
    date: "January 2024",
    tier: "featured",
  },
  {
    name: "Web Development Weekly Class (Front-End)",
    issuer: "GDSC UIN Jakarta",
    date: "February 2024",
    tier: "featured",
  },

  // --- Additional ---------------------------------------------------------
  {
    name: "HCIA-Datacom V1.0 Course Certificate",
    issuer: "Huawei Talent Online",
    date: "November 2023",
    tier: "additional",
    note: "Course completion only. It proves the course assessment was passed, nothing more.",
  },
  {
    name: "Red Hat System Administration I (RH124)",
    issuer: "Red Hat / UIN Jakarta",
    date: "June 2024",
    tier: "additional",
  },
  {
    name: "Red Hat System Administration II (RH134)",
    issuer: "Red Hat / UIN Jakarta",
    date: "June 2024",
    tier: "additional",
  },
  {
    name: "Panitia Tes Hamzah",
    issuer: "King Salman Global Academy + PPB UIN Jakarta",
    date: "September 2025",
    tier: "additional",
  },
  {
    name: "Comifuro XX — Committee Staff, Crowd Control of Ticketing",
    issuer: "Comic Frontier",
    date: "May 2025",
    tier: "additional",
  },
];

export const featuredCertifications = certifications.filter((c) => c.tier === "featured");
export const additionalCertifications = certifications.filter((c) => c.tier === "additional");

/** Issuer order used by the grouped display. */
export const featuredIssuerOrder = [
  "IBM SkillsBuild",
  "Cisco",
  "Cisco Networking Academy",
  "Oracle Academy",
  "GDSC UIN Jakarta",
];

export function groupByIssuer(items: Certification[]): { issuer: string; items: Certification[] }[] {
  const map = new Map<string, Certification[]>();
  for (const item of items) {
    const list = map.get(item.issuer) ?? [];
    list.push(item);
    map.set(item.issuer, list);
  }
  return [...map.entries()].map(([issuer, list]) => ({ issuer, items: list }));
}
