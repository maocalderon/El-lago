from django.urls import path

from .views import ReviewCreateView, ReviewListView

urlpatterns = [
    path("reviews/", ReviewListView.as_view(), name="list-reviews"),
    path("reviews/create/", ReviewCreateView.as_view(), name="create-review"),
]
