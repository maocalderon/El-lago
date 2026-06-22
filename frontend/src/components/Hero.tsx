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
      className="relative isolate flex min-h-[88svh] items-center overflow-hidden bg-lago-navy pt-24 text-white"
    >
      <Image
        src="/images/el-lago-hero.png"
        alt="Ambiente premium de Restaurante El Lago"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover"
      />

      <div className="absolute -bottom-10 -right-10 -z-10 h-[500px] w-[500px] opacity-20">
        <Image
          src="/images/bg-decoration.jpeg"
          alt=""
          fill
          className="object-cover blur-xl"
          sizes="500px"
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-lago-navy via-lago-navy/80 to-lago-deep/40" />

      <div className="absolute -left-20 top-20 -z-10 h-64 w-64 rounded-full bg-lago-ocean/10 blur-3xl animate-float-slow" />
      <div className="absolute right-20 top-40 -z-10 h-40 w-40 rounded-full bg-lago-ocean/10 blur-2xl animate-float-medium" />
      <div className="absolute bottom-40 left-1/3 -z-10 h-32 w-32 rounded-full bg-lago-gold/10 blur-2xl animate-float-fast" />

      <div className="absolute inset-x-0 bottom-0 -z-10 h-36 bg-gradient-to-t from-lago-navy/75 to-transparent" />

      <div className="section-shell py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex animate-float-slow rounded-full border border-lago-ocean/30 bg-lago-ocean/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-lago-ocean shadow-lg shadow-lago-ocean/10 backdrop-blur">
            Pescados y mariscos en Cúcuta
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-7xl">
            Restaurante El Lago
          </h1>
          <p className="mt-6 text-xl font-semibold text-white sm:text-2xl">
            Especialistas en Pescados y Mariscos en Cúcuta
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
            Disfruta de una experiencia gastronómica única con los mejores
            sabores del mar preparados con ingredientes frescos y atención de
            calidad.
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
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white shadow-lg backdrop-blur transition hover:-translate-y-1 hover:bg-white/20 hover:shadow-glow-blue md:inline-flex"
      >
        <FiChevronDown size={20} />
      </a>
    </section>
  );
}
