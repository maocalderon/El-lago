"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { isAuthenticated, clearToken } from "@/lib/api";

const nav = [
  { href: "/dashboard", label: "Resumen", icon: "📊" },
  { href: "/dashboard/reservations", label: "Reservas", icon: "📋" },
  { href: "/dashboard/agenda", label: "Agenda", icon: "📅" },
  { href: "/dashboard/config", label: "Configuración", icon: "⚙️" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/dashboard/login") {
      setChecked(true);
      return;
    }
    if (!isAuthenticated()) {
      router.replace("/dashboard/login");
    } else {
      setChecked(true);
    }
  }, [pathname, router]);

  if (pathname === "/dashboard/login") {
    return <>{children}</>;
  }

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#06111f]">
        <p className="text-white">Verificando sesión...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#06111f] text-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <Link href="/dashboard" className="text-xl font-bold tracking-tight">
            🏖️ El Lago
          </Link>
          <button className="lg:hidden text-white/60 hover:text-white" onClick={() => setSidebarOpen(false)}>
            ✕
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {nav.map((item) => {
            const active = item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 px-3 py-4">
          <button
            onClick={() => { clearToken(); router.push("/dashboard/login"); }}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
          >
            🔒 Cerrar sesión
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1">
        <header className="flex items-center gap-4 border-b bg-white px-6 py-4 lg:px-8">
          <button className="lg:hidden text-gray-600" onClick={() => setSidebarOpen(true)}>
            ☰
          </button>
          <h2 className="text-lg font-semibold text-gray-800">
            {nav.find((n) => n.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(n.href))?.label || "Dashboard"}
          </h2>
        </header>
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
