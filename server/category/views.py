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

class GetBlogsInCategory(APIView):
    def get(self, request, cate):
        # query =[]
            query=Blog.objects.filter(category__contains=cate)
            # for b in Blog.objects.all().values():
            #     print(b)
            #     if(cate in b.category.title):
            #         query += b
            blogs = BlogSerializer(query, many=True)
            Response(blogs.data, status=status.HTTP_202_ACCEPTED)
