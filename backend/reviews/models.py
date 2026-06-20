from django.db import models


class Review(models.Model):
    name = models.CharField("Nombre", max_length=80)
    rating = models.PositiveSmallIntegerField("Calificación")
    comment = models.TextField("Comentario", max_length=500)
    approved = models.BooleanField("Aprobada", default=False)
    created_at = models.DateTimeField("Creado", auto_now_add=True)

    class Meta:
        verbose_name = "Reseña"
        verbose_name_plural = "Reseñas"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} - {self.rating} estrellas"
