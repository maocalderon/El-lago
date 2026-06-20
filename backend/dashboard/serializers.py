from rest_framework import serializers

from reservations.models import Reservation

from .models import MessageTemplate


class ReservationListSerializer(serializers.ModelSerializer):
    zone_name = serializers.CharField(source="zone.name", read_only=True)
    zone_slug = serializers.CharField(source="zone.slug", read_only=True)

    class Meta:
        model = Reservation
        fields = [
            "id",
            "zone_name",
            "zone_slug",
            "name",
            "phone",
            "email",
            "people",
            "date",
            "time",
            "end_time",
            "comments",
            "status",
            "created_at",
        ]


class ReservationStatusSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=["confirmed", "cancelled"])
    custom_message = serializers.CharField(required=False, allow_blank=True)

    def validate_status(self, value):
        if value not in ("confirmed", "cancelled"):
            raise serializers.ValidationError("Estado inválido.")
        return value


class MessageTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = MessageTemplate
        fields = ["id", "type", "subject", "body_text", "body_html"]

    def validate_type(self, value):
        if value not in ("confirmed", "cancelled"):
            raise serializers.ValidationError("Tipo inválido.")
        return value
