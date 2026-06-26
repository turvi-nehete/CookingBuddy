from rest_framework import serializers
from recipes.models import Recipe


class RecipeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Recipe
        fields = "__all__"

        read_only_fields = [
            "created_at",
            "updated_at",
            "user"
        ]