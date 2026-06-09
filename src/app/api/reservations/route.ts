import { NextResponse } from "next/server";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getFirestoreDb } from "@/lib/firebase";
import { sendReservationEmail } from "@/lib/mailer";
import type { ReservationInput } from "@/types/firestore";

export async function POST(request: Request) {
  const payload = (await request.json()) as ReservationInput;

  if (
    !payload?.name ||
    !payload?.phone ||
    !payload?.email ||
    !payload?.people ||
    !payload?.date ||
    !payload?.time
  ) {
    return NextResponse.json(
      { error: "El cuerpo de la solicitud es incompleto." },
      { status: 400 }
    );
  }

  const db = getFirestoreDb();

  if (!db) {
    return NextResponse.json(
      { error: "Firebase no está configurado." },
      { status: 500 }
    );
  }

  try {
    await addDoc(collection(db, "reservations"), {
      ...payload,
      status: "pending",
      createdAt: serverTimestamp()
    });

    await sendReservationEmail(payload);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Error guardando reserva o enviando correo:", message);
    return NextResponse.json(
      { error: `No se pudo guardar la reserva o enviar el correo: ${message}` },
      { status: 500 }
    );
  }
}
