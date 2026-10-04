/**
 * CertificationGroups — featured credentials grouped by issuer, then the
 * additional set.
 *
 * The two mandatory caveats (HCIA-Datacom is a course certificate; CCNAv7 is a
 * course completion) render as visible text, never a tooltip or title
 * attribute. A caveat a reader has to hover to find is not a caveat.
 */

import { Card } from "@/components/ui/Card";
import {
  additionalCertifications,
  featuredCertifications,
  groupByIssuer,
  type Certification,
} from "@/data/certifications";

function Row({ item }: { item: Certification }) {
  return (
    <li className="border-t-2 border-border py-3 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="text-[15px] text-text">{item.name}</span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
          {item.date}
        </span>
      </div>
      {item.note ? (
        <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-accent">
          {item.note}
        </p>
      ) : null}
    </li>
  );
}

function IssuerBlock({
  issuer,
  items,
}: {
  issuer: string;
  items: Certification[];
}) {
  return (
    <Card className="p-5">
      <h3 className="mb-4 font-mono text-[12px] uppercase tracking-widest text-accent">{issuer}</h3>
      <ul>
        {items.map((item) => (
          <Row key={item.name} item={item} />
        ))}
      </ul>
    </Card>
  );
}

export function CertificationGroups() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 lg:grid-cols-2">
        {groupByIssuer(featuredCertifications).map(({ issuer, items }) => (
          <IssuerBlock key={issuer} issuer={issuer} items={items} />
        ))}
      </div>

      <IssuerBlock issuer="Additional credentials" items={additionalCertifications} />
    </div>
  );
}
