import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col justify-center pt-14">
      <p className="font-mono text-[12px] uppercase tracking-widest text-accent">
        404 <span className="text-muted">// Not found</span>
      </p>
      <h1 className="mt-4 text-[28px] font-bold tracking-tight text-text sm:text-[36px]">
        This page doesn&rsquo;t exist
      </h1>
      <p className="mt-3 max-w-[62ch] text-[16px] leading-relaxed text-muted">
        The link may be outdated, or the address may have a typo.
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-[var(--radius-btn)] border-2 border-accent bg-accent px-5 py-2.5 text-[14px] font-semibold text-ink shadow-[4px_4px_0_0_var(--color-border)]"
        >
          Back to homepage
        </Link>
      </div>
    </section>
  );
}
