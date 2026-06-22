import { FiExternalLink, FiFileText } from "react-icons/fi";

import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { MENU_URL } from "@/config/site";

export function MenuSection() {
  return (
    <section
      id="menu"
      className="relative isolate overflow-hidden bg-white py-20 sm:py-24 dark:bg-[#06111f]"
    >
      <div className="pointer-events-none absolute -right-20 top-10 -z-10 h-80 w-80 rounded-full bg-lago-ocean/[0.04] blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-10 -z-10 h-56 w-56 rounded-full bg-lago-sky/[0.05] blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-20 -z-10 h-24 w-24 rounded-full bg-lago-gold/[0.03] blur-2xl animate-float-slow" />

      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Menú Digital"
            title="Carta oficial de Restaurante El Lago"
            description="Consulta nuestra carta en PDF con la propuesta gastronómica del restaurante, manteniendo la página principal limpia y enfocada en la experiencia."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="group mx-auto mt-10 max-w-3xl">
            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-7 text-center shadow-premium transition hover:shadow-glow-blue sm:p-10 dark:border-white/10 dark:bg-white/[0.06]">
              <div className="pointer-events-none absolute inset-0 -z-10 shimmer-bg" />
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-md bg-gradient-to-br from-lago-cream to-lago-ocean/20 text-lago-gold shadow-inner transition group-hover:scale-110 group-hover:shadow-glow-gold dark:from-lago-ocean/10 dark:to-lago-sky/10 dark:text-lago-sky">
                <FiFileText size={31} />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-lago-navy dark:text-white">
                Menú en PDF
              </h3>
              <p className="mt-3 max-w-xl leading-7 text-slate-600 dark:text-white/70">
                La carta se mantiene en un archivo independiente para que puedas
                actualizarla fácilmente sin cargar platos dentro de la página
                principal.
              </p>
              <a
                href={MENU_URL}
                target="_blank"
                rel="noreferrer"
                className="primary-button mt-7 inline-flex"
              >
                <FiExternalLink size={18} />
                Ver Menú
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
