import Image from "next/image";

import { Reveal } from "@/components/Reveal";

export function LakeSection() {
  return (
    <section className="relative isolate flex h-[50svh] min-h-[360px] items-center overflow-hidden bg-lago-navy text-white">
      <Image
        src="/images/bg-whatsapp.jpeg"
        alt="Vista del lago que rodea Restaurante El Lago"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover"
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-lago-navy via-lago-navy/75 to-lago-deep/30" />

      <div className="absolute -left-20 top-20 -z-10 h-64 w-64 rounded-full bg-lago-ocean/10 blur-3xl animate-float-slow" />
      <div className="absolute right-20 top-40 -z-10 h-40 w-40 rounded-full bg-lago-ocean/10 blur-2xl animate-float-medium" />
      <div className="absolute bottom-40 left-1/3 -z-10 h-32 w-32 rounded-full bg-lago-gold/10 blur-2xl animate-float-fast" />

      <div className="absolute inset-x-0 bottom-0 -z-10 h-36 bg-gradient-to-t from-lago-navy/75 to-transparent" />

      <div className="section-shell py-16 sm:py-20">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex animate-float-slow rounded-full border border-lago-ocean/30 bg-lago-ocean/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-lago-ocean shadow-lg shadow-lago-ocean/10 backdrop-blur">
              Nuestro Entorno
            </p>
            <h2 className="mt-6 font-display text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
              El Lago que da nombre al restaurante
            </h2>
            <div className="mx-auto mt-6 flex justify-center">
              <div className="section-divider" />
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
              Ubicado a orillas del lago, nuestro restaurante ofrece una vista
              privilegiada que acompaña cada experiencia gastronómica.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
