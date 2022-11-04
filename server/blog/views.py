from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class BlogsView(APIView):
    def get(self, request, format=None):
        return Response({'message': 'funca'}, status=status.HTTP_418_IM_A_TEAPOT)
