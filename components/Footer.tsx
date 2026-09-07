import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#f7f4ee] border-t border-[#e4dfd5]">
      <div className="mx-auto max-w-6xl px-5 md:px-10 py-20 md:py-28">

        {/* PHOTO GRID */}
        <div className="grid grid-cols-3 gap-2 md:gap-5 max-w-5xl mx-auto">
          
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/footer-1.JPG"
              alt="Sofia and JJ"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 33vw, 400px"
            />
          </div>

          

          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/footer-3.PNG"
              alt="Sofia and JJ"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 33vw, 400px"
            />
          </div>

        <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/footer-2.PNG"
              alt="Sofia and JJ"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 33vw, 400px"
            />
          </div>

        </div>


      </div>
    </footer>
  );
}
