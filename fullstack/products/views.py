from django.shortcuts import render
from .models import ProductsList
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializer import ProductsSerializer
from datetime import datetime,timedelta,timezone
from django.db.models import Q

def index(request):
    return render(request,'index.html')
class Getfun(APIView):
    def get(self,request):
        try:
       #.all() is a method provided by the Manager class that retrieves all the records (instances) from the database for the given model.
            obj=ProductsList.objects.all()#objects is the Manager attribute that allows you to perform database operations on the associated model.
        except ProductsList.DoesNotExist:
            msg={"msg":"not found"}
            return Response (msg,status=status.HTTP_404_NOT_FOUND)
        serializer=ProductsSerializer(obj,many=True)
    #many=True indicates that you are serializing multiple instances. Since the queryset can contain multiple records (instances), this parameter is set to True.
        return Response(serializer.data,status=status.HTTP_200_OK)
    #When you access serializer.data, it retrieves the serialized representation of the data that was passed to the serializer. This serialized data is a Python dictionary or a similar data structure that holds the field names and their corresponding values based on the model instances you provided to the serializer.
    def post(self,request):
        serializer=ProductsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()## This creates and saves a new Product instance
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)
class Post1(APIView):
    def post(self,request):
        serializer=ProductsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()## This creates and saves a new Product instance
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)
    

"""class Put1(APIView):
    def put(self,request,id):
        try:
            obj=ProductsList.objects.get(id=id)
        #when defining views for handling HTTP methods like PUT, id is often extracted from the URL itself. 
        except ProductsList.DoesNotExist:
            msg={"msg":"not found"}
            return Response(msg,status=status.HTTP_404_NOT_FOUND)
        serializer=ProductsSerializer(obj,data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data,status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)"""

class Display(APIView):
    def get(self,request,favorite):
        try:
            obj=ProductsList.objects.filter(favorite=favorite)
        except ProductsList.DoesNotExist:
            msg={"msg":"not found"}
            return Response(msg,status=status.HTTP_404_NOT_FOUND)
        serialized_data = []

        for obj in obj:
            serializer = ProductsSerializer(obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                serialized_data.append(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serialized_data, status=status.HTTP_200_OK)
class Filter(APIView):

    def get(self,request,archieved):
        try:
            obj=ProductsList.objects.filter(archieved=archieved)
        except ProductsList.DoesNotExist:
            msg={"msg":"not found"}
            return Response(msg,status=status.HTTP_404_NOT_FOUND)
        serialized_data = []

        for obj in obj:
            serializer = ProductsSerializer(obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                serialized_data.append(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serialized_data, status=status.HTTP_200_OK)
class PnamePriceFilter(APIView):
    def get(self,request,pname,price):
        try:
            obj=ProductsList.objects.filter(pname=pname,price=price)
        except ProductsList.DoesNotExist:
            msg={"msg":"not found"}
            return Response(msg,status=status.HTTP_404_NOT_FOUND)
        serialized_data = []

        for obj in obj:
            serializer = ProductsSerializer(obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                serialized_data.append(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serialized_data, status=status.HTTP_200_OK)
"""class ProductData(APIView):
    def get(self, request):
        str=input("enter the string:")
        date=datetime.date.today()
        day=date.weekday()
        if(str== "thisweek"):
            date1=6-day
            print(date1)
        return Response(day,status=status.HTTP_200_OK)
    from django.utils import timezone
from datetime import timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Products
from .serializers import ProductSerializer"""

class ProductData(APIView):
    def post(self, request):
        data_type = request.data.get('data_type')
        today = datetime.now()
        
        if data_type == 'this_week':
            start_of_week = today - timedelta(days=today.weekday())
            end_of_week = start_of_week + timedelta(days=6)
            products = ProductsList.objects.filter(dateandtime__range=[start_of_week, end_of_week])
        elif data_type == 'last_week':
            start_of_last_week = today - timedelta(days=today.weekday() + 7)
            end_of_last_week = start_of_last_week + timedelta(days=6)
            products = ProductsList.objects.filter(dateandtime__range=[start_of_last_week, end_of_last_week])
        elif data_type == 'this_month':
            start_of_month = today.replace(day=1)
            next_month = start_of_month.replace(month=start_of_month.month + 1, day=1) - timedelta(days=1)
            products = ProductsList.objects.filter(dateandtime__range=[start_of_month, next_month])
        else:
            return Response({"error": "Invalid data_type"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = ProductsSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class UpdateQuantity(APIView):
    def put(self, request, product_id):
        try:
            product = ProductsList.objects.get(id=product_id)
        except ProductsList.DoesNotExist:
            return Response({"msg": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        
        action = request.data.get('action')  # 'increment' or 'decrement'
        
        if action == 'increment':
            product.quantity += 1
        elif action == 'decrement':
            if product.quantity > 0:
                product.quantity -= 1
        else:
            return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)
        product.save()
        serializer = ProductsSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)

class Search_products(APIView):
    def get(self, request):
        data = request.query_params.get("selectedCondition", '')
        keyword = request.query_params.get('search', '')

        if not data:  # No selected range
            results = ProductsList.objects.filter(Q(pname__icontains=keyword) | Q(pid__icontains=keyword))
        else:
            min_price, max_price = map(int, data.split("-"))
            print(min_price,max_price)
            results = ProductsList.objects.filter(
                (Q(pname__icontains=keyword) | Q(pid__icontains=keyword)) &
                Q(price__gte=min_price) & Q(price__lt=max_price)
                )
        serializer = ProductsSerializer(results, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



class Dropdown(APIView):
    def get(self, request):
        keyword = request.query_params.get("selectedCondition", '')
        data = keyword.split("-")
        if len(data) == 2:
            min_price = int(data[0])
            max_price = int(data[1])
            results = ProductsList.objects.filter(price__gte=min_price, price__lt=max_price)
            serialized_results = ProductsSerializer(results, many=True)
            return Response(serialized_results.data)
        elif(">" in keyword):
            results=ProductsList.objects.filter(price__gte=int(data[0][1:]))
            results.archieved=True
            serializer=ProductsSerializer(results,many=True)
            return Response(serializer.data)
        elif("<" in keyword):
            results=ProductsList.objects.filter(price__lte=int(data[0][1:]))
            results.archieved=True
            serializer=ProductsSerializer(results,many=True)
            return Response(serializer.data)
        else:
            return Response({"error": "Invalid format for selectedCondition"}, status=400)

          # Return an empty list if no matching condition is found
