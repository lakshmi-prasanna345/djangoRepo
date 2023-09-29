from django.db import models

class Recipe(models.Model):
    recipeName = models.CharField(max_length=255)
    recipeDescription = models.TextField()
    # recipeType = models.CharField(max_length=15, choices=[('vegetarian', 'Vegetarian'), ('non-vegetarian', 'Non-Vegetarian')])
    # recipeCreatedAt = models.DateField(auto_now_add=True)
    # recipeImageUrl = models.URLField()

    def __str__(self):
        return self.recipeName
    class Meta:
        db_table = 'recipe'  
