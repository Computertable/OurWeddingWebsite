import "./WeddingEntourage.css";

const principalSponsorsLeft = [
  "MR. JOEL COMENDADOR",
  "MR. BOBBY GONZALES",
  "ENGR. KARL GAMALE",
];

const principalSponsorsRight = [
  "MRS. AMELITA COMENDADOR",
  "MRS. GEMMA GONZALES",
  "ENGR. MARY JANE GAMALE",
];

const entourageLeft = [
  "MR. MICHAEL BAHIAN",
  "MR. ALEXANDER YU",
  "MR. ALBERTO SALDANA JR.",
];

const entourageRight = [
  "MS. MARICON SOLEDAD",
  "MS. CHARIE JOYCE CABAHUG",
  "MS. WINDELOU PASIOL",
];

function NameColumn({ names }: { names: string[] }) {
  return (
    <div className="name-column">
      {names.map((name) => (
        <div className="person-name" key={name}>
          {name}
        </div>
      ))}
    </div>
  );
}

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="section-title">
      <div className="line" />

      <div>
        <div className="title-small">{title}</div>
        <div className="title-large">{subtitle}</div>
      </div>

      <div className="line" />
    </div>
  );
}

export default function WeddingEntourage() {
  return (
    <section className="wedding-entourage">
      <div className="entourage-content">

        {/* =========================
            COUPLE
        ========================== */}
        <header className="couple-header">
          <h1>
            Guilly <span>&amp;</span>
            <br />
            Dominique
          </h1>
        </header>

        {/* =========================
            PARENTS
        ========================== */}
        <section className="section parents-section">
          <p className="intro-text">
            WITH PRAISE &amp; THANKSGIVING TO GOD AND
            <br />
            BLESSINGS FROM OUR BELOVED PARENTS
          </p>

          <div className="two-column parents">
            <div>
              <div className="person-name">
                MR. GUILLERMO C. BAHIAN
              </div>

              <div className="person-name">
                MRS. LORNA G. BAHIAN
              </div>
            </div>

            <div className="ampersand">&amp;</div>

            <div>
              <div className="person-name">
                MR. DOMINGO G. DICO JR. +
              </div>

              <div className="person-name">
                MRS. VIDA C. DICO
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            PRINCIPAL SPONSORS
        ========================== */}
        <section className="section">
          <SectionTitle
            title="WITH OUR"
            subtitle="PRINCIPAL SPONSORS"
          />

          <div className="two-column sponsor-columns">
            <NameColumn names={principalSponsorsLeft} />
            <NameColumn names={principalSponsorsRight} />
          </div>
        </section>

        {/* =========================
            BEST MAN / MAID OF HONOR
        ========================== */}
        <section className="section">
          <p className="gold-text">
            TO ASSIST US WITH OUR NEEDS
          </p>

          <div className="two-column roles">
            <div>
              <h3>BESTMAN</h3>

              <div className="person-name">
                MR. ALEXANDER DADANG
              </div>
            </div>

            <div>
              <h3>MAID OF HONOR</h3>

              <div className="person-name">
                MS. NESLIE MARIE ACAIN
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            BRIDAL ENTOURAGE
        ========================== */}
        <section className="section">
          <SectionTitle
            title="BRIDAL ENTOURAGE"
            subtitle="TO GUIDE OUR WAY AHEAD"
          />

          <div className="two-column sponsor-columns">
            <NameColumn names={entourageLeft} />
            <NameColumn names={entourageRight} />
          </div>
        </section>

        {/* =========================
            BEARERS
        ========================== */}
        <section className="section bearers-section">
          <p className="gold-text">
            TO CARRY OUR SYMBOL OF
            <br />
            LOVE, FAITH, &amp; TREASURES
          </p>

          <div className="two-column bearers">
            <div>
              <h3>RING BEARER</h3>

              <div className="person-name">
                CHARLZ NERO MADELO
              </div>
            </div>

            <div>
              <h3>BIBLE &amp; COIN BEARER</h3>

              <div className="person-name">
                ZILDJIAN MANSEGUIAO
              </div>
            </div>
          </div>

          <div className="single-role">
            <h3>FLOWER GIRL</h3>

            <div className="person-name">
              JEANNE MILCAH MANSEGUIAO
            </div>
          </div>
        </section>

        {/* =========================
            SECONDARY SPONSORS
        ========================== */}
        <section className="section secondary-section">
          <SectionTitle
            title="SECONDARY SPONSORS"
            subtitle="TO LAY OUR LOVE TO EACH OTHER"
          />

          <div className="secondary-grid">
            <div>
              <h3>CANDLE</h3>

              <div className="person-name">
                MR. &amp; MRS. CHARLIE MADELO
              </div>
            </div>

            <div>
              <h3>CORD</h3>

              <div className="person-name">
                MR. &amp; MRS. GILBERT BAHIAN
              </div>
            </div>

            <div className="veil">
              <h3>VEIL</h3>

              <div className="person-name">
                MR. &amp; MRS. JONALD MANSEGUIAO
              </div>
            </div>
          </div>
        </section>

      </div>
    </section>
  );
}