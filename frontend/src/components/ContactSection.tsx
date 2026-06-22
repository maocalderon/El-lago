import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";

import { siteConfig, whatsappUrl } from "@/config/site";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

export function ContactSection() {
  return (
    <section
      id="contacto"
      className="relative isolate overflow-hidden bg-lago-pearl py-20 sm:py-24 dark:bg-[#071827]"
    >
      <div className="pointer-events-none absolute -left-20 top-10 -z-10 h-64 w-64 rounded-full bg-lago-ocean/[0.05] blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 -z-10 h-48 w-48 rounded-full bg-lago-navy/[0.04] blur-3xl" />
      <div className="pointer-events-none absolute right-1/3 top-20 -z-10 h-20 w-20 rounded-full bg-lago-gold/[0.03] blur-2xl animate-float-medium" />

      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Contacto"
            title="Hablemos de tu próxima visita"
            description="Reserva, pregunta por disponibilidad o comunícate directamente con el restaurante."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <Reveal>
            <a
              href={`tel:${siteConfig.phoneInternational}`}
              className="group glow-ocean flex h-full items-center gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-premium dark:border-white/10 dark:bg-white/[0.07]"
            >
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-lago-cream to-lago-ocean/20 text-lago-gold shadow-inner transition group-hover:scale-110 group-hover:shadow-glow-gold dark:from-lago-ocean/10 dark:to-lago-sky/10 dark:text-lago-sky">
                <FiPhone size={24} />
              </span>
              <span>
                <span className="block text-sm font-semibold text-slate-500 transition group-hover:text-lago-ocean dark:text-white/60">
                  Teléfono
                </span>
                <span className="mt-1 block text-xl font-bold text-lago-navy transition group-hover:text-lago-ocean dark:text-white">
                  {siteConfig.phone}
                </span>
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.06}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full items-center gap-5 rounded-lg border border-emerald-200 bg-emerald-50 p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-premium hover:shadow-glow-blue dark:border-emerald-300/20 dark:bg-emerald-400/10"
            >
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-emerald-500 text-white shadow-lg transition group-hover:scale-110 group-hover:shadow-glow-gold">
                <FaWhatsapp size={27} />
              </span>
              <span>
                <span className="block text-sm font-semibold text-emerald-700 transition group-hover:text-lago-ocean dark:text-emerald-100/75">
                  WhatsApp
                </span>
                <span className="mt-1 block text-xl font-bold text-emerald-800 transition group-hover:text-lago-ocean dark:text-emerald-50">
                  {siteConfig.phone}
                </span>
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="group glow-ocean h-full rounded-lg border border-slate-200 bg-white p-6 shadow-soft transition hover:shadow-premium dark:border-white/10 dark:bg-white/[0.07]">
              <p className="text-sm font-semibold text-slate-500 transition group-hover:text-lago-ocean dark:text-white/60">
                Redes Sociales
              </p>
              <div className="mt-4 flex gap-3">
                <a
                  href={siteConfig.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-lago-navy text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-lago-ocean hover:shadow-glow-blue"
                >
                  <FaFacebookF size={18} />
                </a>
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-lago-ocean text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-lago-navy hover:shadow-glow-blue"
                >
                  <FaInstagram size={20} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
