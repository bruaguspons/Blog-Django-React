from django.db import models
import uuid
from category.models import *
from user.models import *
from datetime import datetime


class Blog(models.Model):
    uuid = models.UUIDField(uuid.uuid4, required=True, unique=True)
    title = models.CharField(max_length=255, required=True)
    content = models.TextField()
    category = models.models.ManyToManyField(
        "category.Model", verbose_name=(""))
    publish = models.DateTimeField(default=datetime.now)
    author=models.models.ForeignKey("user.Model", verbose_name=(""), on_delete=models.CASCADE)

    class Meta:
        ordering = ['title']
    
    def __str__(self):
        return self.title
