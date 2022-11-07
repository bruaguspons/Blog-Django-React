from django.db import models
import uuid
from category.models import Category
from user.models import User

class Blog(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4)
    author=models.ForeignKey(User, on_delete=models.CASCADE, related_name="user")
    title = models.CharField(max_length=255, blank=True)
    content = models.TextField(blank=True)
    category = models.ManyToManyField(Category)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    modified = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['title']
    
    def __str__(self):
        return self.title
