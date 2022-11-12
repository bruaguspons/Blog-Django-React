from rest_framework import serializers

from .models import Blog
from category.serializers import CategorySerializer
from user.serializer import UserSerializer


class BlogSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=True, read_only=True)
    
    author = UserSerializer(read_only=True)
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
    # def create(self, validated_data):
    #     # with transaction.atomic():
    #     category = validated_data.pop('category', [])
    #     instnace = super().create(validated_data)
    #     for c in category:
    #         instnace.category.create(category=c)
    #     return instnace
    # def to_representation(self, instance):
    #     self.fields['author'] = UserSerializer(read_only=True)
    #     return super(BlogSerializer, self).to_representation(instance)
    