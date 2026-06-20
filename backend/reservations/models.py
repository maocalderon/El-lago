import uuid

from django.db import models


class Zone(models.Model):
    ZONE_CHOICES = [
        ("restaurante", "Restaurante"),
        ("piscina", "Piscina"),
        ("salon-eventos", "Salón de Eventos"),
    ]

    slug = models.CharField("Identificador", max_length=20, choices=ZONE_CHOICES, unique=True)
    name = models.CharField("Nombre", max_length=80)

    class Meta:
        verbose_name = "Zona"
        verbose_name_plural = "Zonas"

    def __str__(self):
        return self.name


class Reservation(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pendiente"),
        ("confirmed", "Confirmada"),
        ("cancelled", "Cancelada"),
    ]

    token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    zone = models.ForeignKey(Zone, on_delete=models.PROTECT, verbose_name="Zona", null=True, blank=True)
    name = models.CharField("Nombre", max_length=80)
    phone = models.CharField("Teléfono", max_length=20)
    email = models.EmailField("Correo")
    people = models.PositiveSmallIntegerField("Personas")
    date = models.CharField("Fecha", max_length=10)
    time = models.CharField("Hora", max_length=5)
    end_time = models.CharField("Hora fin", max_length=5, blank=True, default="")
    comments = models.TextField("Comentarios", max_length=500)
    status = models.CharField(
        "Estado", max_length=20, choices=STATUS_CHOICES, default="pending"
    )
    created_at = models.DateTimeField("Creado", auto_now_add=True)

    class Meta:
        verbose_name = "Reserva"
        verbose_name_plural = "Reservas"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} - {self.date} {self.time}"
