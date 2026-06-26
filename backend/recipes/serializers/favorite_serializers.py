from rest_framework import serializers
from recipes.models import Favorite


class FavoriteSerializer(serializers.ModelSerializer):
 
    recipe_title = serializers.CharField(
        source="recipe.title",
        read_only=True
    )  # returns id and title 

    class Meta:
        model = Favorite
        fields = "__all__"