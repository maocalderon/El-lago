import type { ReservationInput } from "@/types/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function sendReservationNotification(data: ReservationInput) {
  const response = await fetch(`${API_URL}/api/reservations/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Error al enviar el correo: ${message}`);
  }
}
