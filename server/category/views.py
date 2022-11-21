from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from .models import Category
from .serializers import CategorySerializer
from blog.models import Blog
from blog.serializers import BlogSerializer


class CategoryView(APIView):
    def get(self, request):
        if Category.objects.all().exists():
            query = Category.objects.all()
            cats = CategorySerializer(query, many=True)
            return Response(cats.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response({"error": "Categories not Found"}, status=status.HTTP_404_NOT_FOUND)
    
    def post(self, request, *args, **kwargs):
        cate = CategorySerializer(data=request.data)
        if cate.is_valid():
            cate.save()
            return Response(cate.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class GetBlogsInCategory(APIView):
    def post(self, request):
        # query =[]
            cate = request.data.get('category')
            query=Blog.objects.filter(category__contains=cate)
            # for b in Blog.objects.all().values():
            #     print(b)
            #     if(cate in b.category.title):
            #         query += b
            blogs = BlogSerializer(query, many=True)
            Response(blogs.data, status=status.HTTP_202_ACCEPTED)
