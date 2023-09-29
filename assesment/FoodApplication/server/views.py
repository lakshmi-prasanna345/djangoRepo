from django.shortcuts import render
from .models import Recipe
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializer import ServerSerializer
from django.db.models import Q
from datetime import datetime,timedelta,timezone

# Create your views here.
def index(request):
    return render(request,'index.html')

class Serverview(APIView):
    def get(self, request):
        try:
            queryset = Recipe.objects.all()
            serializer = ServerSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            serializer = ServerSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, id):
        try:
            getdata = Recipe.objects.get(pk=id)
            if not getdata:
                return Response(status=status.HTTP_404_NOT_FOUND)
            
            serializer = ServerSerializer(getdata, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Recipe.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, id):
        try:
            getdata = Recipe.objects.get(pk=id)
            if not getdata:
                return Response(status=status.HTTP_404_NOT_FOUND)
            getdata.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Recipe.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def post1(self, request):
        data_type = request.data.get('data_type')
        today = datetime.now()
        
        if data_type == 'this_week':
            start_of_week = today - timedelta(days=today.weekday())
            end_of_week = start_of_week + timedelta(days=6)
            products = Recipe.objects.filter(dateandtime__range=[start_of_week, end_of_week])
        elif data_type == 'last_week':
            start_of_last_week = today - timedelta(days=today.weekday() + 7)
            end_of_last_week = start_of_last_week + timedelta(days=6)
            recipes = Recipe.objects.filter(dateandtime__range=[start_of_last_week, end_of_last_week])
        else:
            return Response({"error": "Invalid data_type"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = ServerSerializer(recipes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
