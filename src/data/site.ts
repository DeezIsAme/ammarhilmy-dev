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
  url: "https://web-porto-ammar-hilmy.vercel.app",
  title: "Ammar Hilmy Ramzy — Front-End Developer",
  description:
    "Portfolio of Ammar Hilmy Ramzy, a Front-End Developer from Tangerang Selatan, Indonesia. Informatics Engineering graduate building accessible web interfaces with Laravel, Blade, Alpine.js, and Tailwind CSS.",
  nav: [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Certifications", href: "/certifications" },
    { label: "Contact", href: "/contact" },
  ],
};
