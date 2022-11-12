from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.timezone import now


from .models import Blog
from .serializers import BlogSerializer

from user.models import User
from category.models import Category

class BlogsView(APIView):
    def get(self, request, format=None):
        if Blog.objects.all().exists() :
            blogs = Blog.objects.all().order_by('-modified')
            serializer = BlogSerializer(blogs, many=True)
            return Response(serializer.data)
        return Response({'message': 'funca'}, status=status.HTTP_418_IM_A_TEAPOT)
    
    def post(self, request, fromat=None):
        data = request.data
        
        try:
            user = User.objects.get(id=data.get('author'))
            title = request.data.get('title')
            content = request.data.get('content')
            new_blog = Blog.objects.create(author=user, title=title, content=content)
            new_blog.save()
            
            for id in data['category']:
                    cate_blog = Category.objects.get(id=id)
                    new_blog.category.add(cate_blog)

            data = BlogSerializer(new_blog).data
                
            return Response(data)
        except:
            return Response({'msg': 'todo mal'})
        # print(new_blog)
        # print(new_blog.data, id_user)

        # if new_blog.is_valid():
        #     new_blog.save()
        #     return Response(new_blog.data, status=status.HTTP_201_CREATED)
        # else:
        #     return Response({'error': new_blog.error_messages}, status=status.HTTP_400_BAD_REQUEST)


class SingleBlogView(APIView):
    def get(self, request, pk=None):
        if pk is not None:
            data = get_object_or_404(Blog, uuid=pk)
            blog = BlogSerializer(data)
            return Response(blog.data)
        
        return Response({'error': 'blog not found',
            "pk":pk}, status=status.HTTP_404_NOT_FOUND)
    def delete(self, request, pk=None):
        
        if pk is not None:
            blog = get_object_or_404(Blog, uuid=pk)
            blog.delete()
            return Response(status=status.HTTP_202_ACCEPTED)
        
        return Response({'error': 'blog not found',
            "pk":pk}, status=status.HTTP_404_NOT_FOUND)
    
    def put(self, request, pk=None):
        if pk is not None:
            data = request.data
            blog = get_object_or_404(Blog, uuid=pk)
            blog.title = data.get('title') or blog.title
            blog.content = data.get('content') or blog.content
            
            if data.get('category') is not None:
                blog.category.clear()
                for id in data['category']:
                    cate_blog = Category.objects.get(id=id)
                    blog.category.add(cate_blog)

            blog.modified = now()
            blog.save()
            serializer = BlogSerializer(blog).data
            return Response(serializer, status=status.HTTP_202_ACCEPTED)
        
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

class SerchBlog(APIView):
    def get(self, request, title=None, format=None):
        if title is not None:
            blogs = Blog.objects.filter(title__contains=title).order_by('-modified')
            serializer = BlogSerializer(blogs, many=True)
            return Response(serializer.data)
        else:
            return Response({'message': 'funca'}, status=status.HTTP_418_IM_A_TEAPOT)
