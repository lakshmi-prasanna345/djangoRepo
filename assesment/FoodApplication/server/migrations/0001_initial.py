# Generated by Django 4.2.4 on 2023-08-31 06:13

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('recipeName', models.CharField(max_length=255)),
                ('recipeDescription', models.TextField()),
                ('recipeType', models.CharField(choices=[('vegetarian', 'Vegetarian'), ('non-vegetarian', 'Non-Vegetarian')], max_length=15)),
                ('recipeCreatedAt', models.DateField(auto_now_add=True)),
                ('recipeImageUrl', models.URLField()),
            ],
        ),
    ]
