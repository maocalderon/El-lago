"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiGet } from "@/lib/api";
import type { AgendaDay, ReservationStatus, DashboardReservation } from "@/types/api";
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
  restaurante: "text-blue-800 bg-blue-50 border-blue-200",
  piscina: "text-cyan-800 bg-cyan-50 border-cyan-200",
  "salon-eventos": "text-purple-800 bg-purple-50 border-purple-200",
};

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function groupByTime(reservations: DashboardReservation[]) {
  const groups: Record<string, DashboardReservation[]> = {};
  for (const r of reservations) {
    const key = r.time;
    if (!groups[key]) groups[key] = [];
    groups[key].push(r);
  }
  return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
}

export default function AgendaPage() {
  const [date, setDate] = useState(todayISO());
  const [agenda, setAgenda] = useState<AgendaDay | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [zoneFilter, setZoneFilter] = useState<string>("all");

  useEffect(() => {
    setLoading(true);
    setError("");
    const params = new URLSearchParams({ date });
    if (zoneFilter !== "all") params.set("zone", zoneFilter);
    apiGet<AgendaDay>(`/api/dashboard/agenda/?${params}`)
      .then(setAgenda)
      .catch((e) => { setAgenda(null); setError(e instanceof Error ? e.message : "Error al cargar"); })
      .finally(() => setLoading(false));
  }, [date, zoneFilter]);

  const timeGroups = agenda ? groupByTime(agenda.reservations) : [];

  const zoneTabs = [
    { key: "all", label: "Todas" },
    ...ZONES.map((z) => ({ key: z.slug, label: z.name })),
  ];

  if (loading) {
    return (
      <div>
        <div className="mb-6"><label className="block text-sm font-semibold text-gray-700">Fecha</label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm" /></div>
        <p className="py-10 text-center text-gray-400">Cargando agenda...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700">Fecha</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#0f8fc7] focus:outline-none"
        />
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

      {!error && timeGroups.length === 0 ? (
        <div className="rounded-lg border bg-white p-10 text-center">
          <p className="text-gray-400">No hay reservas para esta fecha.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {timeGroups.map(([time, reservations]) => (
            <div key={time} className="rounded-lg border bg-white">
              <div className="border-b bg-gray-50 px-5 py-3">
                <span className="text-lg font-bold text-gray-800">{time}</span>
                <span className="ml-3 text-sm text-gray-500">({reservations.length} reserva{reservations.length !== 1 ? "s" : ""})</span>
              </div>
              <div className="divide-y">
                {reservations.map((r) => (
                  <Link
                    key={r.id}
                    href={`/dashboard/reservations/${r.id}`}
                    className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`rounded-md border px-2 py-0.5 text-xs font-semibold ${zoneColors[r.zone_slug] || "text-gray-600 bg-gray-50 border-gray-200"}`}>
                        {r.zone_name}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{r.name}</p>
                        <p className="text-xs text-gray-500">{r.people} personas · {r.phone}</p>
                      </div>
                    </div>
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColors[r.status]}`}
                    >
                      {statusLabels[r.status]}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
