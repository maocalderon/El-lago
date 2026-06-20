from rest_framework import serializers

from .models import Reservation, Zone


class ReservationSerializer(serializers.ModelSerializer):
    zone = serializers.SlugRelatedField(slug_field="slug", queryset=Zone.objects.all())

    class Meta:
        model = Reservation
        fields = [
            "zone",
            "name",
            "phone",
            "email",
            "people",
            "date",
            "time",
            "end_time",
            "comments",
        ]

    def validate_name(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError("El nombre debe tener al menos 2 caracteres.")
        return value.strip()

    def validate_phone(self, value):
        if len(value.strip()) < 7:
            raise serializers.ValidationError("El teléfono debe tener al menos 7 dígitos.")
        return value.strip()

    def validate_people(self, value):
        if value < 1 or value > 40:
            raise serializers.ValidationError("Las personas deben ser entre 1 y 40.")
        return value

    def validate_comments(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Agrega un comentario.")
        return value.strip()
