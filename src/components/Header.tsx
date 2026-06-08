import React from 'react'

export function Header() {
  return (
    <header className="w-full py-4 bg-gradient-to-b from-white/60 to-transparent backdrop-blur sticky top-0 z-40">
      <div className="section-shell flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-lago-aqua/90 flex items-center justify-center font-bold text-white">EL</div>
          <div>
            <div className="font-display font-bold text-lg text-lago-navy">Restaurante El Lago</div>
            <div className="text-xs text-slate-600">Cúcuta · Pescados y Mariscos</div>
          </div>
        </div>
        <nav className="hidden md:flex gap-6 text-sm items-center">
          <a href="#inicio" className="text-lago-navy hover:underline">Inicio</a>
          <a href="#nosotros" className="text-lago-navy hover:underline">Nosotros</a>
          <a href="#menu" className="text-lago-navy hover:underline">Menú</a>
          <a href="#reservas" className="primary-button">Reservar</a>
        </nav>
      </div>
    </header>
  )
}
