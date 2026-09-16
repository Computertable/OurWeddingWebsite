"use client";

import { DisplayHeading, Divider, Eyebrow, Reveal } from "./ds";

/* ---------- Data (unchanged from the previous site) ---------- */
const parents = {
  groom: ["MR. VICTOR R. GONZALES", "MRS. CYNTHIA T. GONZALES"],
  bride: ["MR. RANDY B. PEREZ", "MRS. ROSALEA P. PEREZ"],
};

const principalSponsorsLeft = ["MR. MARVIN MANUEL", "MR. GURUCHARAN SINGH SANDHU", "MR. REY JUSTIN VELASCO"];
const principalSponsorsRight = [
  "MRS. MICHELLE MANUEL",
  "MRS. CHARMAINE T. SANDHU",
  "DRA. MARIA DULCE C. VELASCO",
  "MRS. ANDREA P. SAGALES",
];

const honorAttendants = [
  { role: "Best Man", names: ["MR. MARK KENNETH P. CARLOS"] },
  { role: "Matron of Honor", names: ["MRS. COLLEEN ELIZABETH B. CATARROJA"] },
];

const entourageLeft = [
  "MR. IAN LAKSHMI CHUA",
  "MR. JOHN DAVID LLAMANZARES",
  "MR. MICO ADRIAN PEREZ",
  "MR. JOHN CEDRICK SOLTIS",
];
  const entourageRight = ["MS. GENEVIEVE GONZALES", "MS. ROSE ANN DELA PAZ" , "MS. BEATRICE REYES", "MS. COLLEEN SY"];

const bearers = [
  { role: "Ring Bearer", names: ["FRANCIS MATTEO C. VIERNES"] },
  { role: "Coin Bearer", names: ["ALEXANDER GABRIEL T. MONTAS"] },
  { role: "Flower Girl", names: ["KHLOE MANZANO"], wide: true },
];

const secondarySponsors = [
  { role: "Candle", names: ["MR. JUFFERSON D. VIERNES", "MRS. DENISE G. CONCEPCION - VIERNES"] },
  { role: "Cord", names: ["MR. AARON JAMES T. GONZALES", "MRS. KAYCEE G. GONZALES"] },
  { role: "Veil", names: ["MR. MARK CONRAD DEL VALLE", "MS. LORNA CALINGACION"], wide: true },
];

/* ---------- Pieces ---------- */
function Names({ names }: { names: string[] }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-2 p-0">
      {names.map((name) => (
        <li key={name} className="ds-body" style={{ letterSpacing: "0.12em" }}>
          {name}
        </li>
      ))}
    </ul>
  );
}

function Group({ eyebrow, title, children }: { eyebrow: string; title?: string; children: React.ReactNode }) {
  return (
    <Reveal className="text-center">
      <Eyebrow tone="soft">{eyebrow}</Eyebrow>
      {title && (
        <DisplayHeading as="h3" size="md" className="mt-2">
          {title}
        </DisplayHeading>
      )}
      <div className="mt-8">{children}</div>
    </Reveal>
  );
}

function Roles({ items }: { items: Array<{ role: string; names: string[]; wide?: boolean }> }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-12">
      {items.map((item) => (
        <div key={item.role} className={item.wide ? "md:col-span-2" : undefined}>
          <Eyebrow size="sm" className="mb-2">
            {item.role}
          </Eyebrow>
          <Names names={item.names} />
        </div>
      ))}
    </div>
  );
}

/* ---------- Section ---------- */
export default function WeddingEntourage() {
  return (
    <section id="entourage" data-section aria-labelledby="entourage-title" className="ds-surface-page ds-section">
      <div className="mx-auto max-w-[860px]">
        <Reveal className="text-center">
          <Eyebrow>Standing with us as we say &ldquo;I do&rdquo;</Eyebrow>
          <DisplayHeading id="entourage-title" size="lg" className="mt-4">
            The entourage
          </DisplayHeading>
        </Reveal>

        <div className="mt-16 flex flex-col gap-14 md:mt-20 md:gap-16">
          <Group eyebrow="With praise & thanksgiving to God and blessings from our beloved parents">
            <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-10">
              <Names names={parents.groom} />
              <span className="ds-display ds-display--md" style={{ color: "var(--text-soft)" }} aria-hidden="true">
                &amp;
              </span>
              <Names names={parents.bride} />
            </div>
          </Group>

          <Divider ornament className="mx-auto w-full max-w-[220px]" />

          <Group eyebrow="With our" title="Principal sponsors">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-12">
              <Names names={principalSponsorsLeft} />
              <Names names={principalSponsorsRight} />
            </div>
          </Group>

          <Group eyebrow="To assist us with our needs">
            <Roles items={honorAttendants} />
          </Group>

          <Divider ornament className="mx-auto w-full max-w-[220px]" />

          <Group eyebrow="Bridesmaids & Groomsmen" title="To celebrate beside us">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-12">
              <Names names={entourageLeft} />
              <Names names={entourageRight} />
            </div>
          </Group>

          <Group eyebrow="To carry our symbols of love, faith & treasures">
            <Roles items={bearers} />
          </Group>

          <Divider ornament className="mx-auto w-full max-w-[220px]" />

          <Group eyebrow="Secondary sponsors" title="To lay our love to each other">
            <Roles items={secondarySponsors} />
          </Group>
        </div>
      </div>
    </section>
  );
}
