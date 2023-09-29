from .models import Server
from rest_framework import serializers
from django.conf import settings
class ServerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Server
        fields="__all__"
    depth=4
    def get_Rimage(self,obj):
        if obj.Rimage:
            return f"{settings.BASE_URL}{obj.Rimage}"
        else:
            return None