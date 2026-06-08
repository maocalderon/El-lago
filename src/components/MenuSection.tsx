import { FiExternalLink, FiFileText } from "react-icons/fi";

import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { MENU_URL } from "@/config/site";

export function MenuSection() {
  return (
    <section id="menu" className="bg-[linear-gradient(180deg,#f4fbff_0%,#edf7ff_100%)] py-20 sm:py-24 dark:bg-[#06111f]">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Menú Digital"
            title="Una carta con estilo, presentación y sabor"
            description="Explora nuestra propuesta en PDF con una presentación limpia, fresca y atractiva para que tus clientes encuentren fácil y rápido lo que desean."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <article className="rounded-3xl border border-cyan-100 bg-[linear-gradient(145deg,#071626_0%,#0b3a5f_45%,#0ea5e9_100%)] p-8 text-white shadow-[0_24px_60px_rgba(8,15,35,0.28)] dark:border-white/10 sm:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-lago-aqua backdrop-blur">
                <FiFileText size={16} />
                Carta destacada
              </div>
              <h3 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
                Menú en PDF con identidad propia
              </h3>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/85 sm:text-lg">
                Una presentación visual más elegante, con el mismo espíritu del
                restaurante: frescura, acogida y sabor que invitan a pedir.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-white/90 sm:text-base">
                <li>• Diseño claro y profesional para que se vea premium.</li>
                <li>• Colores azules y cálidos para reforzar la identidad visual.</li>
                <li>• Acceso rápido para clientes, reservas y delivery.</li>
              </ul>
            </article>

            <article className="rounded-3xl border border-cyan-100 bg-white/90 p-8 text-center shadow-[0_18px_45px_rgba(8,15,35,0.12)] sm:p-10 dark:border-white/10 dark:bg-white/[0.06]">
              <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700 shadow-soft dark:bg-lago-aqua/10 dark:text-lago-aqua">
                <FiFileText size={30} />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
                Descubre la carta completa
              </h3>
              <p className="mt-3 max-w-md mx-auto leading-7 text-slate-600 dark:text-white/70">
                Mantén el menú como PDF independiente para actualizarlo fácil y
                mostrar una versión más visual y llamativa para tus clientes.
              </p>
              <a
                href={MENU_URL}
                target="_blank"
                rel="noreferrer"
                className="primary-button mt-7 inline-flex w-full justify-center sm:w-auto"
              >
                <FiExternalLink size={18} />
                Ver Menú
              </a>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
