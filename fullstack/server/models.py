from django.db import models

class Server(models.Model):
     # Use AutoField as the primary key
    Rname = models.CharField(max_length=100)
    Rdes = models.TextField(max_length=300)
    Rtype = models.CharField(max_length=10)
    Rimage = models.ImageField(upload_to='images/', blank=True, null=True)
