from django.urls import path

from recipes.views.recipe_views import (
    RecipeListCreateView,
    RecipeDetailView,
    RecipeSearchView,
)
from recipes.views.auth_views import (
    RegisterView,
    ProfileView,
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from recipes.views.favorite_views import (
    FavoriteListView,
    FavoriteToggleView,
)
urlpatterns = [

    path(
        "recipes/",
        RecipeListCreateView.as_view(),
        name="recipe-list-create"
    ),

    path(
        "recipes/<int:pk>/",
        RecipeDetailView.as_view(),
        name="recipe-detail"
    ),
    path(
        "register/",
         RegisterView.as_view(),
         name="register"
    ),
    path(
        "login/",
        TokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),

    path(
        "token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),
    path(
        "profile/",
        ProfileView.as_view(),
        name="profile"
    ),
    path(
        "favorites/",
        FavoriteListView.as_view(),
        name="favorite-list"
    ),

    path(
        "favorites/toggle/",
        FavoriteToggleView.as_view(),
        name="favorite-toggle"
    ),
    path(
        "recipes/search/",
        RecipeSearchView.as_view(),
        name="recipe-search"
    ),

]