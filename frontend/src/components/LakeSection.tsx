import Image from "next/image";

import { Reveal } from "@/components/Reveal";

export function LakeSection() {
  return (
    <section className="bg-lago-pearl py-20 sm:py-24 dark:bg-[#071827]">
      <div className="section-shell">
        <Reveal>
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-lago-ocean text-center">
              Nuestro Entorno
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-lago-navy text-center sm:text-4xl dark:text-white">
              El Lago que da nombre al restaurante
            </h2>
            <div className="flex justify-center mt-4">
              <div className="section-divider" />
            </div>
            <p className="mt-5 text-center text-base leading-8 text-slate-600 max-w-3xl mx-auto dark:text-white/70">
              Ubicado a orillas del lago, nuestro restaurante ofrece una vista
              privilegiada que acompaña cada experiencia gastronómica.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-12 overflow-hidden rounded-2xl shadow-premium">
            <div className="relative h-[300px] w-full sm:h-[400px] md:h-[450px] lg:h-[500px]">
              <Image
                src="/images/bg-whatsapp.jpeg"
                alt="Vista del lago que rodea Restaurante El Lago"
                fill
                priority
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: "center" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-lago-navy/40 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="text-lg font-bold text-white drop-shadow-lg sm:text-xl">
                Restaurante El Lago — Cúcuta
              </p>
              <p className="mt-1 text-sm text-white/80 drop-shadow">
                Una experiencia única frente al agua
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
