export type ZoneSlug = "restaurante" | "piscina" | "salon-eventos";

export const ZONES: { slug: ZoneSlug; name: string }[] = [
  { slug: "restaurante", name: "Restaurante" },
  { slug: "piscina", name: "Piscina" },
  { slug: "salon-eventos", name: "Salón de Eventos" },
];

export type ReservationInput = {
  zone: ZoneSlug;
  name: string;
  phone: string;
  email: string;
  people: number;
  date: string;
  time: string;
  end_time: string;
  comments: string;
};

export type ReviewInput = {
  name: string;
  rating: number;
  comment: string;
};

export type ApprovedReview = {
  id: number;
  name: string;
  rating: number;
  comment: string;
  created_at?: string | null;
};

export type ReservationStatus = "pending" | "confirmed" | "cancelled";

export type DashboardReservation = {
  id: number;
  zone_name: string;
  zone_slug: string;
  name: string;
  phone: string;
  email: string;
  people: number;
  date: string;
  time: string;
  end_time: string;
  comments: string;
  status: ReservationStatus;
  created_at: string;
};

export type MessageTemplate = {
  id: number;
  type: "confirmed" | "cancelled";
  subject: string;
  body_text: string;
  body_html: string;
};

export type AgendaDay = {
  date: string;
  reservations: DashboardReservation[];
};

export type StatusChangeResponse = {
  status: ReservationStatus;
  email_sent: boolean;
  whatsapp_url: string;
  client_name: string;
  client_phone: string;
  client_email: string;
};
