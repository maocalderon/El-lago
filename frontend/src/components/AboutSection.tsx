import { FaFish, FaHandsHelping, FaUsers } from "react-icons/fa";
import type { IconType } from "react-icons";

import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const values: Array<{
  icon: IconType;
  title: string;
  description: string;
}> = [
  {
    icon: FaFish,
    title: "Especialidad marina",
    description:
      "Una propuesta gastronómica con ingredientes frescos, preparada con criterio y cuidado."
  },
  {
    icon: FaHandsHelping,
    title: "Servicio cercano",
    description:
      "Atención amable, precisa y pensada para que cada visita se sienta especial."
  },
  {
    icon: FaUsers,
    title: "Ambiente familiar",
    description:
      "Un lugar ideal para compartir celebraciones, almuerzos y encuentros en Cúcuta."
  }
];

export function AboutSection() {
  return (
    <section
      id="nosotros"
      className="relative isolate overflow-hidden bg-lago-pearl py-20 sm:py-24 dark:bg-[#071827]"
    >
      <div className="pointer-events-none absolute -left-20 top-20 -z-10 h-72 w-72 rounded-full bg-lago-ocean/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-20 -z-10 h-60 w-60 rounded-full bg-lago-gold/[0.04] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 -z-10 h-32 w-32 rounded-full bg-lago-ocean/[0.04] blur-2xl animate-pulse-soft" />

      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Sobre Nosotros"
            title="Tradición, frescura y hospitalidad junto a la mesa"
            description="Restaurante El Lago es un destino reconocido en Cúcuta por su tradición culinaria y compromiso con la frescura. Nuestro compromiso es brindar una experiencia gastronómica excepcional, combinando ingredientes de calidad, excelente servicio y un ambiente ideal para compartir en familia."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <Reveal key={value.title} delay={index * 0.08}>
                <article className="group glow-ocean h-full rounded-lg border border-slate-200 bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-premium dark:border-white/10 dark:bg-white/[0.07]">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-md bg-gradient-to-br from-lago-cream to-lago-ocean/20 text-lago-gold shadow-inner transition group-hover:scale-110 group-hover:shadow-glow-gold dark:from-lago-ocean/10 dark:to-lago-sky/10 dark:text-lago-sky">
                    <Icon size={25} />
                  </div>
                  <h3 className="text-xl font-bold text-lago-navy transition group-hover:text-lago-ocean dark:text-white dark:group-hover:text-lago-ocean">
                    {value.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600 dark:text-white/70">
                    {value.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-lago-ocean/5 to-transparent" />
    </section>
  );
}
