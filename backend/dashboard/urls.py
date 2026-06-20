from django.urls import path

from . import views

urlpatterns = [
    path("dashboard/reservations/", views.ReservationListView.as_view(), name="dashboard-reservations"),
    path("dashboard/reservations/<int:pk>/", views.ReservationDetailView.as_view(), name="dashboard-reservation-detail"),
    path(
        "dashboard/reservations/<int:pk>/status/",
        views.ReservationStatusView.as_view(),
        name="dashboard-reservation-status",
    ),
    path("dashboard/agenda/", views.AgendaView.as_view(), name="dashboard-agenda"),
    path("dashboard/message-template/", views.MessageTemplateView.as_view(), name="dashboard-message-template"),
]
