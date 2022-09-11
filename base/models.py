from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Event(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200,null=True,blank=True)
    description = models.TextField(null=True,blank=True)
    cableCount = models.IntegerField(null=True,blank=True,default=0)
    paid = models.BooleanField(default=False)
    price = models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    countInStock = models.IntegerField(null=True,blank=True,default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.createdAt)



class Cable(models.Model):
    cableID = models.IntegerField(null=True,blank=True,default=0)
    cableCount = models.IntegerField(null=True,blank=True,default=0)
    cableDescriptor = models.TextField(null=True,blank=True)
    _id = models.AutoField(primary_key=True, editable=False)
    def __str__(self):
        return str(self.cableDescriptor)

class Tube(models.Model):
    cable=models.ForeignKey(Cable, on_delete=models.SET_NULL, null=True)
    color=models.CharField(max_length=200,null=True,blank=True)
    def __str__(self):
        return str(self.color+" "+self.cable.cableDescriptor)


class FiberSplice(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    event = models.ForeignKey(Event, on_delete=models.SET_NULL, null=True)

    cableID = models.ForeignKey(Cable, related_name='cable1', on_delete=models.SET_NULL, null=True)
    cableID2 = models.ForeignKey(Cable, related_name='cable2',on_delete=models.SET_NULL, null=True)


    fiber1 = models.IntegerField(null=True,blank=True,default=0)
    fiber2 = models.IntegerField(null=True,blank=True,default=0)

    tube1 = models.CharField(max_length=50,null=True,blank=True)
    tube2 = models.CharField(max_length=50,null=True,blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)
    def __str__(self):
        return str(self.cableID.cableDescriptor+" "+self.tube1+ " tube #" + str(self.fiber1)+" spliced to "+self.cableID2.cableDescriptor+" "+self.tube2+ " tube #" + str(self.fiber2))


