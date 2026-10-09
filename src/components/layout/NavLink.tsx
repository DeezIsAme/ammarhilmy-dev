/**
 * NavLink — an in-page anchor that also works from other routes.
 *
 * Why this exists at all: with a plain <Link href="/#about">, Next.js performs a
 * soft navigation. When the click comes from another route (/about, /projects)
 * the URL updates and the hash is set, but the browser never scrolls to the
 * target — the document was already loaded when the fragment was applied.
 *
 * The scroll animation itself lives in src/lib/scroll.ts, shared with the
 * header monogram. See that file for why `scroll-behavior: smooth` alone is
 * not enough.
 *
 * With JavaScript disabled the href still resolves, so the link degrades to a
 * normal navigation plus a browser fragment jump.
 */

"use client";

import { useRouter, usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { animateScrollTo, headerOffset } from "@/lib/scroll";

/** How long the destination route has to mount before the target can be found. */
const LOOKUP_ATTEMPTS = 72;
const LOOKUP_FRAME_MS = 16;

interface NavLinkProps {
  href: string; // e.g. "/#projects"
  className?: string;
  children: ReactNode;
}

export function NavLink({ href, className, children }: NavLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [path, hash = ""] = href.split("#");
  const target = hash.replace("#", "");
  const targetPath = path === "" ? "/" : path;

  function scrollToTarget(attempt = 0) {
    const element = document.getElementById(target);

    if (!element) {
      // The destination route may still be mounting; keep looking for a moment.
      if (attempt < LOOKUP_ATTEMPTS) {
        window.setTimeout(() => scrollToTarget(attempt + 1), LOOKUP_FRAME_MS);
      }
      return;
    }

    animateScrollTo(window.scrollY + element.getBoundingClientRect().top - headerOffset(element));
    // Keep the address bar honest without triggering another navigation.
    window.history.replaceState(null, "", `/${target ? "#" + target : ""}`);
  }

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    // Let modified clicks (new tab, middle click, download) behave normally.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }

    event.preventDefault();
    scrollToTarget();

    if (pathname !== targetPath) {
      router.push(targetPath);
    }
  }

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
