/**
 * Site-wide configuration: canonical URL, SEO defaults, and navigation.
 *
 * Update `url` after the Vercel deployment if a custom domain is added later;
 * canonical links, the sitemap, and Open Graph URLs all read from here.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  url: string;
  title: string;
  description: string;
  nav: NavItem[];
}

export const site: SiteConfig = {
  url: "https://ammarhilmy-dev.vercel.app",
  title: "Ammar Hilmy Ramzy — Web Developer",
  description:
    "Portfolio of Ammar Hilmy Ramzy, a Web Developer from Tangerang Selatan, Indonesia. Informatics Engineering graduate building accessible web applications with Laravel, Blade, Alpine.js, and Tailwind CSS.",
  /**
   * In-page anchors, not routes: the topbar scrolls to a section on the
   * homepage instead of navigating away. A "#" prefix on a different route
   * still works (Next.js routes home first, then scrolls to the target).
   */
  nav: [
    { label: "About", href: "/#about" },
    { label: "Projects", href: "/#projects" },
    { label: "Certifications", href: "/#certifications" },
    { label: "Contact", href: "/#contact" },
  ],
};
