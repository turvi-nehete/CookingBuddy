from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from recipes.models import Favorite
from recipes.serializers.favorite_serializers import (
    FavoriteSerializer
)


class FavoriteListView(
    generics.ListAPIView
):

    serializer_class = FavoriteSerializer

    permission_classes = [
        IsAuthenticated
    ]

    def get_queryset(self):
        return Favorite.objects.filter(
            user=self.request.user
        )


#to add favs and remove from favs
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from recipes.models import Recipe

class FavoriteToggleView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        recipe_id = request.data.get("recipe_id")

        try:
            recipe = Recipe.objects.get(
                id=recipe_id
            )

        except Recipe.DoesNotExist:
            return Response(
                {
                    "error": "Recipe not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        favorite = Favorite.objects.filter(
            user=request.user,
            recipe=recipe
        ).first()

        if favorite:
            favorite.delete()

            return Response(
                {
                    "message": "Removed from favorites"
                }
            )

        Favorite.objects.create(
            user=request.user,
            recipe=recipe
        )

        return Response(
            {
                "message": "Added to favorites"
            }
        )