import type { ReservationInput } from "@/types/firestore";

export async function sendReservationNotification(data: ReservationInput) {
  const response = await fetch("/api/reservations", {
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
