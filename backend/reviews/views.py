from rest_framework import generics, mixins, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Review
from .serializers import ReviewReadSerializer, ReviewSerializer


class ReviewListView(generics.ListAPIView):
    queryset = Review.objects.filter(approved=True).order_by("-created_at")[:8]
    serializer_class = ReviewReadSerializer


class ReviewCreateView(APIView):
    def post(self, request):
        serializer = ReviewSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save(approved=False)
        return Response({"ok": True}, status=status.HTTP_201_CREATED)
