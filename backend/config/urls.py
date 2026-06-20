from django.conf import settings
from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path
from django.views.generic.base import RedirectView

from dashboard import views as dashboard_views


def health(request):
    return JsonResponse({"status": "ok"})


urlpatterns = [
    path("health/", health, name="health"),
    path("admin/", admin.site.urls),
    path("api/", include("reservations.urls")),
    path("api/", include("reviews.urls")),
    path("api/", include("dashboard.urls")),
    path("api/auth/login/", dashboard_views.login_view, name="dashboard-login"),
    path("", RedirectView.as_view(url="/admin/"), name="frontend"),
]
