import Image from "next/image";
import { Divider, Eyebrow } from "./ds";

const photos = ["/images/footer-1.JPG", "/images/footer-3.PNG", "/images/footer-2.PNG"];

export default function Footer() {
  return (
    <footer className="ds-surface-page" style={{ borderTop: "var(--border-hairline)" }}>
      <div className="ds-container" style={{ padding: "var(--space-9) var(--section-x) var(--space-8)" }}>
        <div className="mx-auto grid max-w-5xl grid-cols-3 gap-2 md:gap-5">
          {photos.map((src) => (
            <div key={src} className="ds-frame relative aspect-[4/5]">
              <Image
                src={src}
                alt="Sofia and JJ"
                fill
                sizes="(max-width: 768px) 33vw, 340px"
                quality={70}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center text-center">
          <p className="ds-display ds-display--md ds-script">Sofia &amp; Joshua</p>
          <Divider ornament className="my-5 w-full max-w-[280px]" />
          <Eyebrow>02 · 27 · 2027 · Taguig, Philippines</Eyebrow>
        </div>
      </div>
    </footer>
  );
}
