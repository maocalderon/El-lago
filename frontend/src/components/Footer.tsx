import { FaFacebookF, FaInstagram } from "react-icons/fa";
import Image from "next/image";

import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-lago-navy py-12 text-white">
      <div className="section-shell">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="/images/logo-lago.jpeg"
              alt="Restaurante El Lago"
              width={48}
              height={48}
              className="h-12 w-12 rounded-xl border-2 border-lago-ocean/30 object-cover shadow-premium"
            />
            <p className="mt-3 font-display text-lg font-bold">Restaurante El Lago</p>
            <p className="mt-1 text-sm leading-6 text-white/60">
              {siteConfig.addressLine1}, {siteConfig.addressLine2}
              <br />
              Teléfono: {siteConfig.phone}
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <p className="text-sm font-semibold text-white/60">Síguenos</p>
            <div className="mt-3 flex gap-3">
              <a
                href={siteConfig.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/20 text-white transition hover:-translate-y-0.5 hover:border-lago-ocean hover:bg-lago-ocean/20 hover:text-lago-ocean hover:shadow-glow-blue"
              >
                <FaFacebookF size={17} />
              </a>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/20 text-white transition hover:-translate-y-0.5 hover:border-lago-ocean hover:bg-lago-ocean/20 hover:text-lago-ocean hover:shadow-glow-blue"
              >
                <FaInstagram size={19} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-white/40">
            © 2026 Restaurante El Lago. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
