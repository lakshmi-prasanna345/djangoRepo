from django.shortcuts import render
from .models import Server
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializer import ServerSerializer
from django.db.models import Q

# Create your views here.
def index(request):
    return render(request,'index.html')

class Serverview(APIView):
    def get(self, request):
        try:
            queryset = Server.objects.all()
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
            getdata = Server.objects.get(pk=id)
            if not getdata:
                return Response(status=status.HTTP_404_NOT_FOUND)
            
            serializer = ServerSerializer(getdata, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Server.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, id):
        try:
            getdata = Server.objects.get(pk=id)
            if not getdata:
                return Response(status=status.HTTP_404_NOT_FOUND)
            
            getdata.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Server.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
