from django.db import models

# Create your models here.
class Students(models.Model):
    student_Id=models.IntegerField()
    first_name=models.CharField(max_length=30)
    last_name=models.CharField(max_length=30)
    email=models.EmailField()
    course=models.CharField(max_length=10)

class ExamDetails(models.Model):
    subject = models.CharField(max_length=100)
    exam_date = models.DateField()
    max_score = models.DecimalField(max_digits=5, decimal_places=2, default=93.00)
    actual_score = models.DecimalField(max_digits=5, decimal_places=2)
    student = models.ForeignKey(Students, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.subject} - {self.student}"

