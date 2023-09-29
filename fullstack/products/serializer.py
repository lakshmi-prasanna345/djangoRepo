from .models import ProductsList
from rest_framework import serializers
from django.conf import settings
from students.models import Students
from products.models import ChartData

class ProductsSerializer(serializers.ModelSerializer):
    pimage=serializers.SerializerMethodField()
    class Meta:
        model=ProductsList
        fields="__all__"
        depth=4
    def get_pimage(self,obj):
        if obj.pimage:
            return f"{settings.BASE_URL}{obj.pimage}"
        else:
            return None

class ChartDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChartData
        fields = '__all__'
