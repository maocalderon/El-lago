import Image from "next/image";

import { Reveal } from "@/components/Reveal";

export function LakeSection() {
  return (
    <section className="relative isolate flex h-[55svh] min-h-[400px] items-center overflow-hidden bg-lago-navy text-white">
      <Image
        src="/images/bg-whatsapp.jpeg"
        alt="Vista del lago que rodea Restaurante El Lago"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-scale-down"
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-lago-navy via-lago-navy/75 to-lago-deep/30" />

      <div className="absolute -left-20 top-20 -z-10 h-64 w-64 rounded-full bg-lago-ocean/10 blur-3xl animate-float-slow" />
      <div className="absolute right-20 top-40 -z-10 h-40 w-40 rounded-full bg-lago-ocean/10 blur-2xl animate-float-medium" />
      <div className="absolute bottom-40 left-1/3 -z-10 h-32 w-32 rounded-full bg-lago-gold/10 blur-2xl animate-float-fast" />

      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-lago-navy/90 via-lago-navy/50 to-transparent" />

      <div className="absolute bottom-8 left-0 right-0 z-10 text-center sm:bottom-12">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-lago-ocean">
            Nuestro Entorno
          </p>
          <h2 className="mt-2 font-display text-5xl font-bold leading-[1.1] text-white drop-shadow-2xl sm:text-7xl lg:text-8xl">
            El Lago
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
            Un nombre que evoca la frescura y tranquilidad del agua, en el
            corazón de Cúcuta.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
