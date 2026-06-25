import Image from "next/image";

import { Reveal } from "@/components/Reveal";

export function LakeSection() {
  return (
    <section className="relative isolate flex h-[70svh] min-h-[450px] items-center overflow-hidden bg-lago-navy text-white">
      <Image
        src="/images/bg-whatsapp.jpeg"
        alt="Vista del lago que rodea Restaurante El Lago"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-contain"
        style={{ objectPosition: "center" }}
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-lago-navy/80 via-lago-navy/50 to-lago-deep/20" />

      <div className="absolute -left-20 top-20 -z-10 h-64 w-64 rounded-full bg-lago-ocean/10 blur-3xl animate-float-slow" />
      <div className="absolute right-20 top-40 -z-10 h-40 w-40 rounded-full bg-lago-ocean/10 blur-2xl animate-float-medium" />
      <div className="absolute bottom-40 left-1/3 -z-10 h-32 w-32 rounded-full bg-lago-gold/10 blur-2xl animate-float-fast" />

      <div className="absolute inset-x-0 bottom-0 -z-10 h-2/5 bg-gradient-to-t from-lago-navy/90 via-lago-navy/40 to-transparent" />

      <div className="section-shell z-10">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 inline-flex animate-float-slow rounded-full border border-lago-ocean/30 bg-lago-ocean/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-lago-ocean shadow-lg shadow-lago-ocean/10 backdrop-blur">
              Nuestro Entorno
            </p>
            <h2 className="font-display text-5xl font-bold leading-[1.02] text-white drop-shadow-2xl sm:text-7xl lg:text-8xl">
              El Lago
            </h2>
            <div className="mx-auto mt-4 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-lago-ocean/30" />
              <svg
                className="h-4 w-4 text-lago-ocean/40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M2 12 C6 6 10 14 14 10 C18 6 22 12 22 12" />
              </svg>
              <span className="h-px w-12 bg-lago-ocean/30" />
            </div>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
              Un nombre que evoca la frescura y tranquilidad del agua, en el
              corazón de Cúcuta.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
