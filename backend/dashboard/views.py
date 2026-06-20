import datetime

from django.conf import settings
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from reservations.models import Reservation

from .models import MessageTemplate
from .serializers import (
    MessageTemplateSerializer,
    ReservationListSerializer,
    ReservationStatusSerializer,
)


def _render_template(text, r):
    placeholders = {
        "{name}": r.name,
        "{zone}": r.zone.name,
        "{date}": r.date,
        "{time}": r.time,
        "{people}": str(r.people),
        "{phone}": r.phone,
        "{email}": r.email,
    }
    for k, v in placeholders.items():
        text = text.replace(k, v)
    return text


def _get_or_create_templates():
    confirmed = MessageTemplate.objects.filter(type="confirmed").first()
    cancelled = MessageTemplate.objects.filter(type="cancelled").first()

    if not confirmed:
        confirmed = MessageTemplate.get_default_confirmed()
        confirmed.save()

    if not cancelled:
        cancelled = MessageTemplate.get_default_cancelled()
        cancelled.save()

    return confirmed, cancelled


@api_view(["POST"])
def login_view(request):
    username = request.data.get("username", "")
    password = request.data.get("password", "")
    user = authenticate(username=username, password=password)

    if not user or not user.is_active:
        return Response(
            {"error": "Credenciales inválidas."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    token, _ = Token.objects.get_or_create(user=user)
    return Response({"token": token.key, "username": user.username})


class ReservationListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        queryset = Reservation.objects.select_related("zone").all()

        status_filter = request.query_params.get("status")
        if status_filter in ("pending", "confirmed", "cancelled"):
            queryset = queryset.filter(status=status_filter)

        date_filter = request.query_params.get("date")
        if date_filter:
            queryset = queryset.filter(date=date_filter)

        zone_filter = request.query_params.get("zone")
        if zone_filter:
            queryset = queryset.filter(zone__slug=zone_filter)

        serializer = ReservationListSerializer(queryset, many=True)
        return Response(serializer.data)


class ReservationDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            reservation = Reservation.objects.select_related("zone").get(pk=pk)
        except Reservation.DoesNotExist:
            return Response(
                {"error": "Reserva no encontrada."},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = ReservationListSerializer(reservation)
        return Response(serializer.data)


class ReservationStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        try:
            reservation = Reservation.objects.get(pk=pk)
        except Reservation.DoesNotExist:
            return Response(
                {"error": "Reserva no encontrada."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = ReservationStatusSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        new_status = serializer.validated_data["status"]
        custom_message = serializer.validated_data.get("custom_message")

        if reservation.status == new_status:
            return Response(
                {"error": f"La reserva ya está {reservation.get_status_display().lower()}."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        reservation.status = new_status
        reservation.save(update_fields=["status"])

        confirmed_template, cancelled_template = _get_or_create_templates()
        template = confirmed_template if new_status == "confirmed" else cancelled_template

        subject = template.subject
        body_text = _render_template(template.body_text, reservation)
        body_html = _render_template(template.body_html, reservation)

        if custom_message:
            body_text = custom_message
            body_html = f"<p>{custom_message}</p>"

        try:
            send_mail(
                subject=subject,
                message=body_text,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[reservation.email],
                html_message=body_html,
                fail_silently=False,
            )
            email_sent = True
        except Exception:
            email_sent = False

        phone_clean = reservation.phone.replace(" ", "").replace("-", "")
        if not phone_clean.startswith("57"):
            phone_clean = f"57{phone_clean}"

        wa_message = (
            f"Hola {reservation.name}, tu reserva en Restaurante El Lago "
            f"del {reservation.date} a las {reservation.time} "
            f"{'ha sido confirmada' if new_status == 'confirmed' else 'no pudo ser confirmada'}. "
            f"Te esperamos." if new_status == "confirmed" else
            f"Puedes contactarnos para agendar un nuevo horario."
        )
        whatsapp_url = f"https://wa.me/{phone_clean}?text={wa_message}"

        return Response({
            "status": new_status,
            "email_sent": email_sent,
            "whatsapp_url": whatsapp_url,
            "client_name": reservation.name,
            "client_phone": reservation.phone,
            "client_email": reservation.email,
        })


class AgendaView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        date_str = request.query_params.get("date")
        if not date_str:
            date_str = datetime.date.today().isoformat()

        try:
            datetime.date.fromisoformat(date_str)
        except ValueError:
            return Response(
                {"error": "Fecha inválida. Usa el formato YYYY-MM-DD."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        reservations = Reservation.objects.select_related("zone").filter(date=date_str).order_by("time")
        zone_filter = request.query_params.get("zone")
        if zone_filter:
            reservations = reservations.filter(zone__slug=zone_filter)

        serializer = ReservationListSerializer(reservations, many=True)
        return Response({
            "date": date_str,
            "reservations": serializer.data,
        })


class MessageTemplateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        confirmed, cancelled = _get_or_create_templates()
        return Response({
            "confirmed": MessageTemplateSerializer(confirmed).data,
            "cancelled": MessageTemplateSerializer(cancelled).data,
        })

    def patch(self, request):
        type_ = request.data.get("type")
        if type_ not in ("confirmed", "cancelled"):
            return Response(
                {"error": "Tipo inválido. Usa 'confirmed' o 'cancelled'."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        template, _ = MessageTemplate.objects.get_or_create(
            type=type_,
            defaults=(
                MessageTemplate.get_default_confirmed().__dict__
                if type_ == "confirmed"
                else MessageTemplate.get_default_cancelled().__dict__
            ),
        )

        serializer = MessageTemplateSerializer(template, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response(serializer.data)
