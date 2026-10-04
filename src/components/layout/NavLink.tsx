/**
 * NavLink — an in-page anchor that also works from other routes.
 *
 * Why this exists: with a plain <Link href="/#about">, Next.js performs a soft
 * navigation. When the click comes from another route (/about, /projects) the
 * URL updates and the hash is set, but the browser never scrolls to the target —
 * the document was already loaded when the fragment was applied.
 *
 * Two details matter here:
 *
 *   1. A fixed delay is not enough. After router.push("/"), the homepage has to
 *      mount before its sections exist, and how long that takes varies. A 60ms
 *      timeout silently did nothing roughly two times in three. So the target is
 *      polled for a short window instead.
 *
 *   2. The retry must give up. If the element never appears, the click should
 *      not spin forever — it stops after SCROLL_ATTEMPTS frames and leaves the
 *      user on the homepage, which is still the right destination.
 *
 * With JavaScript disabled the href still resolves, so the link degrades to a
 * normal navigation plus a browser fragment jump.
 */

"use client";

import { useRouter, usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

/** ~1.2s of frames at 60fps — long enough for a client route to mount. */
const SCROLL_ATTEMPTS = 72;
const FRAME_MS = 16;

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
      if (attempt < SCROLL_ATTEMPTS) {
        window.setTimeout(() => scrollToTarget(attempt + 1), FRAME_MS);
      }
      return;
    }

    // scroll-mt-* on the section supplies the sticky-header offset.
    element.scrollIntoView({ block: "start" });
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
