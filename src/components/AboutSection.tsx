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
    title: "Propuesta especial",
    description:
      "Una experiencia cuidada con sabores auténticos, presentación elegante y detalles pensados para cada visita."
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
    <section id="nosotros" className="bg-[linear-gradient(180deg,#071423_0%,#0b2236_100%)] py-20 text-white sm:py-24 dark:bg-[#071827]">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Sobre Nosotros"
            title="Tradición, frescura y hospitalidad junto a la mesa"
            description="En Restaurante El Lago cada plato combina frescura, sazón y un ambiente acogedor para que disfrutes de una experiencia única en Cúcuta. Ven a disfrutar de sabores que sorprenden desde la primera cucharada."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <Reveal key={value.title} delay={index * 0.08}>
                <article className="h-full rounded-3xl border border-white/10 bg-white/10 p-7 shadow-[0_18px_40px_rgba(8,15,35,0.35)] transition duration-200 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_24px_50px_rgba(56,189,248,0.18)] dark:border-white/10 dark:bg-white/[0.07]">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-100 dark:bg-lago-aqua/10 dark:text-lago-aqua">
                    <Icon size={25} />
                  </div>
                  <h3 className="text-xl font-bold text-white dark:text-white">
                    {value.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-200 dark:text-white/70">
                    {value.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
