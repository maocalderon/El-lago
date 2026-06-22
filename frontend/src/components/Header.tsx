"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Menú", href: "#menu" },
  { label: "Reservas", href: "#reservas" },
  { label: "Opiniones", href: "#opiniones" },
  { label: "Contacto", href: "#contacto" }
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState("#inicio");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("el-lago-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(savedTheme ? savedTheme === "dark" : prefersDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    window.localStorage.setItem("el-lago-theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => item.href.slice(1));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(`#${id}`);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 " +
        (isScrolled
          ? "border-lago-ocean/20 bg-white shadow-lg shadow-lago-ocean/5 backdrop-blur-xl dark:border-lago-ocean/10 dark:bg-lago-navy/95"
          : "border-transparent bg-white/90 backdrop-blur-xl dark:bg-lago-navy/90")
      }
    >
      <div className="section-shell flex h-20 items-center justify-between">
        <a
          href="#inicio"
          aria-label="Restaurante El Lago"
          className="flex items-center"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/images/logo-lago.jpeg"
            alt="Restaurante El Lago"
            width={52}
            height={52}
            priority
            className="h-13 w-13 rounded-xl border-2 border-lago-ocean/40 object-cover shadow-premium"
          />
          <span className="ml-3 font-display text-xl font-bold text-lago-navy dark:text-white">
            El Lago
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={
                "relative text-sm font-semibold transition " +
                (activeSection === item.href
                  ? "text-lago-ocean"
                  : "text-lago-ink hover:text-lago-ocean dark:text-white/80 dark:hover:text-lago-ocean")
              }
            >
              {item.label}
              {activeSection === item.href ? (
                <span className="absolute -bottom-2 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-lago-ocean" />
              ) : null}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
            aria-pressed={isDark}
            title={isDark ? "Modo claro" : "Modo oscuro"}
            onClick={() => setIsDark((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-white text-lago-navy transition hover:border-lago-ocean hover:text-lago-ocean hover:shadow-glow-blue dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:text-lago-ocean"
          >
            {isDark ? <FiSun size={19} /> : <FiMoon size={19} />}
          </button>

          <button
            type="button"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-white text-lago-navy transition hover:border-lago-ocean hover:text-lago-ocean lg:hidden dark:border-white/10 dark:bg-white/10 dark:text-white"
          >
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <nav className="border-t border-white/10 bg-white px-4 py-4 shadow-soft lg:hidden dark:bg-lago-navy">
          <div className="mx-auto grid max-w-7xl gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={
                  "rounded-md px-3 py-3 text-sm font-semibold transition " +
                  (activeSection === item.href
                    ? "bg-lago-ocean/10 text-lago-ocean"
                    : "text-lago-ink hover:bg-lago-ocean/5 hover:text-lago-ocean dark:text-white/90 dark:hover:bg-white/10")
                }
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
