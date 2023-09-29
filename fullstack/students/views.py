from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Students,ExamDetails
from .serializer import StudentSerializer,ExamSerializer

class Course(APIView):
    def get(self, request, course):
        try:
            students = Students.objects.filter(course=course)
        except Students.DoesNotExist:
            msg = {"msg": "not found"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        serialized_data = []
        for student in students:
            serializer = StudentSerializer(student)
            serialized_data.append(serializer.data)

        return Response(serialized_data, status=status.HTTP_200_OK)
class Percentage(APIView):
    def get(self,request):
        passing_exams = []
        all_exams = ExamDetails.objects.all()

        for exam in all_exams:
            percentage = (exam.actual_score / exam.max_score) * 100
            if percentage > 50:
                passing_exams.append(exam)
        serializer = ExamSerializer(passing_exams, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
class StudentList(APIView):
    def get(self, request):
        students = Students.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StudentDetail(APIView):

    def get(self, request):
        student = Students.objects.all()

        if not student:  # Check if student is None
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = StudentSerializer(student,many=True)
        return Response(serializer.data)
    
    def put(self, request, id):
        student = Students.objects.get(pk=id)
        if not student:  # Check if student is None
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = StudentSerializer(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        student = Students.objects.get(pk=id)
        if not student:  # Check if student is None
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
