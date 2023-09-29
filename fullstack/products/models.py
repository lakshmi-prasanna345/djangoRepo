from django.db import models
from students.models import Students
# Create your models here.
class ProductsList(models.Model):
    pimage=models.ImageField(upload_to='images',blank=True,null=True)
    pid=models.IntegerField()
    pname=models.CharField(max_length=30)
    price=models.FloatField()
    quantity=models.IntegerField()
    dateandtime = models.DateTimeField(auto_now_add=True)
    archieved=models.BooleanField(default= False)
    favorite=models.BooleanField(default=False)
    favourited_by=models.ManyToManyField(Students,blank=True,symmetrical=False,related_name="favourite_by")

class ChartData(models.Model):
    label = models.CharField(max_length=100)
    value = models.IntegerField()

    def __str__(self):
        return self.label
