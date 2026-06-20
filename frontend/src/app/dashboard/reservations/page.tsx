"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { apiGet } from "@/lib/api";
import type { DashboardReservation, ReservationStatus } from "@/types/api";
import { ZONES } from "@/types/api";

const statusColors: Record<ReservationStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusLabels: Record<ReservationStatus, string> = {
  pending: "Pendiente",
  confirmed: "Confirmada",
  cancelled: "Cancelada",
};

const zoneColors: Record<string, string> = {
  restaurante: "bg-blue-100 text-blue-800",
  piscina: "bg-cyan-100 text-cyan-800",
  "salon-eventos": "bg-purple-100 text-purple-800",
};

const zoneNames: Record<string, string> = Object.fromEntries(
  ZONES.map((z) => [z.slug, z.name])
);

export default function ReservationsPage() {
  const searchParams = useSearchParams();
  const [reservations, setReservations] = useState<DashboardReservation[]>([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<ReservationStatus | "all">(
    (searchParams.get("status") as ReservationStatus) || "all"
  );
  const [zoneFilter, setZoneFilter] = useState<string>("all");

  useEffect(() => {
    setError("");
    const params = new URLSearchParams();
    if (filter !== "all") params.set("status", filter);
    if (zoneFilter !== "all") params.set("zone", zoneFilter);
    apiGet<DashboardReservation[]>(`/api/dashboard/reservations/?${params}`)
      .then(setReservations)
      .catch((e) => setError(e instanceof Error ? e.message : "Error al cargar"));
  }, [filter, zoneFilter]);

  const statusTabs: { key: ReservationStatus | "all"; label: string }[] = [
    { key: "all", label: "Todas" },
    { key: "pending", label: "Pendientes" },
    { key: "confirmed", label: "Confirmadas" },
    { key: "cancelled", label: "Canceladas" },
  ];

  const zoneTabs = [
    { key: "all", label: "Todas las zonas" },
    ...ZONES.map((z) => ({ key: z.slug, label: z.name })),
  ];

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {statusTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filter === tab.key
                ? "bg-[#0f8fc7] text-white"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {zoneTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setZoneFilter(tab.key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              zoneFilter === tab.key
                ? "bg-[#061d35] text-white"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {!error && reservations.length === 0 ? (
        <p className="py-10 text-center text-gray-400">No hay reservas en esta categoría.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Zona</th>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Hora</th>
                <th className="px-4 py-3">Personas</th>
                <th className="px-4 py-3">Teléfono</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {reservations.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColors[r.status]}`}>
                      {statusLabels[r.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${zoneColors[r.zone_slug] || "bg-gray-100 text-gray-800"}`}>
                      {r.zone_name}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">{r.name}</td>
                  <td className="px-4 py-3 text-gray-600">{r.date}</td>
                  <td className="px-4 py-3 text-gray-600">{r.time}{r.end_time ? `-${r.end_time}` : ""}</td>
                  <td className="px-4 py-3 text-gray-600">{r.people}</td>
                  <td className="px-4 py-3 text-gray-600">{r.phone}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/dashboard/reservations/${r.id}`}
                      className="text-sm font-medium text-[#0f8fc7] hover:underline"
                    >
                      Ver
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
