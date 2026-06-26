from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    COOKING_LEVELS = [
        ("BEGINNER","Beginner"),
        ("INTERMEDIATE","Intermediate"),
        ("PRO","Pro"),
    ]
    cooking_level = models.CharField(max_length=20,choices=COOKING_LEVELS, blank=True, null=True)

    user = models.OneToOneField(User, on_delete= models.CASCADE, related_name="profile")
        #one profile one user, related name --> user.profile

    profile_picture = models.ImageField( upload_to="profiles/",blank=True,null=True)
        #optional for forms , db

    bio = models.TextField(blank=True , null= True)

    fav_cuisine =models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"


class Recipe(models.Model):

    DIFFICULTY_CHOICES =[
        ("EASY","Easy"),
        ("MEDIUM","Medium"),
        ("HARD","Hard"),
    ]
    difficulty =models.CharField(max_length=20,choices=DIFFICULTY_CHOICES, blank=True,null= True)

    user= models.ForeignKey(User, on_delete= models.CASCADE, related_name="recipes")

    title=models.CharField(max_length=200)
    description=models.TextField()
    ingredients=models.TextField()
    instructions=models.TextField()
    image= models.ImageField(upload_to="recipes/", blank=True,null=True)
    prep_time = models.PositiveIntegerField(blank=True,null=True)
    cook_time = models.PositiveIntegerField(blank=True,null=True)

    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Favorite(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name="favorites")

    recipe = models.ForeignKey(Recipe,on_delete=models.CASCADE,related_name="favorited_by")

    created_at = models.DateTimeField( auto_now_add=True)

    class Meta:
        unique_together = ["user", "recipe"]

    def __str__(self):
        return f"{self.user.username} ❤️ {self.recipe.title}"

    


