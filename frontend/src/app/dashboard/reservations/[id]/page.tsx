"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { apiGet, apiPatch } from "@/lib/api";
import type { DashboardReservation, StatusChangeResponse } from "@/types/api";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusLabels: Record<string, string> = {
  pending: "Pendiente",
  confirmed: "Confirmada",
  cancelled: "Cancelada",
};

export default function ReservationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [reservation, setReservation] = useState<DashboardReservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [result, setResult] = useState<StatusChangeResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiGet<DashboardReservation>(`/api/dashboard/reservations/${id}/`)
      .then(setReservation)
      .catch(() => setError("No se pudo cargar la reserva."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleStatusChange = async (status: "confirmed" | "cancelled") => {
    if (!confirm(`¿Estás seguro de ${status === "confirmed" ? "confirmar" : "cancelar"} esta reserva?`)) return;

    setActionLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await apiPatch<StatusChangeResponse>(
        `/api/dashboard/reservations/${id}/status/`,
        { status }
      );
      setResult(data);
      setReservation((prev) => prev ? { ...prev, status } : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cambiar estado");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <p className="py-10 text-center text-gray-400">Cargando...</p>;
  if (error && !reservation) return <p className="py-10 text-center text-red-500">{error}</p>;
  if (!reservation) return <p className="py-10 text-center text-gray-400">Reserva no encontrada.</p>;

  const fields: { label: string; value: string }[] = [
    { label: "Zona", value: reservation.zone_name },
    { label: "Nombre", value: reservation.name },
    { label: "Teléfono", value: reservation.phone },
    { label: "Correo", value: reservation.email },
    { label: "Personas", value: String(reservation.people) },
    { label: "Fecha", value: reservation.date },
    { label: "Hora", value: reservation.time + (reservation.end_time ? ` - ${reservation.end_time}` : "") },
    { label: "Comentarios", value: reservation.comments },
  ];

  return (
    <div className="max-w-2xl">
      <Link href="/dashboard/reservations" className="mb-4 inline-block text-sm text-[#0f8fc7] hover:underline">
        ← Volver a reservas
      </Link>

      <div className="rounded-lg border bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800">Detalle de reserva</h3>
          <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusColors[reservation.status]}`}>
            {statusLabels[reservation.status]}
          </span>
        </div>

        <dl className="space-y-4">
          {fields.map((f) => (
            <div key={f.label} className="sm:flex sm:gap-4">
              <dt className="text-sm font-semibold text-gray-500 sm:w-32 sm:text-right">{f.label}</dt>
              <dd className="text-sm text-gray-800">{f.value}</dd>
            </div>
          ))}
        </dl>

        {reservation.status === "pending" && (
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => handleStatusChange("confirmed")}
              disabled={actionLoading}
              className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-50"
            >
              {actionLoading ? "Procesando..." : "✅ Aceptar reserva"}
            </button>
            <button
              onClick={() => handleStatusChange("cancelled")}
              disabled={actionLoading}
              className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
            >
              {actionLoading ? "Procesando..." : "❌ Rechazar reserva"}
            </button>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`mailto:${reservation.email}`}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            📧 {reservation.email}
          </a>
          <button
            onClick={() => navigator.clipboard.writeText(reservation.phone)}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            📋 Copiar teléfono
          </button>
        </div>
      </div>

      {result && (
        <div className="mt-6 rounded-lg border bg-white p-6">
          <h4 className="mb-3 text-lg font-semibold text-gray-800">Resultado de la acción</h4>

          <div className="space-y-3">
            {result.email_sent ? (
              <div className="rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">
                ✅ Correo enviado a <strong>{result.client_email}</strong>
              </div>
            ) : (
              <div className="rounded-md bg-yellow-50 px-4 py-3 text-sm text-yellow-700">
                ⚠️ No se pudo enviar el correo (revisa configuración SMTP).
              </div>
            )}

            <a
              href={result.whatsapp_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md bg-green-50 px-4 py-3 text-sm text-green-700 transition-colors hover:bg-green-100"
            >
              💬 Abrir WhatsApp con mensaje pre-cargado
            </a>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}
    </div>
  );
}
