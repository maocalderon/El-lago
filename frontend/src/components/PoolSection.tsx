import Image from "next/image";

import { Reveal } from "@/components/Reveal";

export function PoolSection() {
  return (
    <section className="relative isolate flex h-[55svh] min-h-[400px] items-center overflow-hidden bg-lago-navy text-white">
      <Image
        src="/images/piscina.jpeg"
        alt="Piscina Restaurante El Lago"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover"
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-lago-navy/70 via-white/20 to-white/5" />

      <div className="absolute left-20 top-20 -z-10 h-56 w-56 rounded-full bg-white/15 blur-3xl animate-float-slow" />
      <div className="absolute -right-20 bottom-20 -z-10 h-36 w-36 rounded-full bg-lago-gold/10 blur-2xl animate-float-medium" />

      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-white/20 to-transparent" />

      <div className="section-shell">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex animate-float-slow rounded-full border border-lago-ocean/30 bg-lago-ocean/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-lago-ocean shadow-lg shadow-lago-ocean/10 backdrop-blur">
              Zona de Piscina
            </p>
            <h2 className="mt-6 font-display text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
              Frescura y Diversión
            </h2>
            <div className="mx-auto mt-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-lago-ocean/30" />
              <svg className="h-4 w-4 text-lago-ocean/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M2 12 C6 6 10 14 14 10 C18 6 22 12 22 12" />
              </svg>
              <span className="h-px w-8 bg-lago-ocean/30" />
            </div>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
              Contamos con servicio de piscina y clases de natación entre semana.
              Ven y comparte momentos inolvidables con tu familia mientras
              disfrutas del sol, el agua y la mejor gastronomía en un solo lugar.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
