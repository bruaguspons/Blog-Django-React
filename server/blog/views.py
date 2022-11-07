from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Blog
from .serializers import BlogSerializer


class BlogsView(APIView):
    def get(self, request, format=None):
        if Blog.objects.all().exists() :
            blogs = BlogSerializer(Blog.objects.all().order_by('-modified'), many=True)
            return Response(blogs.data)
        return Response({'message': 'funca'}, status=status.HTTP_418_IM_A_TEAPOT)

class SingleBlogView(APIView):
    def get(self, request, pk):
        try:
            data = Blog.objects.get(uuid=pk)
            blog = BlogSerializer(data)
            return Response(blog.data)
        except:
            return Response({'error': 'blog not found',
            "pk":pk}, status=status.HTTP_404_NOT_FOUND)

class GetUserBlogs(APIView):
    def get(self, request,pk):
        try:
            query = Blog.objects.filter(author__id=pk)
            blogs = BlogSerializer(query, many=True)
            return Response(data=blogs.data, status=status.HTTP_202_ACCEPTED)
        except:
            return Response({'error': 'user not found'},status=status.HTTP_404_NOT_FOUND)
