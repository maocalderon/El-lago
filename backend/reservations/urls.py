from django.urls import path

from .views import (
    AvailabilityCheckView,
    ReservationCancelView,
    ReservationConfirmView,
    ReservationCreateView,
)

urlpatterns = [
    path("reservations/", ReservationCreateView.as_view(), name="create-reservation"),
    path(
        "reservations/<uuid:token>/confirm/",
        ReservationConfirmView.as_view(),
        name="confirm-reservation",
    ),
    path(
        "reservations/<uuid:token>/cancel/",
        ReservationCancelView.as_view(),
        name="cancel-reservation",
    ),
    path("availability/", AvailabilityCheckView.as_view(), name="check-availability"),
]
