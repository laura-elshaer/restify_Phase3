from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.utils import timezone


class Notification(models.Model):
    is_read = models.BooleanField(default=False)
    message = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)

   

    
    
