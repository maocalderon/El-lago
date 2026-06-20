from django.db import models


class MessageTemplate(models.Model):
    TYPE_CHOICES = [
        ("confirmed", "Confirmación"),
        ("cancelled", "Cancelación"),
    ]

    type = models.CharField("Tipo", max_length=20, choices=TYPE_CHOICES, unique=True)
    subject = models.CharField("Asunto", max_length=200, default="Tu reserva en Restaurante El Lago")
    body_text = models.TextField("Cuerpo (texto plano)")
    body_html = models.TextField("Cuerpo (HTML)")

    class Meta:
        verbose_name = "Plantilla de mensaje"
        verbose_name_plural = "Plantillas de mensaje"

    def __str__(self):
        return self.get_type_display()

    @classmethod
    def get_default_confirmed(cls):
        return cls(
            type="confirmed",
            subject="Reserva confirmada — Restaurante El Lago",
            body_text=(
                "Hola {name},\n\n"
                "Tu reserva en Restaurante El Lago ha sido confirmada.\n\n"
                "Zona: {zone}\n"
                "Fecha: {date}\n"
                "Hora: {time}\n"
                "Personas: {people}\n\n"
                "Te esperamos.\n"
                "Restaurante El Lago"
            ),
            body_html=(
                "<h1>Reserva Confirmada</h1>"
                "<p>Hola <strong>{name}</strong>,</p>"
                "<p>Tu reserva en Restaurante El Lago ha sido confirmada.</p>"
                "<table style='margin-top:16px;'>"
                "<tr><td><strong>Zona:</strong></td><td>{zone}</td></tr>"
                "<tr><td><strong>Fecha:</strong></td><td>{date}</td></tr>"
                "<tr><td><strong>Hora:</strong></td><td>{time}</td></tr>"
                "<tr><td><strong>Personas:</strong></td><td>{people}</td></tr>"
                "</table>"
                "<p style='margin-top:16px;'>Te esperamos.<br><strong>Restaurante El Lago</strong></p>"
            ),
        )

    @classmethod
    def get_default_cancelled(cls):
        return cls(
            type="cancelled",
            subject="Reserva cancelada — Restaurante El Lago",
            body_text=(
                "Hola {name},\n\n"
                "Lamentablemente tu reserva en Restaurante El Lago no pudo ser confirmada.\n\n"
                "Zona: {zone}\n"
                "Fecha: {date}\n"
                "Hora: {time}\n\n"
                "Puedes contactarnos por WhatsApp para encontrar un nuevo horario.\n"
                "Restaurante El Lago"
            ),
            body_html=(
                "<h1>Reserva Cancelada</h1>"
                "<p>Hola <strong>{name}</strong>,</p>"
                "<p>Lamentablemente tu reserva en Restaurante El Lago no pudo ser confirmada.</p>"
                "<p>Te recomendamos contactarnos por WhatsApp para encontrar un nuevo horario.</p>"
                "<p style='margin-top:16px;'><strong>Restaurante El Lago</strong></p>"
            ),
        )
