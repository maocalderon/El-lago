"use client";

import Image from "next/image";
import { FiBookOpen, FiCalendar, FiChevronDown } from "react-icons/fi";

import { MENU_URL } from "@/config/site";

function isMenuConfigured() {
  return MENU_URL.trim().length > 0 && !MENU_URL.includes("AQUI_VA");
}

export function Hero() {
  const openMenu = () => {
    if (!isMenuConfigured()) {
      window.alert(
        "Configura NEXT_PUBLIC_MENU_URL con el enlace del PDF del menú."
      );
      return;
    }

    window.open(MENU_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[88svh] items-center overflow-hidden bg-slate-950 pt-24 text-white"
    >
      <Image
        src="/images/el-lago-hero.png"
        alt="Ambiente premium de Restaurante El Lago"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(110deg,#071626_0%,#0d3a5e_45%,#0ea5e9_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-36 bg-gradient-to-t from-lago-navy/75 to-transparent" />

      <div className="section-shell py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-cyan-100 shadow-[0_10px_25px_rgba(56,189,248,0.18)] backdrop-blur">
            Experiencia premium en Cúcuta
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-7xl">
            Restaurante El Lago
          </h1>
          <p className="mt-6 text-xl font-semibold text-white sm:text-2xl">
            Un lugar acogedor, elegante y pensado para disfrutar cada visita.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
            Descubre una experiencia gastronómica única en Cúcuta, con sabor,
            atención de calidad y un ambiente que invita a quedarse.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button type="button" className="primary-button" onClick={openMenu}>
              <FiBookOpen size={19} />
              Ver Menú
            </button>
            <a href="#reservas" className="secondary-button">
              <FiCalendar size={19} />
              Reservar Mesa
            </a>
          </div>
        </div>
      </div>

      <a
        href="#nosotros"
        aria-label="Ir a nosotros"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/20 md:inline-flex"
      >
        <FiChevronDown size={20} />
      </a>
    </section>
  );
}
