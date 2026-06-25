"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

import { Reveal } from "@/components/Reveal";

type GalleryItem = {
  src: string;
  alt: string;
  label: string;
  description: string;
};

const gallery: GalleryItem[] = [
  {
    src: "/images/bg-whatsapp.jpeg",
    alt: "Vista del lago Restaurante El Lago",
    label: "Nuestro Entorno",
    description:
      "El lago que da nombre a nuestro restaurante, un escenario natural que envuelve cada visita con su belleza y tranquilidad."
  },
  {
    src: "/images/piscina.jpeg",
    alt: "Piscina Restaurante El Lago",
    label: "Zona de Piscina",
    description:
      "Disfruta de nuestra piscina con clases de natación entre semana. El lugar perfecto para refrescarte mientras compartes en familia."
  },
  {
    src: "/images/salon-eventos.jpeg",
    alt: "Salón de eventos Restaurante El Lago",
    label: "Salón de Eventos",
    description:
      "Un espacio especialmente diseñado para celebrar tus momentos importantes. Cumpleaños, reuniones empresariales y eventos familiares."
  },
  {
    src: "/images/instalacion1.jpeg",
    alt: "Restaurante El Lago instalaciones",
    label: "Nuestro Restaurante",
    description:
      "Un ambiente acogedor y bien diseñado para que cada visita sea especial. Disfruta de la mejor compañía en un espacio pensado para ti."
  },
  {
    src: "/images/instalacion2.jpeg",
    alt: "Restaurante El Lago área social",
    label: "Nuestro Restaurante",
    description:
      "Cada rincón de El Lago está creado para brindarte una experiencia única, ya sea en familia, con amigos o en eventos especiales."
  },
  {
    src: "/images/instalacion3.jpeg",
    alt: "Restaurante El Lago ambiente",
    label: "Nuestro Restaurante",
    description:
      "Un ambiente cálido y acogedor que invita a quedarse. Ven y descubre por qué El Lago es el lugar favorito de Cúcuta."
  }
];

function GalleryModal({
  item,
  onClose
}: {
  item: GalleryItem;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl bg-white shadow-premium dark:bg-lago-navy"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60"
        >
          <FiX size={20} />
        </button>
        <div className="relative h-[45vh] w-full sm:h-[55vh] md:h-[65vh]">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-contain"
            sizes="100vw"
          />
        </div>
        <div className="border-t border-slate-200 p-6 dark:border-white/10">
          <h3 className="font-display text-xl font-bold text-lago-navy dark:text-white">
            {item.label}
          </h3>
          <p className="mt-2 leading-7 text-slate-600 dark:text-white/70">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FacilitiesSection() {
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const open = useCallback((item: GalleryItem) => setSelected(item), []);
  const close = useCallback(() => setSelected(null), []);

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
              <button
                type="button"
                onClick={() => open(item)}
                className="group relative mb-5 w-full overflow-hidden rounded-xl shadow-soft transition hover:shadow-premium text-left"
              >
                <div className="relative h-72 w-full sm:h-80">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-lago-navy/70 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="block text-sm font-bold text-white drop-shadow">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-xs text-white/70 drop-shadow">
                      Haz clic para ver más
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {selected ? (
        <GalleryModal item={selected} onClose={close} />
      ) : null}
    </section>
  );
}
