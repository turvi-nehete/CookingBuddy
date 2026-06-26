from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from recipes.models import Recipe
from recipes.serializers.recipe_serializers import RecipeSerializer


class RecipeListCreateView(
    generics.ListCreateAPIView
):

    serializer_class = RecipeSerializer

    permission_classes = [
        IsAuthenticated
    ]

    def get_queryset(self):
        return Recipe.objects.filter(
            user=self.request.user
        )

    def perform_create(
        self,
        serializer
    ):
        serializer.save(
            user=self.request.user
        )


class RecipeDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    serializer_class = RecipeSerializer

    permission_classes = [
        IsAuthenticated
    ]

    def get_queryset(self):
        return Recipe.objects.filter(
            user=self.request.user
        )
    
from rest_framework import generics
from recipes.models import Recipe
from recipes.serializers.recipe_serializers import RecipeSerializer

class RecipeSearchView(
    generics.ListAPIView
):

    serializer_class = RecipeSerializer

    permission_classes = [
        IsAuthenticated
    ]

    def get_queryset(self):

        query = self.request.GET.get(
            "q",
            ""
        )

        return Recipe.objects.filter(
            user=self.request.user,
            title__icontains=query
        )