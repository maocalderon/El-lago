"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiGet } from "@/lib/api";
import type { DashboardReservation } from "@/types/api";

export default function DashboardHome() {
  const [reservations, setReservations] = useState<DashboardReservation[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiGet<DashboardReservation[]>("/api/dashboard/reservations/")
      .then(setReservations)
      .catch((e) => setError(e instanceof Error ? e.message : "Error al cargar"));
  }, []);

  const pending = reservations.filter((r) => r.status === "pending").length;
  const confirmed = reservations.filter((r) => r.status === "confirmed").length;
  const cancelled = reservations.filter((r) => r.status === "cancelled").length;

  const cards = [
    { label: "Pendientes", count: pending, color: "bg-yellow-50 text-yellow-800 border-yellow-200" },
    { label: "Confirmadas", count: confirmed, color: "bg-green-50 text-green-800 border-green-200" },
    { label: "Canceladas", count: cancelled, color: "bg-red-50 text-red-800 border-red-200" },
  ];

  return (
    <div>
      <h3 className="mb-6 text-xl font-semibold text-gray-800">Resumen del día</h3>

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={`/dashboard/reservations?status=${card.label.toLowerCase()}`}
            className={`rounded-lg border p-5 ${card.color} transition-shadow hover:shadow-md`}
          >
            <p className="text-3xl font-bold">{card.count}</p>
            <p className="mt-1 text-sm font-medium">{card.label}</p>
          </Link>
        ))}
      </div>

      {error && (
        <div className="mt-6 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {!error && reservations.length === 0 && (
        <p className="mt-10 text-center text-gray-400">No hay reservas registradas.</p>
      )}
    </div>
  );
}
