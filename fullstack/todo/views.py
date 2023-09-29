from django.shortcuts import render
from rest_framework import viewsets
from .serializer import TodoSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Todo
# Create your views here.
class Todoview(APIView):
    def get(self,request):
        queryset=Todo.objects.all()
        serializer=TodoSerializer(queryset,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    def post(self,request):
        serializer=TodoSerializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    def put(self, request, id):
        getdata = Todo.objects.get(pk=id)
        if not getdata:  
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = TodoSerializer(getdata, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self,request,id):
        getdata=Todo.objects.get(pk=id)
        if not getdata:
            return Response(status=status.HTTP_404_NOT_FOUND)
        getdata.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)