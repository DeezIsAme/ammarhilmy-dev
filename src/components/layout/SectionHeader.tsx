/**
 * SectionHeader — the repeated "01 // LABEL ————" pattern.
 * Mono, uppercase, wide tracking: this is what makes the page read as a
 * system rather than a stack of blocks.
 */

interface SectionHeaderProps {
  number: string;
  label: string;
}

export function SectionHeader({ number, label }: SectionHeaderProps) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="font-mono text-[12px] uppercase tracking-widest text-accent">
        {number}
      </span>
      <span className="font-mono text-[12px] uppercase tracking-widest text-muted">{label}</span>
      <span className="h-px flex-1 bg-border" aria-hidden="true" />
    </div>
  );
}
