from django.db import models
import string
import random
def generate_code():
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_uppercase,k=length))
        if Room.objects.filter(code=code).count()==0:
            break
    return code
# Create your models here.
class Room(models.Model):
    code = models.CharField(max_length=6, default=generate_code,unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    date = models.DateField() 
    meal = models.CharField(max_length = 20)
    #max_day_length = models.IntegerField() #1-7, number of days to include in selection



class User(models.Model):
    room = models.ForeignKey('Room',on_delete=models.CASCADE)
    name = models.CharField(max_length = 50)
    cuisine = models.CharField(max_length = 30)
    start_time = models.TimeField()
    end_time = models.TimeField()



