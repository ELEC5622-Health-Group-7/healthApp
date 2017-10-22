# models.py
from django.db import models
 
class Test(models.Model):
    name = models.CharField(max_length=20)

class User(models.Model):
    name = models.CharField(max_length=20)
    password = models.CharField(max_length=30)

class Exercise_monitor(models.Model):
    user_id = models.CharField(max_length=10)
    monitor_type = models.CharField(max_length=2)
    pulse=models.CharField(max_length=3)
    diastolic=models.CharField(max_length=3)
    systolic=models.CharField(max_length=3)

class Daily_tracker(models.Model):
    user_id = models.CharField(max_length=10)
    time = models.DateField()
    pulse=models.CharField(max_length=3)
    diastolic=models.CharField(max_length=3)
    systolic=models.CharField(max_length=3)