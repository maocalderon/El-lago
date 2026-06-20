from django.conf import settings
from django.core.mail import send_mail
from django.urls import reverse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Reservation
from .serializers import ReservationSerializer


class ReservationCreateView(APIView):
    def post(self, request):
        serializer = ReservationSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        reservation = serializer.save()

        try:
            self._send_restaurant_notification(reservation, request)
        except Exception as e:
            reservation.delete()
            return Response(
                {"error": f"No se pudo enviar el correo: {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response({"ok": True}, status=status.HTTP_201_CREATED)

    def _send_restaurant_notification(self, reservation, request):
        confirm_url = request.build_absolute_uri(
            reverse("confirm-reservation", kwargs={"token": reservation.token})
        )
        cancel_url = request.build_absolute_uri(
            reverse("cancel-reservation", kwargs={"token": reservation.token})
        )

        subject = f"Nueva reserva de {reservation.name}"
        message = (
            f"Nueva reserva recibida:\n\n"
            f"Zona: {reservation.zone.name}\n"
            f"Nombre: {reservation.name}\n"
            f"Teléfono: {reservation.phone}\n"
            f"Correo: {reservation.email}\n"
            f"Personas: {reservation.people}\n"
            f"Fecha: {reservation.date}\n"
            f"Hora: {reservation.time}\n"
            f"{f'Hora fin: {reservation.end_time}\n' if reservation.end_time else ''}"
            f"Comentarios: {reservation.comments}\n\n"
            f"Para confirmar: {confirm_url}\n"
            f"Para rechazar: {cancel_url}"
        )
        html_message = f"""
            <h1>Nueva reserva recibida</h1>
            <p><strong>Zona:</strong> {reservation.zone.name}</p>
            <p><strong>Nombre:</strong> {reservation.name}</p>
            <p><strong>Teléfono:</strong> {reservation.phone}</p>
            <p><strong>Correo:</strong> {reservation.email}</p>
            <p><strong>Personas:</strong> {reservation.people}</p>
            <p><strong>Fecha:</strong> {reservation.date}</p>
            <p><strong>Hora:</strong> {reservation.time}</p>
            {f'<p><strong>Hora fin:</strong> {reservation.end_time}</p>' if reservation.end_time else ''}
            <p><strong>Comentarios:</strong><br/>{reservation.comments}</p>
            <div style="margin-top:24px;">
              <a href="{confirm_url}"
                 style="background-color:#22c55e;color:#fff;padding:12px 28px;text-decoration:none;border-radius:6px;font-size:16px;display:inline-block;">
                ✅ Aceptar Reserva
              </a>
              <a href="{cancel_url}"
                 style="background-color:#ef4444;color:#fff;padding:12px 28px;text-decoration:none;border-radius:6px;font-size:16px;display:inline-block;margin-left:12px;">
                ❌ Rechazar Reserva
              </a>
            </div>
        """

        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.RESERVATION_EMAIL_TO],
            html_message=html_message,
            fail_silently=False,
        )


class ReservationConfirmView(APIView):
    def get(self, request, token):
        try:
            reservation = Reservation.objects.get(token=token, status="pending")
        except Reservation.DoesNotExist:
            return Response(
                {"error": "Reserva no encontrada o ya fue procesada."},
                status=status.HTTP_404_NOT_FOUND,
            )

        reservation.status = "confirmed"
        reservation.save(update_fields=["status"])

        try:
            self._send_client_confirmation(reservation)
        except Exception:
            pass

        return Response(
            {"ok": True, "message": "Reserva confirmada. El cliente recibirá un correo de confirmación."}
        )

    def _send_client_confirmation(self, reservation):
        subject = "Reserva confirmada — Restaurante El Lago"
        message = (
            f"Hola {reservation.name},\n\n"
            f"Tu reserva en Restaurante El Lago ha sido confirmada.\n\n"
            f"Zona: {reservation.zone.name}\n"
            f"Fecha: {reservation.date}\n"
            f"Hora: {reservation.time}\n"
            f"Personas: {reservation.people}\n\n"
            f"Te esperamos.\n"
            f"Restaurante El Lago"
        )
        html_message = f"""
            <h1>Reserva Confirmada</h1>
            <p>Hola <strong>{reservation.name}</strong>,</p>
            <p>Tu reserva en Restaurante El Lago ha sido confirmada.</p>
            <table style="margin-top:16px;">
              <tr><td><strong>Zona:</strong></td><td>{reservation.zone.name}</td></tr>
              <tr><td><strong>Fecha:</strong></td><td>{reservation.date}</td></tr>
              <tr><td><strong>Hora:</strong></td><td>{reservation.time}</td></tr>
              <tr><td><strong>Personas:</strong></td><td>{reservation.people}</td></tr>
            </table>
            <p style="margin-top:16px;">Te esperamos.<br><strong>Restaurante El Lago</strong></p>
        """

        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[reservation.email],
            html_message=html_message,
            fail_silently=False,
        )


class ReservationCancelView(APIView):
    def get(self, request, token):
        try:
            reservation = Reservation.objects.get(token=token)
        except Reservation.DoesNotExist:
            return Response(
                {"error": "Reserva no encontrada."},
                status=status.HTTP_404_NOT_FOUND,
            )

        if reservation.status == "cancelled":
            return Response(
                {"ok": True, "message": "Esta reserva ya estaba cancelada."}
            )

        reservation.status = "cancelled"
        reservation.save(update_fields=["status"])

        try:
            self._send_client_cancellation(reservation)
        except Exception:
            pass

        return Response(
            {"ok": True, "message": "Reserva cancelada. El cliente recibirá un correo de aviso."}
        )

    def _send_client_cancellation(self, reservation):
        subject = "Reserva cancelada — Restaurante El Lago"
        message = (
            f"Hola {reservation.name},\n\n"
            f"Lamentablemente tu reserva en Restaurante El Lago no pudo ser confirmada.\n\n"
            f"Zona: {reservation.zone.name}\n"
            f"Fecha: {reservation.date}\n"
            f"Hora: {reservation.time}\n\n"
            f"Te recomendamos contactarnos por WhatsApp para encontrar un nuevo horario.\n"
            f"Restaurante El Lago"
        )
        html_message = f"""
            <h1>Reserva Cancelada</h1>
            <p>Hola <strong>{reservation.name}</strong>,</p>
            <p>Lamentablemente tu reserva en Restaurante El Lago no pudo ser confirmada.</p>
            <p>Te recomendamos contactarnos por WhatsApp para encontrar un nuevo horario.</p>
            <p style="margin-top:16px;"><strong>Restaurante El Lago</strong></p>
        """

        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[reservation.email],
            html_message=html_message,
            fail_silently=False,
        )


class AvailabilityCheckView(APIView):
    def get(self, request):
        zone_slug = request.query_params.get("zone")
        date_str = request.query_params.get("date")

        if zone_slug != "salon-eventos":
            return Response({"available": True})

        if not date_str:
            return Response(
                {"error": "Se requiere el parámetro 'date'."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        from .models import Zone as ZoneModel

        try:
            zone = ZoneModel.objects.get(slug="salon-eventos")
        except ZoneModel.DoesNotExist:
            return Response({"blocks": []})

        reservations = Reservation.objects.filter(
            zone=zone, date=date_str, status__in=("pending", "confirmed")
        ).values("time", "end_time")

        return Response({"blocks": list(reservations)})
