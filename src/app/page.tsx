/**
 * Homepage — seven sections in the approved order:
 *   01 Hero · 02 Stats · 03 Tech stack · 04 Experience
 *   05 Projects · 06 Certifications · 07 Contact
 *
 * Note the order: skills and experience come before projects. Evidence of
 * capability first, then the work that proves it.
 *
 * This is a React Server Component. Every section below renders to static HTML
 * at build time; the only JavaScript on this page is RoleRotator.
 */

import { Hero } from "@/components/home/Hero";
import { Glance } from "@/components/home/Glance";
import { TechStack } from "@/components/home/TechStack";
import { ExperienceList } from "@/components/home/ExperienceList";
import { ProjectGrid } from "@/components/home/ProjectGrid";
import { CertificationGroups } from "@/components/home/CertificationGroups";
import { ContactCards } from "@/components/home/ContactCards";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { SectionLink } from "@/components/layout/SectionLink";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section id="about" className="mt-16 scroll-mt-20" aria-labelledby="stats-heading">
        <SectionHeader number="02" label="At a glance" />
        <h2 id="stats-heading" className="sr-only">
          At a glance
        </h2>
        <Glance />
        <SectionLink href="/about" label="Full background" />
      </section>

      <section id="skills" className="mt-20 scroll-mt-20" aria-labelledby="skills-heading">
        <SectionHeader number="03" label="Tech stack & skills" />
        <h2 id="skills-heading" className="sr-only">
          Tech stack and skills
        </h2>
        <TechStack />
      </section>

      <section id="experience" className="mt-20 scroll-mt-20" aria-labelledby="experience-heading">
        <SectionHeader number="04" label="Experience" />
        <h2 id="experience-heading" className="sr-only">
          Experience
        </h2>
        <ExperienceList />
      </section>

      <section id="projects" className="mt-20 scroll-mt-20" aria-labelledby="projects-heading">
        <SectionHeader number="05" label="Projects" />
        <h2 id="projects-heading" className="sr-only">
          Projects
        </h2>
        <ProjectGrid />
        <SectionLink href="/projects" label="All projects" />
      </section>

      <section id="certifications" className="mt-20 scroll-mt-20" aria-labelledby="certs-heading">
        <SectionHeader number="06" label="Certifications" />
        <h2 id="certs-heading" className="sr-only">
          Certifications
        </h2>
        <CertificationGroups />
        <SectionLink href="/certifications" label="All 16 credentials" />
      </section>

      <section id="contact" className="mt-20 scroll-mt-20" aria-labelledby="contact-heading">
        <SectionHeader number="07" label="Contact" />
        <h2 id="contact-heading" className="sr-only">
          Contact
        </h2>
        <ContactCards />
      </section>
    </>
  );
}
