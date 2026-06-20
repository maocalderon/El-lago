from rest_framework import serializers

from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["id", "name", "rating", "comment", "created_at"]

    def validate_name(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError(
                "El nombre debe tener al menos 2 caracteres."
            )
        return value.strip()

    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError(
                "La calificación debe ser entre 1 y 5."
            )
        return value

    def validate_comment(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Agrega un comentario.")
        return value.strip()


class ReviewReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["id", "name", "rating", "comment", "created_at"]
