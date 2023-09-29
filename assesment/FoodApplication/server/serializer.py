from rest_framework import serializers
from .models import Recipe

class ServerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'
