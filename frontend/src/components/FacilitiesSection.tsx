import Image from "next/image";

import { Reveal } from "@/components/Reveal";

const gallery = [
  {
    src: "/images/bg-whatsapp.jpeg",
    alt: "Vista del lago Restaurante El Lago",
    label: "Nuestro Entorno"
  },
  {
    src: "/images/piscina.jpeg",
    alt: "Piscina Restaurante El Lago",
    label: "Zona de Piscina"
  },
  {
    src: "/images/salon-eventos.jpeg",
    alt: "Salón de eventos Restaurante El Lago",
    label: "Salón de Eventos"
  },
  {
    src: "/images/instalacion1.jpeg",
    alt: "Instalaciones Restaurante El Lago",
    label: "Espacios Amplios"
  },
  {
    src: "/images/instalacion2.jpeg",
    alt: "Área social Restaurante El Lago",
    label: "Área Social"
  }
];

export function FacilitiesSection() {
  return (
    <section className="bg-lago-pearl py-20 sm:py-24 dark:bg-[#071827]">
      <div className="section-shell">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-lago-ocean">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M2 12 C6 6 10 14 14 10 C18 6 22 12 22 12" />
              </svg>
              Conoce El Lago
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-lago-navy sm:text-4xl dark:text-white">
              Ven y visita nuestras instalaciones
            </h2>
            <div className="mx-auto mt-4 flex justify-center">
              <div className="section-divider" />
            </div>
            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-white/70">
              Te invitamos a conocer cada rincón de nuestro restaurante. Ya sea
              para una comida familiar, un evento especial o un día de piscina,
              tenemos el espacio perfecto para ti.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {gallery.map((item, index) => (
            <Reveal key={item.src} delay={index * 0.06}>
              <div className="group relative mb-5 overflow-hidden rounded-xl shadow-soft transition hover:shadow-premium">
                <div className="relative h-72 w-full sm:h-80">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-lago-navy/60 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="text-sm font-bold text-white drop-shadow">
                      {item.label}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
