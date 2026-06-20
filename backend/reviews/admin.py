from django.contrib import admin

from .models import Review


@admin.action(description="Aprobar reseñas seleccionadas")
def approve_reviews(modeladmin, request, queryset):
    queryset.update(approved=True)


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ["name", "rating", "approved", "created_at"]
    list_filter = ["approved", "created_at"]
    search_fields = ["name", "comment"]
    actions = [approve_reviews]
    list_editable = ["approved"]
