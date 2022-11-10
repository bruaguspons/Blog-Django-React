from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Blog
from user.models import User
from .serializers import BlogSerializer


class BlogsView(APIView):
    def get(self, request, format=None):
        if Blog.objects.all().exists() :
            blogs = BlogSerializer(Blog.objects.all().order_by('-modified'), many=True)
            return Response(blogs.data)
        return Response({'message': 'funca'}, status=status.HTTP_418_IM_A_TEAPOT)
    
    def post(self, request, fromat=None):
        data = User.objects.get(id=request.data.get('author'))
        title = request.data.get('title')
        content = request.data.get('content')
        new_blog = BlogSerializer(author=data, title=title, content=content)
        print(new_blog)
        # print(new_blog.data, id_user)

        return Response({'msg': 'todo mal'})
        # if new_blog.is_valid():
        #     new_blog.save()
        #     return Response(new_blog.data, status=status.HTTP_201_CREATED)
        # else:
        #     return Response({'error': new_blog.error_messages}, status=status.HTTP_400_BAD_REQUEST)


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
