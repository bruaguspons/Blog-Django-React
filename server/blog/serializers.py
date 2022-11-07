from rest_framework import serializers

from .models import Blog
from category.serializers import CategorySerializer
from user.serializer import UserSerializer
class BlogSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=True)
    
    author = UserSerializer()
    class Meta:
        model = Blog
        fields = [
            'uuid',
            'author',
            'title',
            'category',
            'content',
            'created',
            'modified'

        ]