"use client";

import { motion } from "framer-motion";

const principalSponsorsLeft = [
  "MR. REY JUSTIN VELASCO",
  "MR. GURUCHARAN SINGH SANDHU"
];

const principalSponsorsRight = [
  "MRS. MA. DULCE C. VELASCO",
  "MRS. CHARMAINE T. SANDHU",
  "MRS. ANDREA P. SAGALES",
];

const entourageLeft = [
  "MR. IAN LAKSHMI CHUA",
  "MR. MICO ADRIAN PEREZ",
  "MR. MARVIN DACER RAMOS",
  "MR. JOHN CEDRICK SOLTIS"
];

const entourageRight = [
  "MS. ROSE DELA PAZ",
  "MS. GENEVIEVE GONZALES",
  "MS. BEATRICE REYES",
  "MS. COLLEN SY"
];

function NameColumn({ names }: { names: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      {names.map((name) => (
        <div
          key={name}
          className="text-[11px] font-bold tracking-[0.4px] text-[#555] md:text-[18px]"
          style={{
            fontFamily: "Montserrat, sans-serif",
          }}
        >
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
    <div className="mb-9 grid grid-cols-[35px_1fr_35px] items-center gap-3 md:grid-cols-[1fr_auto_1fr] md:gap-7">
      <div className="h-[2px] bg-[#a79567]" />

      <div className="text-center">
        <div
          className="text-[11px] font-medium tracking-[2px] text-[#a79567] md:text-[17px] md:tracking-[4px]"
          style={{
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          {title}
        </div>

        <div
          className="text-[14px] font-bold tracking-[3px] text-[#a79567] md:text-[22px] md:tracking-[5px]"
          style={{
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          {subtitle}
        </div>
      </div>

      <div className="h-[2px] bg-[#a79567]" />
    </div>
  );
}

export default function WeddingEntourage() {
  return (
    <div>
      {/* =====================================
          PAGE HEADER
      ====================================== */}

      <section className="bg-[#e9e1d5] px-5 py-20 text-[#2f2b26] md:px-10 md:py-28">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 text-center text-5xl font-light tracking-tight md:text-7xl"
          style={{
            fontFamily: "var(--font-script)",
          }}
        >
          The Entourage
        </motion.h2>


        {/* =====================================
          ENTOURAGE CONTENT
      ====================================== */}

          <div className="mx-auto w-full max-w-[1050px]">

            {/* =====================================
              COUPLE
          ====================================== */}

            {/* <header className="mb-20 md:mb-[70px]">
              <h1
                className="m-0 text-[4rem] font-normal leading-[0.78] tracking-[-3px] text-[#2f8b42] md:text-[clamp(4.5rem,8vw,7.5rem)]"
                style={{
                  fontFamily: "var(--font-script)",
                }}
              >
                Guilly{" "}
                <span className="text-[0.55em]">
                  &amp;
                </span>
                <br />
                Dominique
              </h1>
            </header> */}

            {/* =====================================
              PARENTS
          ====================================== */}

            <section className="mb-12 text-center md:mb-[55px]">
              <p
                className="mb-10 text-[12px] font-semibold leading-[1.45] tracking-[2px] text-[#a79567] md:text-[18px] md:tracking-[3px]"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                WITH PRAISE &amp; THANKSGIVING TO GOD AND
                <br />
                BLESSINGS FROM OUR BELOVED PARENTS
              </p>

              <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_80px_1fr] md:gap-0">

                {/* Groom's Parents */}

                <div>
                  <div
                    className="text-[11px] font-bold leading-[1.3] tracking-[0.4px] text-[#555] md:text-[18px]"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    MR. VICTOR R. GONZALES
                  </div>

                  <div
                    className="text-[11px] font-bold leading-[1.3] tracking-[0.4px] text-[#555] md:text-[18px]"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    MRS. CYNTHIA T. GONZALES
                  </div>
                </div>

                {/* Ampersand */}

                <div
                  className="hidden text-[70px] font-medium text-[#a79567] md:block"
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                  }}
                >
                  &amp;
                </div>

                {/* Bride's Parents */}

                <div>
                  <div
                    className="text-[11px] font-bold leading-[1.3] tracking-[0.4px] text-[#555] md:text-[18px]"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    MR. RANDY B. PEREZ
                  </div>

                  <div
                    className="text-[11px] font-bold leading-[1.3] tracking-[0.4px] text-[#555] md:text-[18px]"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    MRS. ROSALEA P. PEREZ
                  </div>
                </div>
              </div>
            </section>

            {/* =====================================
              PRINCIPAL SPONSORS
          ====================================== */}

            <section className="mb-12 text-center md:mb-[55px]">
              <SectionTitle
                title="WITH OUR"
                subtitle="PRINCIPAL SPONSORS"
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-20">
                <NameColumn names={principalSponsorsLeft} />
                <NameColumn names={principalSponsorsRight} />
              </div>
            </section>

            {/* =====================================
              BEST MAN / MAID OF HONOR
          ====================================== */}

            <section className="mb-12 text-center md:mb-[55px]">
              <p
                className="mb-8 text-[12px] font-semibold tracking-[2px] text-[#a79567] md:text-[18px] md:tracking-[3px]"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                TO ASSIST US WITH OUR NEEDS
              </p>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-20">

                <div>
                  <h3
                    className="mb-1 text-[14px] font-bold tracking-[3px] text-[#a79567] md:text-[21px] md:tracking-[5px]"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    BESTMAN
                  </h3>

                  <div
                    className="text-[11px] font-bold text-[#555] md:text-[18px]"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    MR. MARK KENNETH P. CARLOS
                  </div>
                </div>

                <div>
                  <h3
                    className="mb-1 text-[14px] font-bold tracking-[3px] text-[#a79567] md:text-[21px] md:tracking-[5px]"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    MATRON OF HONOR
                  </h3>

                  <div
                    className="text-[11px] font-bold text-[#555] md:text-[18px]"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    MRS. COLLEN ELIZABETH B. CATAROJA
                  </div>
                </div>

              </div>
            </section>

            {/* =====================================
              BRIDAL ENTOURAGE
          ====================================== */}

            <section className="mb-12 text-center md:mb-[55px]">
              <SectionTitle
                title="BRIDAL ENTOURAGE"
                subtitle="TO GUIDE OUR WAY AHEAD"
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-20">
                <NameColumn names={entourageLeft} />
                <NameColumn names={entourageRight} />
              </div>
            </section>

            {/* =====================================
              BEARERS
          ====================================== */}

            <section className="mb-12 mt-16 text-center md:mb-[55px]">
              <p
                className="mb-10 text-[12px] font-semibold leading-[1.45] tracking-[2px] text-[#a79567] md:text-[18px] md:tracking-[3px]"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                TO CARRY OUR SYMBOL OF
                <br />
                LOVE, FAITH, &amp; TREASURES
              </p>

              <div className="mb-9 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-20">

                {/* Ring Bearer */}

                <div>
                  <h3
                    className="mb-1 text-[14px] font-bold tracking-[3px] text-[#a79567] md:text-[21px] md:tracking-[5px]"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    RING BEARER
                  </h3>

                  <div
                    className="text-[11px] font-bold text-[#555] md:text-[18px]"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    FRANCIS MATTEO C. VIERNES
                  </div>
                </div>

                {/* Coin Bearer */}

                <div>
                  <h3
                    className="mb-1 text-[14px] font-bold tracking-[3px] text-[#a79567] md:text-[21px] md:tracking-[5px]"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    COIN BEARER
                  </h3>

                  <div
                    className="text-[11px] font-bold text-[#555] md:text-[18px]"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    
                  </div>
                </div>

              </div>

              {/* Flower Girl */}

              <div className="mt-6">
                <h3
                  className="mb-1 text-[14px] font-bold tracking-[3px] text-[#a79567] md:text-[21px] md:tracking-[5px]"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  FLOWER GIRL
                </h3>

                <div
                  className="text-[11px] font-bold text-[#555] md:text-[18px]"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  KHLOE MANZANO
                </div>
              </div>
            </section>

            {/* =====================================
              SECONDARY SPONSORS
          ====================================== */}

            <section className="mb-12 mt-16 text-center md:mb-[55px]">
              <SectionTitle
                title="SECONDARY SPONSORS"
                subtitle="TO LAY OUR LOVE TO EACH OTHER"
              />

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-[60px] md:gap-y-[35px]">

                {/* Candle */}

                <div>
                  <h3
                    className="mb-1 text-[14px] font-bold tracking-[3px] text-[#a79567] md:text-[21px] md:tracking-[5px]"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    CANDLE
                  </h3>

                  <div
                    className="text-[11px] font-bold text-[#555] md:text-[18px]"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    MR. JUFFERSON D. VIERNES
                    <br/> 
                    MRS. DENISE G. CONCEPCION - VIERNES
                  </div>
                </div>

                {/* Cord */}

                <div>
                  <h3
                    className="mb-1 text-[14px] font-bold tracking-[3px] text-[#a79567] md:text-[21px] md:tracking-[5px]"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    CORD
                  </h3>

                  <div
                    className="text-[11px] font-bold text-[#555] md:text-[18px]"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    MR. AARON JAMES T. GONZALES 
                    <br/> 
                    MRS. KAYCEE G. GONZALES
                  </div>
                </div>

                {/* Veil */}

                <div className="md:col-span-2">
                  <h3
                    className="mb-1 text-[14px] font-bold tracking-[3px] text-[#a79567] md:text-[21px] md:tracking-[5px]"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    VEIL
                  </h3>

                  <div
                    className="text-[11px] font-bold text-[#555] md:text-[18px]"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    MR. MARK CONRAD DEL VALLE
                    <br/> 
                    MS. LORNA CALINGACION
                  </div>
                </div>

              </div>
            </section>

          </div>
      </section>
    </div>
  );
}